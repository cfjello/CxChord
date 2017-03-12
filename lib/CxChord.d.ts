/// <reference path="../typings/lodash/lodash.d.ts" />
/// <reference path="../typings/chartjs/chart.d.ts" />
declare namespace CxChord {
    class BarDataSet {
        labels: string[];
        _options: {
            scales: {
                xAxes: {
                    barPercentage: number;
                }[];
                yAxes: {
                    type: string;
                    display: boolean;
                    position: string;
                    id: string;
                }[];
            };
            responsive: boolean;
            legend: {
                display: boolean;
                position: string;
            };
            title: {
                display: boolean;
                text: string;
            };
        };
        _options2: {
            scaleBeginAtZero: boolean;
            scaleShowGridLines: boolean;
            scaleGridLineColor: string;
            scaleGridLineWidth: number;
            barShowStroke: boolean;
            barStrokeWidth: number;
            barValueSpacing: number;
            barDatasetSpacing: number;
            legendTemplate: string;
        };
        barData: LinearChartData;
        constructor(labels: string[]);
        setLabels(labels: string[]): void;
        addDataSet(label: string, rgb: string, data: number[]): void;
    }
    class BayesChart extends BarDataSet {
        canvas: HTMLCanvasElement;
        ctx: any;
        barChart: any;
        constructor(htmlElement?: string, labels?: string[]);
        showChart(): void;
    }
}
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
declare namespace CxChord {
    enum Scale_Type {
        major = 1,
        minor = 2,
        altered = 4,
        dominant = 8,
        dimished = 16,
        wholeTone = 32,
    }
    const scaleMap: ScaleMap;
    enum Chord_Type {
        major = 0,
        majorb5 = 1,
        majorAug = 2,
        minor = 3,
        minorb5 = 4,
        dominant = 5,
        dominantAlt = 6,
        dimished = 7,
        halfDiminished = 8,
    }
}
declare namespace CxChord {
    class Progresions {
        constructor();
        buildProgressions(): void;
    }
}
declare namespace CxChord {
    interface RuleMap<K, V> {
        get(key: K): V;
        has(key: K): boolean;
        set(key: K, value: V): Map<K, V>;
        size: number;
    }
    class Rules implements RuleMap<string, Rule> {
        debugKey: string;
        ruleMap: {};
        size: number;
        get(key: any): any;
        has(key: any): boolean;
        set(key: any, value: any): any;
        constructor(_chord?: ChordInstance, debugKey?: string);
    }
}
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
        getRootName(hypo: Hypothesis, sharpOrFlat?: string): string;
        getInversion(inv: number): number[];
        validate(notes: number[]): void;
        normalize(notes: number[]): number[];
        invert(notes: number[]): number[][];
    }
}
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
declare namespace CxChord {
    class BayesChordCalculator {
        bayesChordMap: ChordMapTable;
        self: this;
        hypothesis: Hypothesis[];
        rules: Rule[];
        likelyhoods: number[][];
        normalizingConst: number[];
        posterior: Posterior[][];
        chartsCount: number;
        constructor(bayesChordMap: ChordMapTable);
        createHypothesis(): void;
        getChordMapNotes(idx: number): number[];
        standardDeriviation(data: number[]): number;
        applyRule(rule: Rule): void;
        calcPosterior(_row: number): void;
        getPosteriorByRow(rowIdx: number): Posterior[];
        getPosterior(): Posterior[];
        getHypothesis(posterior: Posterior): Hypothesis;
        getHypothesisByIdx(idx: number): Hypothesis;
        getBestPosterior(idx?: number): Posterior;
        getTopX(topX?: number, row?: number): Posterior[];
        getRandomIntInclusive(min: number, max: number): number;
        randomColorFactor: () => number;
        visualizeTopX(title: string, chord: ChordInstance, topX?: number): void;
        visualizeForm(form: string, chord: ChordInstance): void;
    }
}
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
        chord: string;
        root: string;
        type: string;
        bass: string;
        inv: number;
        group: number;
        notes: number[];
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
