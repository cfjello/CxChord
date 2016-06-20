/// <reference path="references.ts" />
var CxChord;
(function (CxChord) {
    (function (Scale_GR) {
        Scale_GR[Scale_GR["major"] = 1] = "major";
        Scale_GR[Scale_GR["minor"] = 2] = "minor";
        Scale_GR[Scale_GR["altered"] = 4] = "altered";
        Scale_GR[Scale_GR["dominant"] = 8] = "dominant";
        Scale_GR[Scale_GR["dimished"] = 16] = "dimished";
    })(CxChord.Scale_GR || (CxChord.Scale_GR = {}));
    var Scale_GR = CxChord.Scale_GR;
    CxChord.scaleMap = {
        "Ionian": { notes: [0, 2, 4, 5, 7, 9, 11], major: 0, minor: -3, group: Scale_GR.major },
        "Dorian": { notes: [0, 2, 3, 5, 7, 9, 10], major: 3, minor: 0, group: Scale_GR.minor },
        "Phygian": { notes: [0, 1, 3, 5, 7, 8, 10], major: 3, minor: 0, group: Scale_GR.minor },
        "Lydian": { notes: [0, 2, 4, 5, 7, 9, 11], major: 0, minor: -3, group: Scale_GR.major },
        "Mixolydian": { notes: [0, 2, 4, 5, 7, 9, 11], major: 0, minor: -3, group: Scale_GR.dominant },
        "Aeolian": { notes: [0, 2, 3, 5, 7, 8, 10], major: 0, minor: 3, group: Scale_GR.minor },
        "Locrian": { notes: [0, 1, 3, 5, 6, 8, 10], major: 0, minor: null, group: Scale_GR.dimished },
        "HarmonicMinor": { notes: [0, 2, 3, 5, 7, 8, 11], major: 0, minor: null, group: Scale_GR.minor },
        "MelodicMinor": { notes: [0, 2, 3, 5, 7, 9, 11], major: 0, minor: null, group: Scale_GR.minor }
    };
})(CxChord || (CxChord = {}));
//# sourceMappingURL=CxScales.js.map