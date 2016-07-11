/// <reference path="references.ts" />
var CxChord;
(function (CxChord) {
    (function (Scale_Type) {
        Scale_Type[Scale_Type["major"] = 1] = "major";
        Scale_Type[Scale_Type["minor"] = 2] = "minor";
        Scale_Type[Scale_Type["altered"] = 4] = "altered";
        Scale_Type[Scale_Type["dominant"] = 8] = "dominant";
        Scale_Type[Scale_Type["dimished"] = 16] = "dimished";
    })(CxChord.Scale_Type || (CxChord.Scale_Type = {}));
    var Scale_Type = CxChord.Scale_Type;
    CxChord.scaleMap = {
        "Ionian": { notes: [0, 2, 4, 5, 7, 9, 11], major: 0, minor: -3, group: Scale_Type.major },
        "Dorian": { notes: [0, 2, 3, 5, 7, 9, 10], major: 3, minor: 0, group: Scale_Type.minor },
        "Phygian": { notes: [0, 1, 3, 5, 7, 8, 10], major: 3, minor: 0, group: Scale_Type.minor },
        "Lydian": { notes: [0, 2, 4, 5, 7, 9, 11], major: 0, minor: -3, group: Scale_Type.major },
        "Mixolydian": { notes: [0, 2, 4, 5, 7, 9, 11], major: 0, minor: -3, group: Scale_Type.dominant },
        "Aeolian": { notes: [0, 2, 3, 5, 7, 8, 10], major: 0, minor: 3, group: Scale_Type.minor },
        "Locrian": { notes: [0, 1, 3, 5, 6, 8, 10], major: 0, minor: null, group: Scale_Type.dimished },
        "HarmonicMinor": { notes: [0, 2, 3, 5, 7, 8, 11], major: 0, minor: null, group: Scale_Type.minor },
        "MelodicMinor": { notes: [0, 2, 3, 5, 7, 9, 11], major: 0, minor: null, group: Scale_Type.minor }
    };
})(CxChord || (CxChord = {}));
//# sourceMappingURL=CxScales.js.map