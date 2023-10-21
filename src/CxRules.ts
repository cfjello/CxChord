import { BayesChordCalculator } from "./CxBayes";
import { ChordInstance } from "./CxChordInst";
import { GR } from "./CxForms";
import { Rule } from "./Interfaces";
import * as _ from "lodash";

/*
export interface RuleMap<K, V> {
    // clear(): void;
    // delete(key: K): boolean;
    // forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value: V): Map<K, V>;
    size: number;
}
*/ 

export class Rules {
    
    // size    = 0

    ruleMap = new Map<string, Rule>();

    get<K,V>(key: string): Rule {
        return this.ruleMap.get(key)! satisfies Rule
    }

    has(key: string): boolean {
        return this.ruleMap.has(key)
    }

    set(key: string, rule: Rule) {
        rule.rule = key
        this.ruleMap.set(key, rule)
        // this.size = _.keys(this.ruleMap).length
        return this.ruleMap.get(key)
    }

    constructor(_chord: ChordInstance, public debugKey: string = 'Maj') {
        //
        // TODO: Scores and Penalties (tax) should be configurable or even dynamic and trained for best matching capability
        //
        //
        // Even Distribution Rule
        // 
        this.set('EvenDistribution', {
            chord: _chord, 
            // deno-lint-ignore no-unused-vars
            ruleFx: function (chord: ChordInstance, bayes: BayesChordCalculator, row, col) {
                const evenDistibution = 1 / bayes.hypothesis.length ?? 0
                return evenDistibution;
            }
        });
        //
        // Count the number of notes and see iof they match with the Hypothesis chord  
        //
        this.set('CountNotes', {
            chord: _chord, 
            // deno-lint-ignore no-unused-vars
            ruleFx: function (chord: ChordInstance, bayes: BayesChordCalculator, row, col) {
                const hypoLen = bayes.hypothesis[col].len
                const chordLen = chord.chordInv[0].length
                let score = 0.1
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
            // deno-lint-ignore no-unused-vars
            ruleFx: function (chord, bayes, row, col) {
                const key = bayes.hypothesis[col].key
                const inv = bayes.hypothesis[col].inv
                const mustHave = chord.matchedNotes[key].mustHave[inv]
                const score = 1 / (mustHave == 0 ? 1 : Math.abs(mustHave) * 2)
                return score
            }
        });
        //
        // Knockout Rule  
        //
        this.set('Knockouts', {
            chord: _chord, 
            // deno-lint-ignore no-unused-vars
            ruleFx: function (chord, bayes, row, col) {
                const key = bayes.hypothesis[col].key
                const inv = bayes.hypothesis[col].inv
                const knockouts = chord.matchedNotes[key].knockouts[inv].length
                const score = 1 / (knockouts == 0 ? 1 : knockouts * 10)
                return score
            }
        });
        //
        // Matched Notes rule
        // 
        this.set('MatchedNotes', {
            chord: _chord, 
            // deno-lint-ignore no-unused-vars
            ruleFx: function (chord, bayes, row, col) {
                const key = bayes.hypothesis[col].key
                const inv = bayes.hypothesis[col].inv
                const chordLen = chord.chordInv[0].length
                const matches = chord.matchedNotes[key].invertions[inv].length
                const missing = chordLen - matches
                const missingTax = 2
                const score: number = matches / (bayes.hypothesis[col].len + (missing * missingTax))
                return score
            }
        });
        //
        // Root is present Rule  
        //
        this.set('RootFound', {
            chord: _chord, 
            // deno-lint-ignore no-unused-vars
            ruleFx: function (chord, bayes, row, col) {
                const key = bayes.hypothesis[col].key
                const inv = bayes.hypothesis[col].inv
                const indexOfRoot = chord.matchedNotes[key].roots[inv]
                const favorJazz = chord.favorJazzChords
                let score: number
                // Check if it is a jazzchord
                const flavor = bayes.hypothesis[col].group
                const jazzChord: boolean = (flavor == GR.rootLess)
                //
                // Score root as first note in chord higher than inversions
                // and special handling for Jazz left hand chords (negative root)
                // 
            
                let inversionTax = 0.1 * inv
                inversionTax = inversionTax < 1 ? inversionTax : 0.8
                if (jazzChord) {
                    if ( jazzChord && ! favorJazz ) {
                        score = 0.2 
                    }
                    else {
                        score = indexOfRoot >= 0 ? 0.2 : 1 - inversionTax
                    }
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
                const key = bayes.hypothesis[col].key
                const flavor = bayes.hypothesis[col].group
                const jazzChord: boolean = (flavor == GR.rootLess || flavor == GR.reduced)
                if (key == "Maj,7,-5") {
                    const debug = true
                }
                const score = jazzChord ? 1 : 0.70
                return score
            }
        });
        //
        // Conflict Rule  
        //
        this.set('Conflicts', {
            chord: _chord, 
            ruleFx: function (chord, bayes, row, col) {
                const key = bayes.hypothesis[col].key
                const inv = bayes.hypothesis[col].inv
                const conflicts = chord.matchedNotes[key].conflicts[inv]
                const score = 1 / (conflicts == 0 ? 1 : conflicts * 10)
                return score
            }
        });
        //
        // Group Rule  
        //
        this.set('ChordGroup', {
            chord: _chord, 
            ruleFx: function (chord, bayes, row, col) {
                const score = 1 / chord.matchedNotes[bayes.hypothesis[col].key].group
                return score
            }
        });

    }
}