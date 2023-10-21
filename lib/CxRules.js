"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rules = void 0;
var CxForms_1 = require("./CxForms");
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
var Rules = /** @class */ (function () {
    function Rules(_chord, debugKey) {
        if (debugKey === void 0) { debugKey = 'Maj'; }
        this.debugKey = debugKey;
        // size    = 0
        this.ruleMap = new Map();
        //
        // TODO: Scores and Penalties (tax) should be configurable or even dynamic and trained for best matching capability
        //
        //
        // Even Distribution Rule
        // 
        this.set('EvenDistribution', {
            chord: _chord,
            // deno-lint-ignore no-unused-vars
            ruleFx: function (chord, bayes, row, col) {
                var _a;
                var evenDistibution = (_a = 1 / bayes.hypothesis.length) !== null && _a !== void 0 ? _a : 0;
                return evenDistibution;
            }
        });
        //
        // Count the number of notes and see iof they match with the Hypothesis chord  
        //
        this.set('CountNotes', {
            chord: _chord,
            // deno-lint-ignore no-unused-vars
            ruleFx: function (chord, bayes, row, col) {
                var hypoLen = bayes.hypothesis[col].len;
                var chordLen = chord.chordInv[0].length;
                var score = 0.1;
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
        this.set('MustHave', {
            chord: _chord,
            // deno-lint-ignore no-unused-vars
            ruleFx: function (chord, bayes, row, col) {
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
        this.set('Knockouts', {
            chord: _chord,
            // deno-lint-ignore no-unused-vars
            ruleFx: function (chord, bayes, row, col) {
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
        this.set('MatchedNotes', {
            chord: _chord,
            // deno-lint-ignore no-unused-vars
            ruleFx: function (chord, bayes, row, col) {
                var key = bayes.hypothesis[col].key;
                var inv = bayes.hypothesis[col].inv;
                var chordLen = chord.chordInv[0].length;
                var matches = chord.matchedNotes[key].invertions[inv].length;
                var missing = chordLen - matches;
                var missingTax = 2;
                var score = matches / (bayes.hypothesis[col].len + (missing * missingTax));
                return score;
            }
        });
        //
        // Root is present Rule  
        //
        this.set('RootFound', {
            chord: _chord,
            // deno-lint-ignore no-unused-vars
            ruleFx: function (chord, bayes, row, col) {
                var key = bayes.hypothesis[col].key;
                var inv = bayes.hypothesis[col].inv;
                var indexOfRoot = chord.matchedNotes[key].roots[inv];
                var favorJazz = chord.favorJazzChords;
                var score;
                // Check if it is a jazzchord
                var flavor = bayes.hypothesis[col].group;
                var jazzChord = (flavor == CxForms_1.GR.rootLess);
                //
                // Score root as first note in chord higher than inversions
                // and special handling for Jazz left hand chords (negative root)
                // 
                var inversionTax = 0.1 * inv;
                inversionTax = inversionTax < 1 ? inversionTax : 0.8;
                if (jazzChord) {
                    if (jazzChord && !favorJazz) {
                        score = 0.2;
                    }
                    else {
                        score = indexOfRoot >= 0 ? 0.2 : 1 - inversionTax;
                    }
                }
                else if (indexOfRoot == 0) {
                    score = favorJazz ? 0.7 : 1;
                }
                else if (indexOfRoot > 0) {
                    score = favorJazz ? 0.7 - inversionTax : 1 - inversionTax;
                }
                else {
                    score = 0.6 - inversionTax;
                }
                return score;
            }
        });
        //
        // favor Jazz Rule  
        //
        this.set('FavorJazz', {
            chord: _chord,
            ruleFx: function (chord, bayes, row, col) {
                var key = bayes.hypothesis[col].key;
                var flavor = bayes.hypothesis[col].group;
                var jazzChord = (flavor == CxForms_1.GR.rootLess || flavor == CxForms_1.GR.reduced);
                if (key == "Maj,7,-5") {
                    var debug = true;
                }
                var score = jazzChord ? 1 : 0.70;
                return score;
            }
        });
        //
        // Conflict Rule  
        //
        this.set('Conflicts', {
            chord: _chord,
            ruleFx: function (chord, bayes, row, col) {
                var key = bayes.hypothesis[col].key;
                var inv = bayes.hypothesis[col].inv;
                var conflicts = chord.matchedNotes[key].conflicts[inv];
                var score = 1 / (conflicts == 0 ? 1 : conflicts * 10);
                return score;
            }
        });
        //
        // Group Rule  
        //
        this.set('ChordGroup', {
            chord: _chord,
            ruleFx: function (chord, bayes, row, col) {
                var score = 1 / chord.matchedNotes[bayes.hypothesis[col].key].group;
                return score;
            }
        });
    }
    Rules.prototype.get = function (key) {
        return this.ruleMap.get(key);
    };
    Rules.prototype.has = function (key) {
        return this.ruleMap.has(key);
    };
    Rules.prototype.set = function (key, rule) {
        rule.rule = key;
        this.ruleMap.set(key, rule);
        // this.size = _.keys(this.ruleMap).length
        return this.ruleMap.get(key);
    };
    return Rules;
}());
exports.Rules = Rules;
