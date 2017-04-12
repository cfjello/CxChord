/// <reference path="references.d.ts" />
declare namespace CxChord {
    const rootNoteNames: RootNoteNames;
    const noteNames: string[];
    function getNoteNumber(note: string): number;
    function getNoteName(note?: number, flatOrSharp?: string): string;
    function getExtName(nameWithCommas: string): string;
    function getChordName(nameWithCommas: string, root?: number, bass?: number, flatOrSharp?: string): string;
    function isNoRootChord(chordSym: string): boolean;
    function getKnockouts(key: string): number[];
    enum GR {
        shell = 1,
        standard = 2,
        altered = 4,
        extented = 8,
        rootLess = 16,
        reduced = 32,
        cluster = 64,
        passing = 128,
    }
    const chordMap: ChordMap;
    const extensions: {
        [key: string]: number[];
    };
    const mustHave: {
        [key: string]: number[];
    };
    const conflicts: Conflicts;
    const knockouts: {
        [key: string]: number[];
    };
    class ChordForms {
        chordMapWithInv: ChordMapTable;
        constructor();
        getInvariants(chordName: string): string[];
        buildInversions(): void;
    }
}
