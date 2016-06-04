/// <reference path="references.ts" />

namespace CxChord {
      		
		export const rootNoteNamesB: RootNoteNames =  {
			sharp: ["C", "C#", "D","D#","E","F","F#","G","G#","A", "A#", "B" ],
			flat:  ["C", "Db", "D","Eb","E","F","Gb","G","Ab","A", "Bb", "B" ]
		}
		
		//
		// Global static functions
		// 
		export function getRootNameB( root: number, sharpOrFlat: string = 'flat' ): string {
				var root = root < 0 ? root + 12 : root
				return CxChord.rootNoteNamesB[sharpOrFlat][root]		
		} 
			
		/*
		interface RuleMap<K, V> {
			// clear(): void;
			// delete(key: K): boolean;
			// forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
			get(key: K): V;
			has(key: K): boolean;
			set(key: K, value: V): Map<K, V>;
			size: number;
   		}
		*/ 
}