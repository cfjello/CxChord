/// <reference path="references.ts" />
var CxChord;
(function (CxChord) {
    var Rules = (function () {
        function Rules(_chord) {
            if (_chord === void 0) { _chord = null; }
            this.ruleMap = {};
            this.size = 0;
            //
            // Even Distribution Rule
            // 
            this.set('EvenDistribution', { rule: 'EvenDistribution', chord: _chord, ruleFx: function (chord, bayes, row, col) {
                    var evenDistibution = 1 / bayes.hypothesis.length;
                    return evenDistibution;
                }
            });
            //
            // Count the number of notes and see iof they match with the Hypothesis chord  
            //
            this.set('CountNotes', { rule: 'CountNotes', chord: _chord, ruleFx: function (chord, bayes, row, col) {
                    var hypoLen = bayes.hypothesis[col].len;
                    var chordLen = chord.chordInv[0].length;
                    var score;
                    if (hypoLen == chordLen)
                        score = 1;
                    else if (hypoLen > chordLen)
                        score = 1 / (hypoLen - chordLen) * 2;
                    else if (hypoLen < chordLen)
                        score = 1 / (chordLen - hypoLen) * 2;
                    return score;
                }
            });
            //
            // MustHave Rule  
            //
            this.set('MustHave', { rule: 'MustHave', chord: _chord, ruleFx: function (chord, bayes, row, col) {
                    var key = bayes.hypothesis[col].key;
                    var inv = bayes.hypothesis[col].inv;
                    var mustHave = chord.matchedNotes[key].mustHave[inv];
                    var score = 1 / (mustHave == 0 ? 1 : Math.abs(mustHave) * 2);
                    return score;
                }
            });
            //
            // Knockout Rule  
            //
            this.set('Knockouts', { rule: 'Knockouts', chord: _chord, ruleFx: function (chord, bayes, row, col) {
                    var key = bayes.hypothesis[col].key;
                    var inv = bayes.hypothesis[col].inv;
                    var knockouts = chord.matchedNotes[key].knockouts[inv].length;
                    var score = 1 / (knockouts == 0 ? 1 : knockouts * 10);
                    return score;
                }
            });
            //
            // Matched Notes rule
            // 
            // matchedNotes:   { [key:string] : { invertions: any[], extensions: any[], knockouts: any[], group: number } } 
            this.set('MatchedNotes', { rule: 'MatchedNotes', chord: _chord, ruleFx: function (chord, bayes, row, col) {
                    var key = bayes.hypothesis[col].key;
                    var inv = bayes.hypothesis[col].inv;
                    // var hypoLen    = bayes.hypothesis[col].len
                    var chordLen = chord.chordInv[0].length;
                    var matches = chord.matchedNotes[key].invertions[inv].length;
                    var missing = chordLen - matches;
                    // var fullMatchTax   = chord.fullMatch && missing > 0 ? -2 : 0 
                    // var score: number = matches / chord.chordInv[0].length  
                    var missingTax = 2;
                    // var score: number = ( matches / bayes.hypothesis[col].len ) - missingTax 
                    var score = matches / (bayes.hypothesis[col].len + (missing * missingTax));
                    // score += fullMatchTax
                    /*
                    if ( score < 1 )  {
                            var remaining  = chordLen - matches
                            var matchedExt = chord.matchedNotes[key].extensions[inv].length
                            var scoreExt   = remaining == 0 || matchedExt == 0 ? 0 : remaining / matchedExt
                            if ( scoreExt > 0 )  {
                                score = ( score * 2 + scoreExt ) / 3
                            }
                    }
                    */
                    return score;
                }
            });
            //
            // Root is present Rule  
            //
            this.set('RootFound', { rule: 'RootFound', chord: _chord, ruleFx: function (chord, bayes, row, col) {
                    var key = bayes.hypothesis[col].key;
                    var inv = bayes.hypothesis[col].inv;
                    var indexOfRoot = chord.matchedNotes[key].roots[inv];
                    var score;
                    //
                    // Score root as first note in chord higher than inversions
                    // and special handling for Jazz left hand chords (negative root)
                    // 
                    if (CxChord.isNoRootChord(bayes.hypothesis[col].key)) {
                        score = indexOfRoot >= 0 ? 0.2 : 0.8;
                    }
                    else if (indexOfRoot == 0) {
                        score = 1;
                    }
                    else {
                        var inversionTax = 0.1 * inv;
                        score = indexOfRoot > 0 ? 1 - (inversionTax < 1 ? inversionTax : 0.8) : 0.2;
                    }
                    return score;
                }
            });
            //
            // Conflict Rule  
            //
            this.set('Conflicts', { rule: 'conclicts', chord: _chord, ruleFx: function (chord, bayes, row, col) {
                    var key = bayes.hypothesis[col].key;
                    var inv = bayes.hypothesis[col].inv;
                    // if ( ! _.isUndefined( ) ) 
                    // var knockouts  = chord.matchedNotes[key].knockouts[inv].length
                    var conflicts = chord.matchedNotes[key].conflicts[inv];
                    var score = 1 / (conflicts == 0 ? 1 : conflicts * 100);
                    return score;
                }
            });
            //
            // Group Rule  
            //
            this.set('ChordGroup', { rule: 'ChordGroup', chord: _chord, ruleFx: function (chord, bayes, row, col) {
                    var score = 1 / chord.matchedNotes[bayes.hypothesis[col].key].group;
                    return score;
                }
            });
        }
        Rules.prototype.get = function (key) {
            return this.ruleMap[key];
        };
        Rules.prototype.has = function (key) {
            return _.has(this.ruleMap, key);
        };
        Rules.prototype.set = function (key, value) {
            this.ruleMap[key] = value;
            this.size = _.keys(this.ruleMap).length;
            return this.ruleMap[key];
        };
        return Rules;
    }());
    CxChord.Rules = Rules;
})(CxChord || (CxChord = {}));
//# sourceMappingURL=CxRules.js.map