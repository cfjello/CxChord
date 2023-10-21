"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChordInstance = void 0;
var CxForms_1 = require("./CxForms");
// import * as CxForms from "./CxForms"
var _ = require("lodash");
var ChordInstance = /** @class */ (function () {
    function ChordInstance(midiChord, normalizeChord) {
        if (normalizeChord === void 0) { normalizeChord = true; }
        this.midiChord = midiChord;
        this.normalizeChord = normalizeChord;
        this.offset = [];
        this.chordInv = [];
        this.matchedNotes = {};
        this.favorJazzChords = false;
        this.validate(midiChord);
        for (var i = 0; i < midiChord.length; i++) {
            this.offset.push(midiChord[i]);
        }
        this.chordInv = this.invert(midiChord);
    }
    ChordInstance.prototype.addOffset = function (chord, offset) {
        var res = [];
        for (var i = 0; i < chord.length; i++) {
            res.push(chord[i] + offset);
        }
        return res;
    };
    ChordInstance.prototype.addRootOffset = function (chord, root) {
        var offset = (root < 0 ? 12 + root : root) % 12;
        return this.normalize(this.addOffset(chord, offset));
    };
    ChordInstance.prototype.getOffset = function (inv) {
        if (inv < 0 || inv >= this.offset.length)
            throw Error("getRootOffset inversion is out of range");
        else
            return this.offset[inv];
    };
    ChordInstance.prototype.getBassName = function (_hypo, sharpOrFlat) {
        if (sharpOrFlat === void 0) { sharpOrFlat = 'flat'; }
        var bass = this.offset[0] % 12;
        var bassName = CxForms_1.rootNoteNames[sharpOrFlat][bass];
        return bassName;
    };
    ChordInstance.prototype.getBassNumber = function () { return this.offset[0]; };
    ChordInstance.prototype.getRootName = function (hypo, sharpOrFlat) {
        if (sharpOrFlat === void 0) { sharpOrFlat = 'flat'; }
        var _offset = (this.offset[0] + hypo.root) % 12;
        // var octave  = Math.floor( ( this.offset[hypo.inv] + hypo.root )  / 12 )	
        var root = _offset < 0 ? _offset + 12 : _offset;
        var rootName = CxForms_1.rootNoteNames[sharpOrFlat][root];
        return rootName;
    };
    ChordInstance.prototype.getInversion = function (inv) {
        return _.isUndefined(this.chordInv[inv]) ? [] : this.chordInv[inv];
    };
    ChordInstance.prototype.validate = function (notes) {
        if (notes.length == 0) {
            throw Error("No notes in notes array");
        }
        for (var i = 0; i < notes.length; i++) {
            if (notes[i] < 0 || notes[i] > 127) {
                throw Error("Illegal midi note value:" + notes[i]);
            }
        }
    };
    ChordInstance.prototype.normalize = function (notes) {
        var target = [];
        try {
            var offset = notes[0];
            for (var i = 0; i < notes.length; i++) {
                var note = notes[i] - offset;
                while (note > 21)
                    note -= 12;
                // if ( note == 16 || note == 19 ) {
                // 	note -= 12
                // }
                target[i] = note;
            }
        }
        catch (e) {
            throw Error(e);
        }
        return target;
    };
    ChordInstance.prototype.invert = function (notes) {
        if (notes.length < 2)
            throw Error("Cannot invert less than 2 notes");
        var target = [];
        target[0] = this.normalizeChord ? this.normalize(notes) : notes;
        this.offset[0] = notes[0];
        for (var d = 1; d < notes.length; d++) {
            var currNotes = _.drop(target[d - 1]);
            var invNote = _.head(target[d - 1]);
            invNote += 12;
            currNotes.push(invNote);
            target[d] = this.normalizeChord ? this.normalize(currNotes) : currNotes;
        }
        if (target.length < notes.length)
            throw Error("Bad invertion");
        return target;
    };
    return ChordInstance;
}());
exports.ChordInstance = ChordInstance;
