/// <reference path="references.d.ts" />
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
        normalize(posterior: Posterior[]): void;
        getTopX(topX?: number, row?: number, normalize?: boolean): Posterior[];
        getRandomIntInclusive(min: number, max: number): number;
        randomColorFactor: () => number;
        visualizeTopX(title: string, chord: ChordInstance, topX?: number): void;
        visualizeForm(form: string, chord: ChordInstance): void;
    }
}
