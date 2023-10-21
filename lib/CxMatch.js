"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChordMatcher = exports.ChordMatch = void 0;
var CxBayes_1 = require("./CxBayes");
var CxChordInst_1 = require("./CxChordInst");
var CxForms_1 = require("./CxForms");
var CxRules_1 = require("./CxRules");
var _ = require("lodash");
var ChordMatch = /** @class */ (function () {
    function ChordMatch(hypo, chordEntry, _mapEntry, sharpOrFlat) {
        if (sharpOrFlat === void 0) { sharpOrFlat = 'flat'; }
        this.hypo = hypo;
        this.notes = [];
        this.inv = hypo.inv;
        this.type = hypo.key;
        for (var i = 0; i < chordEntry.chordInv[0].length; i++) {
            var note = chordEntry.chordInv[0][i] + chordEntry.offset[0];
            this.notes.push(note);
        }
        this.bass = chordEntry.getBassName(hypo, sharpOrFlat);
        this.root = chordEntry.getRootName(hypo, sharpOrFlat);
        this.list = this.root + "," + this.hypo.key;
        if (this.bass !== this.root) {
            this.list += ",/" + this.bass;
        }
        this.chord = (0, CxForms_1.getExtName)(this.list);
    }
    return ChordMatch;
}());
exports.ChordMatch = ChordMatch;
var ChordMatcher = /** @class */ (function (_super) {
    __extends(ChordMatcher, _super);
    function ChordMatcher(debugKey) {
        if (debugKey === void 0) { debugKey = "Maj"; }
        var _this = _super.call(this) || this;
        _this.debugKey = debugKey;
        _this.chord = null;
        _this.bayes = null;
        _this.rules = null;
        _this.favorJazzChords = false;
        _this.priorChords = [];
        return _this;
    }
    ChordMatcher.prototype.getMatches = function (sharpOrFlat) {
        if (sharpOrFlat === void 0) { sharpOrFlat = 'flat'; }
        var post = this.bayes.getPosterior();
        var res = [];
        for (var i = 0; i < post.length; i++)
            if (i == 0 || post[i].post == post[i - 1].post) {
                var chordEntry = this.chord;
                var chordMapEntry = this.chordMapWithInv[post[i].hypo.key][post[i].hypo.inv];
                var entry = new ChordMatch(post[i].hypo, chordEntry, chordMapEntry, sharpOrFlat);
                res.push(entry);
            }
            else {
                break;
            }
        return res;
    };
    ChordMatcher.prototype.getMatch = function (idx, sharpOrFlat) {
        if (idx === void 0) { idx = 0; }
        if (sharpOrFlat === void 0) { sharpOrFlat = 'flat'; }
        var res = this.getMatches(sharpOrFlat);
        if (idx < 0 || idx >= res.length)
            throw Error("getMatch index: " + idx + " is out of range");
        else
            return res[idx];
    };
    ChordMatcher.prototype.getPosterior = function () { return this.bayes.getPosterior(); };
    ChordMatcher.prototype.getChord = function () { return this.chord; };
    ChordMatcher.prototype.favorJazz = function (favor) {
        if (favor === void 0) { favor = true; }
        this.favorJazzChords = favor;
        if (this.chord !== null) {
            this.chord.favorJazzChords = favor;
        }
    };
    ChordMatcher.prototype.addRootOffset = function (_arr, root, _addOctave) {
        if (_arr === void 0) { _arr = []; }
        if (_addOctave === void 0) { _addOctave = true; }
        var arr = [];
        if (root == 0) {
            arr = _arr;
        }
        else {
            for (var i = 0; i < _arr.length; i++) {
                var note = _arr[i] + root % 12;
                note = note < 0 ? note + 12 : note;
                arr.push(note);
            }
        }
        return _.sortedUniq(arr);
    };
    ChordMatcher.prototype.addToArray = function (_arr, value) {
        var arr = [];
        for (var i = 0; i < _arr.length; i++) {
            arr.push(_arr[i] + value);
        }
        return arr;
    };
    ChordMatcher.prototype.doMatch = function (chord, _limit) {
        if (_limit === void 0) { _limit = chord.chordInv[0].length; }
        // deno-lint-ignore no-this-alias
        var self = this;
        var idx = 0;
        _.forIn(this.chordMapWithInv, function (hypothesis, key) {
            var _a;
            idx++;
            for (var inv = 0; inv < hypothesis.length; inv++) {
                idx += inv;
                if (!_.has(chord.matchedNotes, key)) {
                    chord.matchedNotes[key] = {
                        invertions: [],
                        extensions: [],
                        knockouts: [],
                        mustHave: [],
                        rootNotes: [],
                        conflicts: [],
                        roots: [],
                        group: hypothesis[inv].group
                    };
                }
                // Save the root note for the inversion
                chord.matchedNotes[key].rootNotes.push(hypothesis[inv].root);
                //
                // Check for matching notes
                // 
                var intersection = _.intersection(chord.chordInv[0], hypothesis[inv].notes);
                if (!_.isArray(intersection))
                    throw Error('inversion Intersection is not an array');
                chord.matchedNotes[key].invertions.push(intersection);
                // if ( chord.chordInv[0].length == intersection.length  ) this.fullMatches = true             
                //
                // The following checks should also check against the the root of no-root chords
                //        
                var _hypoToMatch = [];
                var chordToMatch = [];
                var invRoot = (hypothesis[inv].root < 0 ? 12 + hypothesis[inv].root : hypothesis[inv].root) % 12;
                if ((0, CxForms_1.isNoRootChord)(key) && hypothesis[inv].root < 0) {
                    var tmpArr = [];
                    tmpArr.push(invRoot);
                    _hypoToMatch = tmpArr.concat(hypothesis[inv].notes).sort();
                    chordToMatch = chord.addRootOffset(chord.chordInv[0], hypothesis[inv].root);
                }
                else {
                    _hypoToMatch = hypothesis[inv].notes;
                    chordToMatch = chord.chordInv[0];
                }
                //
                // Check for the root notes
                // For chord without the root it should not be present
                // For chord with roots it should score higher if present 
                //
                var indexOfRoot = chordToMatch.indexOf(invRoot) >= 0 ? chordToMatch.indexOf(invRoot) : chordToMatch.indexOf(invRoot + 12);
                chord.matchedNotes[key].roots.push(indexOfRoot);
                // 
                // Check for must Have notes
                //
                var mustHaveTrans = void 0;
                var mustHaveMatch = void 0;
                if (!_.isUndefined(CxForms_1.mustHave[key])) {
                    mustHaveTrans = self.addRootOffset(CxForms_1.mustHave[key], hypothesis[inv].root, false);
                    mustHaveMatch = _.intersection(chordToMatch, mustHaveTrans);
                    chord.matchedNotes[key].mustHave.push(mustHaveMatch.length - mustHaveTrans.length);
                }
                else
                    chord.matchedNotes[key].mustHave.push(0);
                //
                // Now check the extensions
                // 
                var extensionNotes = CxForms_1.extensions[key];
                var remainingNotes = _.difference(chord.chordInv[0], intersection);
                var extensionMatch = _.intersection(remainingNotes, extensionNotes);
                chord.matchedNotes[key].extensions.push(extensionMatch);
                //
                // Now check the knockouts
                // 
                var knockoutTrans = void 0;
                var knockoutMatch = void 0;
                var KOs = (0, CxForms_1.getKnockouts)(key);
                if (KOs.length > 0) {
                    knockoutTrans = self.addRootOffset(CxForms_1.knockouts[key], hypothesis[inv].root);
                    knockoutMatch = _.intersection(chord.chordInv[0], knockoutTrans);
                }
                chord.matchedNotes[key].knockouts.push((_a = knockoutMatch) !== null && _a !== void 0 ? _a : []);
                // 
                // Check for Conflicting notes
                //
                var conflictCount = 0;
                var conflictTrans = void 0;
                if (!_.isUndefined(CxForms_1.conflicts[key])) {
                    for (var i = 0; i < CxForms_1.conflicts[key].length; i++) {
                        conflictTrans = self.addRootOffset(CxForms_1.conflicts[key][i], hypothesis[inv].root);
                        var conflictMatch = _.intersection(chordToMatch, conflictTrans);
                        if (conflictMatch.length == conflictTrans.length) {
                            conflictCount += 1;
                        }
                        // Check in 2 octaves
                        conflictTrans = self.addToArray(conflictTrans, 12);
                        conflictMatch = _.intersection(chord.chordInv[0], conflictTrans);
                        if (conflictMatch.length == conflictTrans.length) {
                            conflictCount += 1;
                        }
                    }
                }
                chord.matchedNotes[key].conflicts.push(conflictCount);
            }
        });
        return chord;
    };
    //
    // Tone number and name support
    //
    ChordMatcher.prototype.match = function (midiChord) {
        if (_.isUndefined(midiChord) || _.isEmpty(midiChord))
            throw "match: supplied Chord is empty";
        if (_.isNumber(midiChord[0]))
            return this.matchNotes(midiChord);
        // else
        return this.matchNoteNames(midiChord);
    };
    ChordMatcher.prototype.matchNoteNames = function (midiNames) {
        var midiChord = [];
        for (var i = 0; i < midiNames.length; i++)
            try {
                var noteNo = (0, CxForms_1.getNoteNumber)(midiNames[i]);
                midiChord.push(noteNo);
            }
            catch (e) {
                throw e;
            }
        return this.matchNotes(midiChord);
    };
    ChordMatcher.prototype.matchNotes = function (midiChord) {
        this.bayes = new CxBayes_1.BayesChordCalculator(this.chordMapWithInv);
        this.chord = new CxChordInst_1.ChordInstance(midiChord);
        this.chord.favorJazzChords = this.favorJazzChords;
        //
        // TODO: Application of rules should be configurable or even dynamic for best matching capabilities
        //
        // Do chord tone matches 
        //     
        this.doMatch(this.chord);
        this.rules = new CxRules_1.Rules(this.chord, this.debugKey);
        //
        // Apply the Bayes Rules
        // 
        // Even distribution
        //
        var ruleE = this.rules.get('EvenDistribution');
        this.bayes.applyRule(ruleE);
        //
        // Count Notes Rule  
        //
        // var ruleN: Rule = this.rules.get('CountNotes')  
        // this.bayes.applyRule(ruleN)
        //
        // Knockout Rule  
        //
        var ruleK = this.rules.get('Knockouts');
        this.bayes.applyRule(ruleK);
        //
        // Matched Notes rule
        // 
        var ruleM = this.rules.get('MatchedNotes');
        this.bayes.applyRule(ruleM);
        //
        // MustHave Notes rule
        //  
        var ruleH = this.rules.get('MustHave');
        this.bayes.applyRule(ruleH);
        //
        // Favor Jazz Chords
        // 
        // if ( this.favorJazzChords ) { 
        //      var ruleJ: Rule = this.rules.get('FavorJazz') 
        //      this.bayes.applyRule(ruleJ)
        // }
        //
        // Conflict Notes rule
        //  
        // var ruleX: Rule = this.rules.get('Conflicts') 
        // this.bayes.applyRule(ruleX)
        //
        // Root is present Rule  
        //
        var ruleR = this.rules.get('RootFound');
        this.bayes.applyRule(ruleR);
        //
        // Group Rule  
        //
        // var ruleG: Rule = this.rules.get('ChordGroup')
        // this.bayes.applyRule(ruleG)          
        // this.priorChords.push(this.chord) 
        //
        return this.chord;
    };
    return ChordMatcher;
}(CxForms_1.ChordForms));
exports.ChordMatcher = ChordMatcher;
