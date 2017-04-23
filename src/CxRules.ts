/// <reference path="references.ts" />

namespace CxChord {


    export interface RuleMap<K, V> {
        // clear(): void;
        // delete(key: K): boolean;
        // forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
        get(key: K): V;
        has(key: K): boolean;
        set(key: K, value: V): Map<K, V>;
        size: number;
    }

    export class Rules implements RuleMap<string, Rule> {
        ruleMap = {}
        size: number = 0

        get(key) {
            return this.ruleMap[key]
        }

        has(key) {
            return _.has(this.ruleMap, key)
        }

        set(key, value) {
            value.rule = key
            this.ruleMap[key] = value
            this.size = _.keys(this.ruleMap).length
            return this.ruleMap[key]
        }

        constructor(_chord: ChordInstance = null, public debugKey: string = 'Maj') {
            //
            // TODO: Scores and Penalties (tax) should be configurable or even dynamic for best matching capability
            //
            //
            // Even Distribution Rule
            // 
            this.set('EvenDistribution', {
                chord: _chord, 
                ruleFx: function (chord, bayes, row, col) {
                    var evenDistibution: number = 1 / bayes.hypothesis.length
                    return evenDistibution;
                }
            });
            //
            // Count the number of notes and see iof they match with the Hypothesis chord  
            //
            this.set('CountNotes', {
                chord: _chord, 
                ruleFx: function (chord, bayes, row, col) {
                    var hypoLen = bayes.hypothesis[col].len
                    var chordLen = chord.chordInv[0].length
                    var score: number
                    if (hypoLen == chordLen)
                        score = 1
                    else if (hypoLen > chordLen)
                        score = 1 / (hypoLen - chordLen) * 2
                    else if (hypoLen < chordLen)
                        score = 1 / (chordLen - hypoLen) * 2
                    return score;
                }
            });
            //
            // MustHave Rule  
            //
            this.set('MustHave', {
                chord: _chord, 
                ruleFx: function (chord, bayes, row, col) {
                    var key = bayes.hypothesis[col].key
                    var inv = bayes.hypothesis[col].inv
                    var mustHave = chord.matchedNotes[key].mustHave[inv]
                    var score = 1 / (mustHave == 0 ? 1 : Math.abs(mustHave) * 2)
                    return score
                }
            });
            //
            // Knockout Rule  
            //
            this.set('Knockouts', {
                chord: _chord, 
                ruleFx: function (chord, bayes, row, col) {
                    var key = bayes.hypothesis[col].key
                    var inv = bayes.hypothesis[col].inv
                    var knockouts = chord.matchedNotes[key].knockouts[inv].length
                    var score = 1 / (knockouts == 0 ? 1 : knockouts * 10)
                    return score
                }
            });
            //
            // Matched Notes rule
            // 
            this.set('MatchedNotes', {
                chord: _chord, 
                ruleFx: function (chord, bayes, row, col) {
                    var key = bayes.hypothesis[col].key
                    var inv = bayes.hypothesis[col].inv
                    var chordLen = chord.chordInv[0].length
                    var matches = chord.matchedNotes[key].invertions[inv].length
                    var missing = chordLen - matches
                    var missingTax = 2
                    var score: number = matches / (bayes.hypothesis[col].len + (missing * missingTax))
                    return score
                }
            });
            //
            // Root is present Rule  
            //
            this.set('RootFound', {
                chord: _chord, 
                ruleFx: function (chord, bayes, row, col) {
                    var key = bayes.hypothesis[col].key
                    var inv = bayes.hypothesis[col].inv
                    var indexOfRoot = chord.matchedNotes[key].roots[inv]
                    var favorJazz = chord.favorJazzChords
                    var score: number
                    // Check if it is a jazzchord
                    var flavor = bayes.hypothesis[col].group
                    var jazzChord: boolean = (flavor == GR.rootLess)
                    //
                    // Score root as first note in chord higher than inversions
                    // and special handling for Jazz left hand chords (negative root)
                    // 
                    if (key == this.currKey) {
                        var debug = true
                    }
                    var inversionTax = 0.1 * inv
                    inversionTax = inversionTax < 1 ? inversionTax : 0.8
                    if (jazzChord) {
                        score = indexOfRoot >= 0 ? 0.2 : 1 - inversionTax
                    }
                    else if (indexOfRoot == 0) {
                        score = favorJazz ? 0.7 : 1
                    }
                    else if (indexOfRoot > 0) {
                        score = favorJazz ? 0.7 - inversionTax : 1 - inversionTax

                    }
                    else {
                        score = 0.6 - inversionTax
                    }
                    return score
                }
            });
            //
            // favor Jazz Rule  
            //
            this.set('FavorJazz', {
                chord: _chord, 
                ruleFx: function (chord, bayes, row, col) {
                    var key = bayes.hypothesis[col].key
                    var flavor = bayes.hypothesis[col].group
                    var jazzChord: boolean = (flavor == GR.rootLess || flavor == GR.reduced)
                    if (key == "Maj,7,-5") {
                        var debug = true
                    }
                    var score = jazzChord ? 1 : 0.70
                    return score
                }
            });
            //
            // Conflict Rule  
            //
            this.set('Conflicts', {
                chord: _chord, 
                ruleFx: function (chord, bayes, row, col) {
                    var key = bayes.hypothesis[col].key
                    var inv = bayes.hypothesis[col].inv
                    var conflicts = chord.matchedNotes[key].conflicts[inv]
                    var score = 1 / (conflicts == 0 ? 1 : conflicts * 10)
                    return score
                }
            });
            //
            // Group Rule  
            //
            this.set('ChordGroup', {
                chord: _chord, 
                ruleFx: function (chord, bayes, row, col) {
                    var score = 1 / chord.matchedNotes[bayes.hypothesis[col].key].group
                    return score
                }
            });

        }
    }
}


