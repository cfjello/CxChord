/// <reference path="references.d.ts" />
declare namespace CxChord {
    class ChordMatch implements ChordMatchIntf {
        inv: number;
        type: string;
        notes: number[];
        group: number;
        chord: string;
        bass: string;
        root: string;
        constructor(hypo: Hypothesis, chordEntry: ChordInstance, mapEntry: ChordMapEntry, sharpOrFlat?: string);
    }
    class ChordMatcher extends CxChord.ChordForms {
        debugKey: string;
        chord: ChordInstance;
        bayes: CxChord.BayesChordCalculator;
        rules: CxChord.Rules;
        favorJazzChords: boolean;
        priorChords: ChordInstance[];
        constructor(debugKey?: string);
        getMatches(sharpOrFlat?: string): ChordMatch[];
        getPosterior(): Posterior[];
        getChord(): ChordInstance;
        favorJazz(favor?: boolean): void;
        addRootOffset(_arr: number[], root: number, addOctave?: boolean): number[];
        addToArray(_arr: number[], value: number): number[];
        doMatch(chord: ChordInstance, limit?: number): ChordInstance;
        match(midiChord: any[]): ChordInstance;
        matchNoteNames(midiNames: string[]): ChordInstance;
        matchNotes(midiChord: number[]): ChordInstance;
    }
}
