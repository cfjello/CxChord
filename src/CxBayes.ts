import { BayesChart } from "./CxChart";
import {  ChordInstance  } from "./CxChordInst"
import {  Hypothesis, Rule, Posterior, ChordMapTable } from "./Interfaces";
import * as _ from "lodash"

export class BayesChordCalculator {
    self = this
    hypothesis:         Hypothesis[]    = []
    rules:              Rule[]          = []
    likelyhoods:        number[][]      = []
    normalizingConst:   number[]        = []
    posterior:          Posterior[][]   = []
    chartsCount                         = 0

    constructor(public bayesChordMap: ChordMapTable) {
        this.createHypothesis()
    }
    //
    // create an even distribution
    // 
    createHypothesis() {
        let idx = 0
        const _self = this.self

        for (const key in this.bayesChordMap) {
            for (let inv = 0; inv < this.bayesChordMap[key].length; inv++) {
                _self.hypothesis.push({
                    idx: idx++,
                    key: key,
                    inv: inv,
                    group: this.bayesChordMap[key][inv].group,
                    len: this.bayesChordMap[key][inv].notes.length,
                    root: this.bayesChordMap[key][inv].root
                }
                )
            }
        }
    }

    getChordMapNotes(idx: number): number[] {
        return this.bayesChordMap[this.hypothesis[idx].key][this.hypothesis[idx].inv].notes
    }

    standardDeriviation(data: number[]): number {
        const sum = _.sum(data)
        const avg = sum / data.length
        const squaredDiffs = _.map(data, function (value: number) {
            const diff = value - avg
            return diff * diff
        })
        const avgSquaredDiff = _.sum(squaredDiffs) / squaredDiffs.length
        const stdDev = Math.sqrt(avgSquaredDiff)
        return stdDev
    }

    //
    // Apply a Rule to the Hypothesis
    // 
    applyRule(rule: Rule) {
        const _self = this.self
        const row = this.likelyhoods.length
        const firstRow: boolean = (row == 0)
        let normalizingConst = 0
        this.rules.push(rule)
        if (_.isUndefined(this.likelyhoods[row]))
            this.likelyhoods[row] = []
        for (let col = 0; col < this.hypothesis.length; col++) {
            const likelyhood = rule.ruleFx(rule.chord, _self, row, col)
            this.likelyhoods[row].push(likelyhood)
            const prior = firstRow ? 1 : this.posterior[row - 1][col].post
            normalizingConst += (prior * likelyhood)
        }
        this.likelyhoods[row].push(normalizingConst)
        this.calcPosterior(row)
    }

    calcPosterior(_row: number) {
        for (let row = _row < 0 ? 0 : _row; row < this.likelyhoods.length; row++) {
            const firstRow: boolean = (row == 0)
            const colIdx = this.likelyhoods[row].length - 1
            const normalizingConst = this.likelyhoods[row][colIdx]
            if (_.isUndefined(this.posterior[row]))
                this.posterior[row] = []
            for (let col = 0; col < this.hypothesis.length; col++) {
                const prior = firstRow ? 1 : this.posterior[row - 1][col].post
                const likelyhood = this.likelyhoods[row][col]
                const posterior = (prior * likelyhood) / (firstRow ? 1 : normalizingConst)
                this.posterior[row].push({ post: posterior, idx: col })
            }
        }
    }

    getPosteriorByRow(rowIdx: number): Posterior[] {
        if (rowIdx < 0 || rowIdx >= this.posterior.length || _.isUndefined(this.posterior[rowIdx]))
            throw Error("getPosteriorByRow index: " + rowIdx + " is out of range or undefined")
        // this.posterior[rowIdx][col].rootName = CxChord.getRootName(this.posterior[rowIdx][col].idx)
        for (let col = 0; col < this.hypothesis.length; col++) {
            this.posterior[rowIdx][col].hypo = this.hypothesis[col]

        }
        return _.orderBy(this.posterior[rowIdx], ['post', 'hypo.len', 'hypo.inv'], 'desc')
    }

    getPosterior(): Posterior[] {
        const lastRow = this.posterior.length - 1
        if (lastRow < 0)
            return []
        else
            return this.getPosteriorByRow(lastRow)
    }

