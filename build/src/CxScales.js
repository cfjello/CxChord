/// <reference path="references.ts" />
var CxChord;
(function (CxChord) {
    // TODO: move this to a Chord Progression module that uses CxChord	
    CxChord.rootNoteNamesB = {
        sharp: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
        flat: ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"]
    };
    //
    // Global static functions
    // 
    function getRootNameB(root, sharpOrFlat) {
        if (sharpOrFlat === void 0) { sharpOrFlat = 'flat'; }
        var root = root < 0 ? root + 12 : root;
        return CxChord.rootNoteNamesB[sharpOrFlat][root];
    }
    CxChord.getRootNameB = getRootNameB;
})(CxChord || (CxChord = {}));
//# sourceMappingURL=CxScales.js.map