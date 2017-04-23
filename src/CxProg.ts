/// <reference path="references.ts" />

namespace CxChord {
    enum Chord_Type { major, majorb5, majorAug, minor, minorb5, dominant, dominantAlt , dimished, halfDiminished } 

    // interface ChordProgression {
            // clear(): void;
            // delete(key: K): boolean;
            // forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
            // get(key: K): V;
            // has(key: K): boolean;
            // set(key: K, value: V): Map<K, V>;
            // size: number;
    // }

    // TODO: Implementation pending
    export class Progresions {
        constructor() {
            this.buildProgressions()
        }

        buildProgressions() {
            //
            // Loop through the Scales
            //
            _.forIn(CxChord.scaleMap, function(scaleEntry: ScaleMapEntry, scaleKey) {
			    // Loop through the Chordmap
			    // 
                _.forIn(chordMap, function(chordEntry: ChordMapEntry, chordKey) {
                    

                })
            })
        }
    }
}