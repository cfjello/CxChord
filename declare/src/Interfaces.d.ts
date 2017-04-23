/// <reference path="CxBayes.d.ts" />
/// <reference path="CxForms.d.ts" />
declare namespace CxChord {
    interface ChordMapEntry {
        notes: number[];
        root: number;
        inv: number;
        group: number;
        count?: number;
        probability?: number;
    }
    interface MatchedNotes {
        [key: string]: {
            invertions: any[];
            extensions: any[];
            knockouts: any[];
            mustHave: any[];
            rootNotes: any[];
            conflicts: any[];
            roots: number[];
            group: number;
        };
    }
    interface ChordMap {
        [key: string]: ChordMapEntry;
    }
    interface ChordMapTable {
        [key: string]: ChordMapEntry[];
    }
    interface Conflicts {
        [key: string]: any[][];
    }
    interface RootNoteNames {
        [key: string]: string[];
    }
    interface RuleFx {
        (chord?: ChordInstance, bayes?: CxChord.BayesChordCalculator, row?: number, col?: number): number;
    }
    interface Rule {
        rule?: string;
        chord: ChordInstance;
        ruleFx: RuleFx;
    }
    interface Hypothesis {
        idx: number;
        key: string;
        inv: number;
        len: number;
        root: number;
        group: number;
    }
    interface ChordMatchIntf {
        hypo: Hypothesis;
        chord: string;
        root: string;
        type: string;
        bass: string;
        inv: number;
        notes: number[];
        list: string;
    }
    interface Posterior {
        post: number;
        idx: number;
        hypo?: Hypothesis;
    }
    interface ScaleMapEntry {
        notes: number[];
        major: number;
        minor: number;
        group: number;
    }
    interface ScaleMap {
        [key: string]: ScaleMapEntry;
    }
}