    getHypothesis(posterior: Posterior): Hypothesis {
        return this.hypothesis[posterior.idx]
    }

    getHypothesisByIdx(idx: number): Hypothesis {
        if (idx < 0 || idx >= this.hypothesis.length)
            throw Error("getHypothesisByIdx index: " + idx + " is out of range")
        return this.hypothesis[idx]
    }

    getBestPosterior(idx = 0): Posterior {
        const res = this.getPosterior()
        if ( idx < 0 || idx >= res.length ) 
            throw Error("getBestPosterior index: " + idx + " is out of range")
        return res[idx] 
    }

    normalize( posterior: Posterior[]  ) {
        const postArr: number[] = []
            _.forEach(posterior, function(val: Posterior) { 
                postArr.push(val.post)
            })
        const sum = _.sum(postArr)
        let checkSum = 0
        for ( let i = 0; i < postArr.length; i++ ) {
            posterior[i].post = postArr[i] / sum
            checkSum += posterior[i].post
        }
        // console.log( "checkSum: " + checkSum )
    }

    getTopX(topX = 10, row: number = this.posterior.length - 1, normalize = true): Posterior[] {
        const posterior = this.getPosteriorByRow(row)
        const postTopX = _.take(posterior, topX)
        if ( normalize ) {
            this.normalize(postTopX) 
        }
        return postTopX
    }

    // Returns a random integer between min (included) and max (included)
    // Using Math.round() will give you a non-uniform distribution!
    getRandomIntInclusive(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomColorFactor = function () {
        return Math.round(Math.random() * 255);
    }

    visualizeTopX(_title: string, chord: ChordInstance, topX = 10) {
        const labels: string[] = []
        const posteriorLastRow = this.getTopX(topX)

        for (let i = 0; i < posteriorLastRow.length; i++) {
            const hypo = this.getHypothesis(posteriorLastRow[i])
            const label = chord.getRootName(hypo) + hypo.key + "_i" + hypo.inv // + chord.getBassName(hypo)
            labels.push(label)
        }

        const bayesChart = new BayesChart('visualization', labels)
        for (let dataSet = 1; dataSet < this.posterior.length; dataSet++) {
            const data: number[] = []
            for (let i = 0; i < posteriorLastRow.length; i++) {
                const idx = posteriorLastRow[i].idx
                const post = this.posterior[dataSet][idx].post
                data.push(post)
            }
            const randomColor = this.randomColorFactor() + ',' + this.randomColorFactor() + ',' + this.randomColorFactor()
            bayesChart.addDataSet(this.rules[dataSet].rule!, randomColor, data)
        }
        bayesChart.showChart()
    }

    visualizeForm(form: string, chord: ChordInstance) {
        // var container = new BayesChart('visualization') // document.getElementById('visualization');
        const labels: string[] = []
        const posteriorLastRow = this.getPosterior()

        const lastRow = _.filter(posteriorLastRow,
            function (p: Posterior) {
                return (p.hypo!.key == form)
            })

        const bestMatch = this.getBestPosterior()
        const bestHypo = this.getHypothesis(bestMatch)
        const bestLabel = chord.getRootName(bestHypo) + bestHypo.key + "_i" + bestHypo.inv
        labels.push(bestLabel)

        for (let i = 0; i < lastRow.length; i++) {
            const hypo = this.getHypothesis(lastRow[i])
            const label = chord.getRootName(hypo) + hypo.key + "_i" + hypo.inv // + chord.getBassName(hypo)
            labels.push(label)
        }

        const bayesChart = new BayesChart('visualization', labels)
        for (let dataSet = 1; dataSet < this.posterior.length; dataSet++) {
            const data: number[] = []
            const bestIdx = bestMatch.idx
            const bestPost = this.posterior[dataSet][bestIdx].post
            data.push(bestPost)
            for (let i = 0; i < lastRow.length; i++) {
                const idx = lastRow[i].idx
                const post = this.posterior[dataSet][idx].post
                data.push(post)
            }
            const randomColor = this.randomColorFactor() + ',' + this.randomColorFactor() + ',' + this.randomColorFactor()
            bayesChart.addDataSet(this.rules[dataSet].rule!, randomColor, data)
        }
        bayesChart.showChart()
    }
}
