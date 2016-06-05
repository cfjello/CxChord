/// <reference path="references.ts" />
var CxChord;
(function (CxChord) {
    var BayesCalculator = (function () {
        function BayesCalculator(bayesChordMap) {
            this.bayesChordMap = bayesChordMap;
            this.self = this;
            // google:any = null
            this.hypothesis = [];
            this.rules = [];
            this.likelyhoods = [];
            this.normalizingConst = [];
            this.posterior = [];
            this.chartsCount = 0;
            this.randomColorFactor = function () {
                return Math.round(Math.random() * 255);
            };
            this.createHypothesis();
        }
        //
        // create an even distribution
        // 
        BayesCalculator.prototype.createHypothesis = function () {
            var idx = 0;
            var _self = this.self;
            for (var key in this.bayesChordMap) {
                for (var inv = 0; inv < this.bayesChordMap[key].length; inv++) {
                    _self.hypothesis.push({ idx: idx++,
                        key: key,
                        inv: inv,
                        len: this.bayesChordMap[key][inv].notes.length,
                        root: this.bayesChordMap[key][inv].root });
                }
            }
        };
        BayesCalculator.prototype.getChordMapNotes = function (idx) {
            return this.bayesChordMap[this.hypothesis[idx].key][this.hypothesis[idx].inv].notes;
        };
        BayesCalculator.prototype.standardDeriviation = function (data) {
            var sum = _.sum(data);
            var avg = sum / data.length;
            var squaredDiffs = _.map(data, function (value) {
                var diff = value - avg;
                return diff * diff;
            });
            var avgSquaredDiff = _.sum(squaredDiffs) / squaredDiffs.length;
            var stdDev = Math.sqrt(avgSquaredDiff);
            return stdDev;
        };
        //
        // Apply a Rule to the Hypothesis
        // 
        BayesCalculator.prototype.applyRule = function (rule) {
            var row = this.likelyhoods.length;
            var firstRow = (row == 0);
            var normalizingConst = 0;
            this.rules.push(rule);
            if (_.isUndefined(this.likelyhoods[row]))
                this.likelyhoods[row] = [];
            for (var col = 0; col < this.hypothesis.length; col++) {
                var likelyhood = rule.ruleFx(rule.chord, this.self, row, col);
                this.likelyhoods[row].push(likelyhood);
                var prior = firstRow ? 1 : this.posterior[row - 1][col].post;
                normalizingConst += (prior * likelyhood);
            }
            this.likelyhoods[row].push(normalizingConst);
            this.calcPosterior(row);
        };
        BayesCalculator.prototype.calcPosterior = function (_row) {
            for (var row = _row < 0 ? 0 : _row; row < this.likelyhoods.length; row++) {
                var firstRow = (row == 0);
                var colIdx = this.likelyhoods[row].length - 1;
                var normalizingConst = this.likelyhoods[row][colIdx];
                if (_.isUndefined(this.posterior[row]))
                    this.posterior[row] = [];
                for (var col = 0; col < this.hypothesis.length; col++) {
                    var prior = firstRow ? 1 : this.posterior[row - 1][col].post;
                    var likelyhood = this.likelyhoods[row][col];
                    var posterior = (prior * likelyhood) / (firstRow ? 1 : normalizingConst);
                    this.posterior[row].push({ post: posterior, idx: col });
                }
            }
        };
        BayesCalculator.prototype.getPosteriorByRow = function (rowIdx) {
            if (rowIdx < 0 || rowIdx >= this.posterior.length || _.isUndefined(this.posterior[rowIdx]))
                throw Error("getPosteriorByRow index: " + rowIdx + " is out of range or undefined");
            // this.posterior[rowIdx][col].rootName = CxChord.getRootName(this.posterior[rowIdx][col].idx)
            for (var col = 0; col < this.hypothesis.length; col++) {
                this.posterior[rowIdx][col].hypo = this.hypothesis[col];
            }
            return _.orderBy(this.posterior[rowIdx], ['post', 'hypo.len', 'hypo.inv'], 'desc');
        };
        BayesCalculator.prototype.getPosterior = function () {
            var lastRow = this.posterior.length - 1;
            if (lastRow < 0)
                return [];
            else
                return this.getPosteriorByRow(lastRow);
        };
        BayesCalculator.prototype.getHypothesis = function (posterior) {
            return this.hypothesis[posterior.idx];
        };
        BayesCalculator.prototype.getHypothesisByIdx = function (idx) {
            if (idx < 0 || idx >= this.hypothesis.length)
                throw Error("getHypothesisByIdx index: " + idx + " is out of range");
            return this.hypothesis[idx];
        };
        BayesCalculator.prototype.getBestMatch = function (idx) {
            if (idx === void 0) { idx = 0; }
            var res = this.getPosterior();
            return res[idx];
        };
        BayesCalculator.prototype.getTopX = function (topX, row) {
            if (topX === void 0) { topX = 10; }
            if (row === void 0) { row = this.posterior.length - 1; }
            var posterior = this.getPosteriorByRow(row);
            return _.take(posterior, topX);
        };
        // Returns a random integer between min (included) and max (included)
        // Using Math.round() will give you a non-uniform distribution!
        BayesCalculator.prototype.getRandomIntInclusive = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        ;
        BayesCalculator.prototype.visualizeTopX = function (title, chord, topX) {
            if (topX === void 0) { topX = 10; }
            // var container = new BayesChart('visualization') // document.getElementById('visualization');
            var labels = [];
            var posteriorLastRow = this.getTopX(topX);
            var bayesChart;
            for (var i = 0; i < posteriorLastRow.length; i++) {
                var hypo = this.getHypothesis(posteriorLastRow[i]);
                var label = chord.getRootName(hypo) + hypo.key + "_i" + hypo.inv; // + chord.getBassName(hypo)
                labels.push(label);
            }
            bayesChart = new CxChord.BayesChart('visualization', labels);
            for (var dataSet = 1; dataSet < this.posterior.length; dataSet++) {
                var data = [];
                for (var i = 0; i < posteriorLastRow.length; i++) {
                    var idx = posteriorLastRow[i].idx;
                    var post = this.posterior[dataSet][idx].post;
                    data.push(post);
                }
                var randomColor = this.randomColorFactor() + ',' + this.randomColorFactor() + ',' + this.randomColorFactor();
                bayesChart.addDataSet(this.rules[dataSet].rule, randomColor, data);
            }
            bayesChart.showChart();
        };
        return BayesCalculator;
    }());
    CxChord.BayesCalculator = BayesCalculator;
})(CxChord || (CxChord = {}));
//# sourceMappingURL=CxBayes.js.map