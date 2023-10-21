"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChordForms = exports.knockouts = exports.conflicts = exports.mustHave = exports.extensions = exports.chordMap = exports.GR = exports.getKnockouts = exports.isNoRootChord = exports.getChordName = exports.getExtName = exports.getNoteName = exports.getNoteNumber = exports.noteNames = exports.rootNoteNames = void 0;
var CxChordInst_1 = require("./CxChordInst");
var _ = require("lodash");
//     		
exports.rootNoteNames = {
    sharp: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
    flat: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
};
exports.noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
    "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b",
    "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B",
    "c", "db", "d", "eb", "e", "f", "gb", "g", "ab", "a", "bb", "b"];
function getNoteNumber(note) {
    var octave = 5;
    var _oct = note.replace(/^[A-Ga-g]+[#b]*/, '');
    if (!_.isEmpty(_oct)) {
        var _octave = _oct.replace(/[^0-9]+/g, '');
        if (_octave.match(/^[0-9]0{0,1}/))
            octave = parseInt(_octave);
        else
            throw Error("getNoteNumber: Illegal octave number. Legal octaves are 0-10");
    }
    var noteName = note.replace(/[0-9]/g, '');
    var noteNum = exports.noteNames.indexOf(noteName) % 12;
    if (noteNum < 0)
        throw Error("getNoteNumber: Unknown note name");
    else
        return noteNum + (octave * 12);
}
exports.getNoteNumber = getNoteNumber;
function getNoteName(note, flatOrSharp) {
    if (note === void 0) { note = 0; }
    if (flatOrSharp === void 0) { flatOrSharp = "flat"; }
    // For positive bass notes assume an actual bass has been provided
    // For negative bass notes assume that a ChorMap type root note has been provided
    note = note % 12;
    var noteName = exports.rootNoteNames[flatOrSharp][(Math.abs(note < 0 ? note + 12 : note)) % 12];
    return noteName;
}
exports.getNoteName = getNoteName;
function getExtName(nameWithCommas) {
    var extName = nameWithCommas.replace(/,/g, "").replace(/-1/g, "-no-root").replace(/-5/g, "-no-fifth");
    return extName;
}
exports.getExtName = getExtName;
function getChordName(nameWithCommas, root, bass, flatOrSharp) {
    if (root === void 0) { root = 0; }
    if (bass === void 0) { bass = 255; }
    if (flatOrSharp === void 0) { flatOrSharp = "flat"; }
    var chordName = getNoteName(root, flatOrSharp);
    var extName = getExtName(nameWithCommas);
    chordName += extName;
    // console.debug("chordName(1):'" + chordName + "'")
    var group = _.isUndefined(exports.chordMap[nameWithCommas]) ? 2 : exports.chordMap[nameWithCommas].group;
    bass = bass == 255 ? root : bass;
    if (bass !== root && group != GR.rootLess) {
        var bassName = getNoteName(bass, flatOrSharp);
        chordName += "/" + bassName;
    }
    return chordName;
}
exports.getChordName = getChordName;
function isNoRootChord(chordSym) {
    return _.isUndefined(chordSym) ? false : (chordSym.indexOf("-1") > 0);
}
exports.isNoRootChord = isNoRootChord;
function getKnockouts(key) {
    var _key = key;
    if (_.isUndefined(exports.knockouts[_key])) {
        _key = _key.split(',')[0];
    }
    return _.isUndefined(exports.knockouts[_key]) ? [] : exports.knockouts[_key];
}
exports.getKnockouts = getKnockouts;
var GR;
(function (GR) {
    GR[GR["shell"] = 1] = "shell";
    GR[GR["standard"] = 2] = "standard";
    GR[GR["altered"] = 4] = "altered";
    GR[GR["extented"] = 8] = "extented";
    GR[GR["rootLess"] = 16] = "rootLess";
    GR[GR["reduced"] = 32] = "reduced";
    GR[GR["cluster"] = 64] = "cluster";
    GR[GR["passing"] = 128] = "passing";
})(GR || (exports.GR = GR = {}));
exports.chordMap = {
    "Maj": { notes: [0, 4, 7], root: 0, inv: 0, group: GR.standard },
    "Maj,7": { notes: [0, 4, 7, 11], root: 0, inv: 0, group: GR.standard },
    "Maj,7,9": { notes: [0, 4, 7, 11, 14], root: 0, inv: 0, group: GR.extented },
    "Maj,7,9,#11": { notes: [0, 4, 7, 11, 14, 18], root: 0, inv: 0, group: GR.extented },
    "Maj,7,9,#11,13": { notes: [0, 4, 7, 11, 14, 18, 21], root: 0, inv: 0, group: GR.extented },
    "Maj,6": { notes: [0, 4, 7, 9], root: 0, inv: 0, group: GR.standard },
    "Maj,6,9": { notes: [0, 4, 7, 9, 14], root: 0, inv: 0, group: GR.extented },
    "Maj,add2": { notes: [0, 2, 4, 7], root: 0, inv: 0, group: GR.cluster },
    "Maj,add9": { notes: [0, 4, 7, 14], root: 0, inv: 0, group: GR.extented },
    "5": { notes: [0, 7], root: 0, inv: 0, group: GR.shell },
    // Minor
    "Min": { notes: [0, 3, 7], root: 0, inv: 0, group: GR.standard },
    "Min,7": { notes: [0, 3, 7, 10], root: 0, inv: 0, group: GR.standard },
    "Min,7,9": { notes: [0, 3, 7, 10], root: 0, inv: 0, group: GR.altered },
    "Min,7,b5": { notes: [0, 3, 6, 10], root: 0, inv: 0, group: GR.standard },
    "Min,6": { notes: [0, 3, 7, 9], root: 0, inv: 0, group: GR.standard },
    "Min,6,9": { notes: [0, 3, 7, 9, 14], root: 0, inv: 0, group: GR.extented },
    "Min,M7": { notes: [0, 3, 7, 11], root: 0, inv: 0, group: GR.standard },
    // Dominant 
    "Dom,7": { notes: [0, 4, 7, 10], root: 0, inv: 0, group: GR.altered },
    "Dom,7,9": { notes: [0, 4, 7, 10, 14], root: 0, inv: 0, group: GR.extented },
    "Dom,7,#5": { notes: [0, 4, 8, 10], root: 0, inv: 0, group: GR.altered },
    "Dom,7,b5": { notes: [0, 4, 6, 10], root: 0, inv: 0, group: GR.altered },
    "Dom,7,sus4": { notes: [0, 5, 7, 10], root: 0, inv: 0, group: GR.altered },
    "Dom,7,sus2": { notes: [0, 2, 7, 10], root: 0, inv: 0, group: GR.altered },
    "Dim": { notes: [0, 3, 6], root: 0, inv: 0, group: GR.passing },
    "Dim,7": { notes: [0, 3, 6, 9], root: 0, inv: 0, group: GR.passing },
    "Dim,7(HW)": { notes: [0, 3, 6, 9], root: 0, inv: 0, group: GR.passing },
    "Dim,7(WH)": { notes: [0, 3, 6, 9], root: 0, inv: 0, group: GR.passing },
    // "Dimø"			: {notes: [0,3,6,10], root: 0, inv:0, group: 2 },
    "Maj,#5": { notes: [0, 4, 8], root: 0, inv: 0, group: GR.altered },
    "Sus2": { notes: [0, 2, 7], root: 0, inv: 0, group: GR.altered },
    "Sus4": { notes: [0, 5, 7], root: 0, inv: 0, group: GR.altered },
    // "Quater"			: {notes: [0,5,10],   root: 0, inv:0, group: 3 },
    // Jazz reduced chords
    "Maj,7,-5": { notes: [0, 4, 11], root: 0, inv: 0, group: GR.reduced },
    "Maj,6,-5": { notes: [0, 4, 9], root: 0, inv: 0, group: GR.reduced },
    "Min,6,-5": { notes: [0, 3, 9], root: 0, inv: 0, group: GR.reduced },
    "Min,7,-5": { notes: [0, 3, 10], root: 0, inv: 0, group: GR.reduced },
    // Jazz block chords
    // Major A and B Voicings
    "Maj,6,9,-1(A)": { notes: [0, 3, 5, 10], root: -4, inv: 0, group: GR.rootLess },
    "Maj,6,9,-1(B)": { notes: [0, 5, 7, 10], root: -9, inv: 0, group: GR.rootLess },
    "Maj,7,9,-1(A)": { notes: [0, 3, 7, 10], root: -4, inv: 0, group: GR.rootLess },
    "Maj,7,9,-1(B)": { notes: [0, 3, 5, 8], root: -11, inv: 0, group: GR.rootLess },
    // Minor A and B Voicings
    "Min,6,9,-1(A)": { notes: [0, 4, 6, 11], root: -3, inv: 0, group: GR.rootLess },
    // "Min,6,9,-1(B)"		: {notes: [0,4,5,9], 			root: -10, inv:0, group: GR.rootLess }, // TODO - Check this one
    "Min,7,9,-1(A)": { notes: [0, 4, 7, 11], root: -3, inv: 0, group: GR.rootLess },
    "Min,7,9,-1(B)": { notes: [0, 4, 5, 9], root: -10, inv: 0, group: GR.rootLess },
    // "Min,7,b5(A)"		: {notes: [0,3,7,9], 			root: -3, inv:0, group: GR.standard },
    // "Min,7,b5(B)"		: {notes: [0,2,5,8], 			root: -10, inv:0, group: GR.standard },
    // "MinCluster,7,9,-1" : {notes: [0,4,5,9], 			root: -10, inv:0, group: GR.rootLess },
    // Dominant A and B Voicings
    "Dom,7,9,-1(A)": { notes: [0, 4, 6, 11], root: -10, inv: 0, group: GR.rootLess },
    "Dom,7,9,-1(B)": { notes: [0, 5, 6, 10], root: -4, inv: 0, group: GR.rootLess },
    // "Dom,7,b9,-1(A)" 	: {notes: [0,3,6,10], 			root: -10, inv:0, group: GR.rootLess },
    "Dom,7,b9,b13,-1(A)": { notes: [0, 5, 6, 10], root: -4, inv: 0, group: GR.rootLess },
    "Dom,7,b9,b13,-1(B)": { notes: [0, 4, 6, 9], root: -4, inv: 0, group: GR.rootLess },
    "Dom,7,b9,-1": { notes: [0, 3, 6, 9], root: -4, inv: 0, group: GR.rootLess },
    "Dom,7,#9,-1": { notes: [0, 3, 6, 11], root: -4, inv: 0, group: GR.rootLess },
    // "MinCluster"		   	: {notes: [0,2,3,7],  root: 0, inv:0, group: 3 },
    // "MajCluster"		   	: {notes: [0,2,4,7],  root: 0, inv:0, group: 3 },
    // "Dom7Cluster,-1"   : {notes: [0,4,6,9],  			root: -4, inv:0, group:  GR.rootLess }
};
// Note: Extension don't live with a half or whole step between each other
// except for (mostly altered) dominant chords
exports.extensions = {
    "Maj": [14, 18, 21],
    "Maj,7": [14, 18, 21],
    "Min": [14, 17, 21, 13, 18],
    "Min,M7": [14, 17, 21, 18],
    // "Dim7HW"   : [14,17,20,23], 
    // "Dim7WH"   : [14,17,20,23], 
    // "Half-Dim7": [14,17,20,21],
    "Maj,#5": [14, 18],
    "Dom,7": [13, 14, 18, 21],
    "Dom,7,#5": [13, 14, 15, 18, 19],
    "Dom,7,b5": [13, 14, 15, 19, 20, 21]
    // TODO: Add the rest later			
};
exports.mustHave = {
    // Major
    "Maj": [4],
    "Maj,7": [4, 11],
    "Maj,7,9": [4, 11],
    "Maj,7,9,#11": [4, 11],
    "Maj,7,9,#11,13": [4, 11],
    "Maj,6": [4, 9],
    "Maj,6,9": [4, 9],
    "Maj,6,9,-1": [4, 9],
    // "Maj,7,b5"		: [0,4,6,11],
    "Maj,add2": [2, 4],
    "Maj,add9": [4, 14],
    // "Maj-add9no5":[4,14],
    "Maj,#5": [0, 4, 8],
    // Sus Types
    "Sus2": [0, 2, 7],
    "Sus4": [0, 5, 7],
    // Minor
    "Min": [3],
    "Min,6": [3, 9],
    "Min,6,9": [3, 9],
    "Min,6,9,-1": [3, 9],
    "Min,7": [3, 10],
    "Min,7,9": [3, 10],
    "Min,7,9,-1": [3, 10],
    "Min,7,b5": [3, 6, 10],
    "Min,M7": [3, 11],
    // Dominant
    "Dom,7": [4, 10],
    "Dom,7,9": [4, 10],
    "Dom,7,#5": [4, 8, 10],
    "Dom,7,b5": [4, 6, 10],
    "Dom,7,sus4": [5, 10],
    "Dom,7,sus2": [2, 10],
    "Dim": [0, 3, 6],
    "Dim,7(WH)": [0, 3, 6, 9],
    "Dim,7(HW)": [0, 3, 6, 9],
    // Jazz type no-root chords
    "Dom,7,9,-1": [4, 10],
    "Dom,7,b9,-1": [4, 10],
    "Dom,7,#9,-1": [4, 10],
    "Dom,7,9,13,-1,-5": [4, 10, 21],
};
exports.conflicts = {
    // Major
    /*
    "Maj"  		: [[4,5],[10,11]],
    "Maj7" 		: [],
    "Maj79" 	: [],
    "Maj79#11" 	: [],
    "Maj79#1113": [],
    "Maj6"		: [],
    "Maj69"		: [],
    */
    // "Maj,7,b5"		: [[6,7]],
    /*
    "Maj-add2"	: [],
    "Maj-add9"	: [],
    "Maj-add9no5":[],
    */
    "Maj,#5": [[7, 8]],
    // Minor
    "Min": [[5, 6], [7, 8]],
    "Min,6": [[5, 6], [7, 8]],
    "Min,6,9": [[5, 6], [7, 8]],
    "Min,6,9,-1": [[5, 6], [7, 8]],
    "Min,7": [[5, 6], [7, 8]],
    "Min,7,9": [[5, 6], [7, 8]],
    "Min,7,9,-1": [[5, 6], [7, 8]],
    "Min,7,b5": [[5, 6], [7, 8]],
    "Min,M7": [[5, 6], [7, 8]],
    // "MinCluster,7,9,-1": [[5,6], [7,8]]
    // Dominant
    /*
    "Dom7"		: [],
    "Dom7#5"	: [],
    "Dom7b5"	: [],
    "Dom7sus4"	: [],
    "Dom7sus2"	: [],
    // Jazz type no-root chords
    "Dom79-no root"  : [],
    "Dom7b9-no root" : [],
    "Dom7#9-no root" : [],
    "Dim"		: [],
    "Dim7WH"	: [],
    "Dim7HW"	: []
    */
};
exports.knockouts = {
    // Major
    "Maj": [1, 3, 5, 8, 10],
    "Maj,7": [1, 3, 5, 8, 10],
    "Maj,7,9": [1, 3, 5, 8, 10],
    "Maj,7,9,#11": [1, 3, 5, 8, 10],
    "Maj,7,9,#11,13": [1, 3, 5, 8, 10],
    "Maj,6": [1, 3, 5, 8, 10],
    "Maj,6,9": [1, 3, 5, 8, 10],
    "Maj,7,b5": [1, 3, 5, 7, 8, 10],
    "Maj,add2": [1, 3, 5, 8, 10, 11, 14],
    "Maj,add9": [1, 3, 5, 8, 9, 10, 11],
    // "Maj,add9no5": [1,3,5,8,10],
    "Maj,#5": [1, 3, 5, 7, 10],
    "5": [1, 2, 3, 4, 5, 6, 8, 9, 10, 11],
    // Minor
    "Min": [1, 4, 6, 8, 11],
    "Min,6": [1, 4, 6, 8],
    "Min,6,9": [1, 4, 6, 8],
    "Min,7": [1, 4, 6, 8, 11],
    "Min,7,9": [1, 4, 6, 8, 11],
    "Min,7,b5": [4, 7, 8, 11],
    "Min,M7": [1, 4, 6, 8, 10],
    "MinCluster,7,9,-1": [1, 4, 8],
    // Diminished
    "Dim": [4, 7, 9, 10, 11],
    "Dim,7": [1, 2, 4, 5, 7, 8, 10, 11],
    "Dim,7(HW)": [2, 5, 8, 11],
    "Dim,7(WH)": [1, 4, 7, 10],
    // "Half-Dim7" : [4,7,11],
    // Dominant
    "Dom,7": [5, 11],
    "Dom,7,#5": [5, 11],
    "Dom,7,sus4": [4, 11],
    // "Dom7sus4#5": [4,11],
    "Dom,7,b5": [5, 7, 11],
    // Quater types
    "Sus2": [1, 3, 4, 5, 8],
    "Sus4": [1, 3, 4, 6, 8],
    // "Quater"	: [1,3,4,5,8,],
    // Jazz reduced chords
    "Maj,7,-5": [1, 3, 5, 6, 7, 8, 10],
    "Maj,6,-5": [1, 3, 5, 6, 7, 8, 10],
    "Min,6,-5": [1, 4, 6, 7, 8],
    "Min,7,-5": [1, 4, 6, 7, 8, 11],
    // Jazz type no-root chords
    "Maj,6,9,-1(A)": [0, 1, 3, 5, 6, 8, 10],
    "Maj,6,9,-1(B)": [0, 1, 3, 5, 6, 8, 10],
    "Maj,7,9,-1(A)": [0, 1, 3, 5, 6, 8, 10],
    "Maj,7,9,-1(B)": [0, 1, 3, 5, 6, 8, 10],
    "Maj,7,9,-1": [0, 1, 3, 5, 6, 8, 10],
    "Min,6,9,-1(A)": [0, 4, 6, 8, 10, 11],
    "Min,6,9,-1(B)": [0, 4, 6, 8, 10, 11],
    "Min,7,9,-1(A)": [0, 4, 6, 8, 11],
    "Min,7,9,-1(B)": [0, 4, 6, 8, 11],
    // "Min,7,b5(A)"	: [0,4,7,8,11],
    // "Min,7,b5(B)"	: [0,4,7,8,11],			
    "Min,6,9,-1": [1, 4, 8],
    "Min,7,9,-1": [1, 4, 8],
    "Dom,7,9,-1(A)": [0, 1, 3, 5, 8, 11],
    "Dom,7,9,-1(B)": [0, 1, 3, 5, 8, 11],
    "Dom,7,b9,b13,-1(A)": [0, 2, 5, 8, 11],
    "Dom,7,b9,b13,-1(B)": [0, 2, 5, 8, 11],
    "Dom,7,9,13,-1,-5": [0, 5, 7, 11],
    "Dom,7,9,-1": [0, 5, 7, 11],
    "Dom,7,b9,-1": [0, 5, 7, 11],
    "Dom,7,#9,-1": [0, 5, 7, 11],
    // "Dom7Cluster,-1": [0,5,7,11]
};
var ChordForms = /** @class */ (function () {
    function ChordForms() {
        this.chordMapWithInv = {};
        this.buildInversions();
    }
    ChordForms.prototype.getInvariants = function (chordName) {
        var invariants = [];
        if (_.has(exports.chordMap, chordName)) {
            var chord_1 = exports.chordMap[chordName];
            _.forIn(exports.chordMap, function (value, key) {
                if (key !== chordName && _.isEqual(value.notes, chord_1.notes)) {
                    invariants.push(key);
                }
            });
        }
        return invariants;
    };
    ChordForms.prototype.buildInversions = function () {
        var mapWithInv = this.chordMapWithInv;
        //
        // Loop through the Chord hypothesis
        // 
        _.forIn(exports.chordMap, function (value, key) {
            mapWithInv[key] = [];
            //
            // Loop through the inversions
            //   
            var chord = new CxChordInst_1.ChordInstance(value.notes);
            var interval = chord.getInversion(0);
            for (var i = 0; i < value.notes.length; i++) {
                var _notes = chord.getInversion(i);
                //
                // Calculate the new inverted root note 
                // 		
                var rootNote = (-(Math.abs(value.root) + interval[i])) % 12;
                // mapWithInv[key].push( { notes: _notes, root: ( rootNote <= 0 ? 0 : rootNote ) , inv: i, group: value.group } ) 
                mapWithInv[key].push({ notes: _notes, root: rootNote, inv: i, group: value.group });
            }
        });
    };
    return ChordForms;
}());
exports.ChordForms = ChordForms;
