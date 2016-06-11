/// <reference path="references.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CxChord;
(function (CxChord) {
    var ChordMatcher = (function (_super) {
        __extends(ChordMatcher, _super);
        function ChordMatcher() {
            _super.call(this);
            this.fullMatch = false;
            this.favorJazzChords = false;
            this.priorChords = [];
            this.bayes = new CxChord.BayesCalculator(this.chordMapWithInv);
        }
        ChordMatcher.prototype.getPosterior = function () {
            return this.bayes.getPosterior();
        };
        ChordMatcher.prototype.getChord = function () { return this.chord; };
        ChordMatcher.prototype.favorJazz = function (favor) {
            if (favor === void 0) { favor = true; }
            this.favorJazzChords = favor;
            if (!_.isUndefined(this.chord)) {
                this.chord.favorJazzChords = favor;
            }
        };
        ChordMatcher.prototype.addRootOffset = function (_arr, root, addOctave) {
            if (_arr === void 0) { _arr = []; }
            if (addOctave === void 0) { addOctave = true; }
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
        ChordMatcher.prototype.doMatch = function (chord, limit) {
            if (limit === void 0) { limit = chord.chordInv[0].length; }
            var self = this;
            var extensions = CxChord.extensions;
            var knockouts = CxChord.knockouts;
            var mustHave = CxChord.mustHave;
            var conflicts = CxChord.conflicts;
            var rootNotes = CxChord.rootNoteNames;
            var idx = 0;
            _.forIn(this.chordMapWithInv, function (hypothesis, key) {
                idx++;
                for (var inv = 0; inv < hypothesis.length; inv++) {
                    idx += inv;
                    if (!_.has(chord.matchedNotes, key)) {
                        chord.matchedNotes[key] = { invertions: [],
                            extensions: [],
                            knockouts: [],
                            mustHave: [],
                            rootNotes: [],
                            conflicts: [],
                            roots: [],
                            group: hypothesis[inv].group };
                    }
                    if (key == 'Min,7,b5') {
                        var debugRoot = true;
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
                    var hypoToMatch = [];
                    var chordToMatch = [];
                    var invRoot = (hypothesis[inv].root < 0 ? 12 + hypothesis[inv].root : hypothesis[inv].root) % 12;
                    if (CxChord.isNoRootChord(key) && hypothesis[inv].root < 0) {
                        var tmpArr = [];
                        tmpArr.push(invRoot);
                        hypoToMatch = tmpArr.concat(hypothesis[inv].notes).sort();
                        chordToMatch = chord.addRootOffset(chord.chordInv[0], hypothesis[inv].root);
                    }
                    else {
                        hypoToMatch = hypothesis[inv].notes;
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
                    var mustHaveTrans;
                    var mustHaveMatch;
                    if (!_.isUndefined(mustHave[key])) {
                        mustHaveTrans = self.addRootOffset(mustHave[key], hypothesis[inv].root, false);
                        mustHaveMatch = _.intersection(chordToMatch, mustHaveTrans);
                        chord.matchedNotes[key].mustHave.push(mustHaveMatch.length - mustHaveTrans.length);
                    }
                    else
                        chord.matchedNotes[key].mustHave.push(0);
                    //
                    // Now check the extensions
                    // 
                    var extensionNotes = extensions[key];
                    var remainingNotes = _.difference(chord.chordInv[0], intersection);
                    var extensionMatch = _.intersection(remainingNotes, extensionNotes);
                    chord.matchedNotes[key].extensions.push(extensionMatch);
                    //
                    // Now check the knockouts
                    // 
                    var knockoutTrans;
                    var knockoutMatch;
                    var KOs = CxChord.getKnockouts(key);
                    if (KOs.length > 0) {
                        knockoutTrans = self.addRootOffset(knockouts[key], hypothesis[inv].root);
                        knockoutMatch = _.intersection(chord.chordInv[0], knockoutTrans);
                    }
                    chord.matchedNotes[key].knockouts.push(_.isUndefined(knockoutMatch) ? [] : knockoutMatch);
                    // 
                    // Check for Conflicting notes
                    //
                    var conflictCount = 0;
                    var conflictTrans;
                    var conflictLen = 0;
                    if (!_.isUndefined(conflicts[key])) {
                        for (var i = 0; i < conflicts[key].length; i++) {
                            conflictTrans = self.addRootOffset(conflicts[key][i], hypothesis[inv].root);
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
        ChordMatcher.prototype.match = function (midiChord) {
            this.chord = new CxChord.ChordInstance(midiChord);
            this.chord.favorJazzChords = this.favorJazzChords;
            //
            // Do chord tone matches 
            //     
            this.doMatch(this.chord);
            this.rules = new CxChord.Rules(this.chord);
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
            // FAvor Jazz Chords
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
    }(CxChord.ChordForms));
    CxChord.ChordMatcher = ChordMatcher;
})(CxChord || (CxChord = {}));
//# sourceMappingURL=CxMatch.js.map