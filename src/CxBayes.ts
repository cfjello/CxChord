/// <reference path="references.ts" />

namespace CxChord {

    export class BayesChordCalculator {
        self = this
        hypothesis:         Hypothesis[]    = []
        rules:              Rule[]          = []
        likelyhoods:        number[][]      = []
        normalizingConst:   number[]        = []
        posterior:          Posterior[][]   = []
        chartsCount:        number          = 0

        constructor(public bayesChordMap: ChordMapTable) {
            this.createHypothesis()

        }
        //
        // create an even distribution
        // 
        createHypothesis() {
            var idx: number = 0
            var _self = this.self

            for (var key in this.bayesChordMap) {
                for (var inv = 0; inv < this.bayesChordMap[key].length; inv++) {
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
            var sum = _.sum(data)
            var avg = sum / data.length
            var squaredDiffs = _.map(data, function (value) {
                var diff = value - avg
                return diff * diff
            })
            var avgSquaredDiff = _.sum(squaredDiffs) / squaredDiffs.length
            var stdDev = Math.sqrt(avgSquaredDiff)
            return stdDev
        }

        //
        // Apply a Rule to the Hypothesis
        // 
        applyRule(rule: Rule) {
            var row = this.likelyhoods.length
            var firstRow: boolean = (row == 0)
            var normalizingConst = 0
            this.rules.push(rule)
            if (_.isUndefined(this.likelyhoods[row]))
                this.likelyhoods[row] = []
            for (var col = 0; col < this.hypothesis.length; col++) {
                var likelyhood = rule.ruleFx(rule.chord, this.self, row, col)
                this.likelyhoods[row].push(likelyhood)
                var prior = firstRow ? 1 : this.posterior[row - 1][col].post
                normalizingConst += (prior * likelyhood)
            }
            this.likelyhoods[row].push(normalizingConst)
            this.calcPosterior(row)
        }

        calcPosterior(_row: number) {
            for (var row = _row < 0 ? 0 : _row; row < this.likelyhoods.length; row++) {
                var firstRow: boolean = (row == 0)
                var colIdx = this.likelyhoods[row].length - 1
                var normalizingConst = this.likelyhoods[row][colIdx]
                if (_.isUndefined(this.posterior[row]))
                    this.posterior[row] = []
                for (var col = 0; col < this.hypothesis.length; col++) {
                    var prior = firstRow ? 1 : this.posterior[row - 1][col].post
                    var likelyhood = this.likelyhoods[row][col]
                    var posterior = (prior * likelyhood) / (firstRow ? 1 : normalizingConst)
                    this.posterior[row].push({ post: posterior, idx: col })
                }
            }
        }

        getPosteriorByRow(rowIdx: number): Posterior[] {
            if (rowIdx < 0 || rowIdx >= this.posterior.length || _.isUndefined(this.posterior[rowIdx]))
                throw Error("getPosteriorByRow index: " + rowIdx + " is out of range or undefined")
            // this.posterior[rowIdx][col].rootName = CxChord.getRootName(this.posterior[rowIdx][col].idx)
            for (var col = 0; col < this.hypothesis.length; col++) {
                this.posterior[rowIdx][col].hypo = this.hypothesis[col]

            }
            return _.orderBy(this.posterior[rowIdx], ['post', 'hypo.len', 'hypo.inv'], 'desc')
        }

        getPosterior(): Posterior[] {
            var lastRow = this.posterior.length - 1
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

        getBestPosterior(idx: number = 0): Posterior {
            var res = this.getPosterior()
            if ( idx < 0 || idx >= res.length ) 
                throw Error("getBestPosterior index: " + idx + " is out of range")
            return res[idx] 
        }

        normalize( posterior: Posterior[]  ) {
            var postArr: number[] = []
             _.forEach(posterior, function(val) { 
                 postArr.push(val.post)
             })
            var sum = _.sum(postArr)
            var checkSum = 0
            for ( var i = 0; i < postArr.length; i++ ) {
                posterior[i].post = postArr[i] / sum
                checkSum += posterior[i].post
            }
            // console.log( "checkSum: " + checkSum )
        }

        getTopX(topX: number = 10, row: number = this.posterior.length - 1, normalize: boolean = true): Posterior[] {
            var posterior = this.getPosteriorByRow(row)
            var postTopX = _.take(posterior, topX)
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

        visualizeTopX(title: string, chord: ChordInstance, topX: number = 10) {
            // var container = new BayesChart('visualization') // document.getElementById('visualization');
            var labels: string[] = []
            var posteriorLastRow = this.getTopX(topX)
            var bayesChart: BayesChart

            for (var i = 0; i < posteriorLastRow.length; i++) {
                var hypo = this.getHypothesis(posteriorLastRow[i])
                var label = chord.getRootName(hypo) + hypo.key + "_i" + hypo.inv // + chord.getBassName(hypo)
                labels.push(label)
            }

            bayesChart = new BayesChart('visualization', labels)
            for (var dataSet = 1; dataSet < this.posterior.length; dataSet++) {
                var data: number[] = []
                for (var i = 0; i < posteriorLastRow.length; i++) {
                    var idx = posteriorLastRow[i].idx
                    var post = this.posterior[dataSet][idx].post
                    data.push(post)
                }
                var randomColor = this.randomColorFactor() + ',' + this.randomColorFactor() + ',' + this.randomColorFactor()
                bayesChart.addDataSet(this.rules[dataSet].rule, randomColor, data)
            }
            bayesChart.showChart()
        }

        visualizeForm(form: string, chord: ChordInstance) {
            // var container = new BayesChart('visualization') // document.getElementById('visualization');
            var labels: string[] = []
            var posteriorLastRow = this.getPosterior()
            var bayesChart: BayesChart

            var lastRow = _.filter(posteriorLastRow,
                function (p) {
                    return (p.hypo.key == form)
                })

            var bestMatch = this.getBestPosterior()
            var bestHypo = this.getHypothesis(bestMatch)
            var bestLabel = chord.getRootName(bestHypo) + bestHypo.key + "_i" + bestHypo.inv
            labels.push(bestLabel)

            for (var i = 0; i < lastRow.length; i++) {
                var hypo = this.getHypothesis(lastRow[i])
                var label = chord.getRootName(hypo) + hypo.key + "_i" + hypo.inv // + chord.getBassName(hypo)
                labels.push(label)
            }

            bayesChart = new BayesChart('visualization', labels)
            for (var dataSet = 1; dataSet < this.posterior.length; dataSet++) {
                var data: number[] = []
                var bestIdx = bestMatch.idx
                var bestPost = this.posterior[dataSet][bestIdx].post
                data.push(bestPost)
                for (var i = 0; i < lastRow.length; i++) {
                    var idx = lastRow[i].idx
                    var post = this.posterior[dataSet][idx].post
                    data.push(post)
                }
                var randomColor = this.randomColorFactor() + ',' + this.randomColorFactor() + ',' + this.randomColorFactor()
                bayesChart.addDataSet(this.rules[dataSet].rule, randomColor, data)
            }
            bayesChart.showChart()
        }
    }
}