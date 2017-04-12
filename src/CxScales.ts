/// <reference path="references.ts" />

namespace CxChord {

	export enum Scale_Type { major = 1, minor = 2, altered = 4, dominant = 8, dimished = 16, wholeTone = 32 }

	export const scaleMap: ScaleMap = {
		"Ionian": 			{ notes: [0, 2, 4, 5, 7, 9, 11], major: 0, minor: -3, 	group: Scale_Type.major },
		"Dorian": 			{ notes: [0, 2, 3, 5, 7, 9, 10], major: 3, minor: 0, 	group: Scale_Type.minor },
		"Phygian": 			{ notes: [0, 1, 3, 5, 7, 8, 10], major: 3, minor: 0, 	group: Scale_Type.minor },
		"Lydian": 			{ notes: [0, 2, 4, 5, 7, 9, 11], major: 0, minor: -3, 	group: Scale_Type.major },
		"Mixolydian": 		{ notes: [0, 2, 4, 5, 7, 9, 11], major: 0, minor: -3, 	group: Scale_Type.dominant },
		"Aeolian": 			{ notes: [0, 2, 3, 5, 7, 8, 10], major: 0, minor: 3, 	group: Scale_Type.minor },
		"Locrian": 			{ notes: [0, 1, 3, 5, 6, 8, 10], major: 0, minor: null, group: Scale_Type.dimished },
		"HarmonicMinor": 	{ notes: [0, 2, 3, 5, 7, 8, 11], major: 0, minor: null, group: Scale_Type.minor },
		"MelodicMinor": 	{ notes: [0, 2, 3, 5, 7, 9, 11], major: 0, minor: null, group: Scale_Type.minor },
		"WholeTone": 		{ notes: [0, 2, 4, 6, 8, 10   ], major: 0, minor: null, group: Scale_Type.minor }
	}

	export enum Chord_Type { major, majorb5, majorAug, minor, minorb5, dominant, dominantAlt , dimished, halfDiminished } 

	// TODO: implemenation pending
}