/// <reference path="references.d.ts" />
declare namespace CxChord {
    class ChordInstance {
        midiChord: number[];
        normalizeChord: boolean;
        offset: number[];
        chordInv: number[][];
        matchedNotes: MatchedNotes;
        favorJazzChords: boolean;
        constructor(midiChord: number[], normalizeChord?: boolean);
        addOffset(chord: number[], offset: number): number[];
        addRootOffset(chord: number[], root: number): number[];
        getOffset(inv: number): number;
        getBassName(hypo: Hypothesis, sharpOrFlat?: string): string;
        getBassNumber(): number;
        getRootName(hypo: Hypothesis, sharpOrFlat?: string): string;
        getInversion(inv: number): number[];
        validate(notes: number[]): void;
        normalize(notes: number[]): number[];
        invert(notes: number[]): number[][];
    }
}
