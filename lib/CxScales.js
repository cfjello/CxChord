"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chord_Type = exports.scaleMap = exports.Scale_Type = void 0;
var Scale_Type;
(function (Scale_Type) {
    Scale_Type[Scale_Type["major"] = 1] = "major";
    Scale_Type[Scale_Type["minor"] = 2] = "minor";
    Scale_Type[Scale_Type["altered"] = 4] = "altered";
    Scale_Type[Scale_Type["dominant"] = 8] = "dominant";
    Scale_Type[Scale_Type["dimished"] = 16] = "dimished";
    Scale_Type[Scale_Type["wholeTone"] = 32] = "wholeTone";
})(Scale_Type || (exports.Scale_Type = Scale_Type = {}));
exports.scaleMap = {
    "Ionian": { notes: [0, 2, 4, 5, 7, 9, 11], major: 0, minor: -3, group: Scale_Type.major },
    "Dorian": { notes: [0, 2, 3, 5, 7, 9, 10], major: 3, minor: 0, group: Scale_Type.minor },
    "Phygian": { notes: [0, 1, 3, 5, 7, 8, 10], major: 3, minor: 0, group: Scale_Type.minor },
    "Lydian": { notes: [0, 2, 4, 5, 7, 9, 11], major: 0, minor: -3, group: Scale_Type.major },
    "Mixolydian": { notes: [0, 2, 4, 5, 7, 9, 11], major: 0, minor: -3, group: Scale_Type.dominant },
    "Aeolian": { notes: [0, 2, 3, 5, 7, 8, 10], major: 0, minor: 3, group: Scale_Type.minor },
    "Locrian": { notes: [0, 1, 3, 5, 6, 8, 10], major: 0, minor: null, group: Scale_Type.dimished },
    "HarmonicMinor": { notes: [0, 2, 3, 5, 7, 8, 11], major: 0, minor: null, group: Scale_Type.minor },
    "MelodicMinor": { notes: [0, 2, 3, 5, 7, 9, 11], major: 0, minor: null, group: Scale_Type.minor },
    "WholeTone": { notes: [0, 2, 4, 6, 8, 10], major: 0, minor: null, group: Scale_Type.minor }
};
var Chord_Type;
(function (Chord_Type) {
    Chord_Type[Chord_Type["major"] = 0] = "major";
    Chord_Type[Chord_Type["majorb5"] = 1] = "majorb5";
    Chord_Type[Chord_Type["majorAug"] = 2] = "majorAug";
    Chord_Type[Chord_Type["minor"] = 3] = "minor";
    Chord_Type[Chord_Type["minorb5"] = 4] = "minorb5";
    Chord_Type[Chord_Type["dominant"] = 5] = "dominant";
    Chord_Type[Chord_Type["dominantAlt"] = 6] = "dominantAlt";
    Chord_Type[Chord_Type["dimished"] = 7] = "dimished";
    Chord_Type[Chord_Type["halfDiminished"] = 8] = "halfDiminished";
})(Chord_Type || (exports.Chord_Type = Chord_Type = {}));
// TODO: implemenation pending
