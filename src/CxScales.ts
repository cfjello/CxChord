/// <reference path="references.ts" />

namespace CxChord {
      	
		  
	    export enum Scale_GR { major = 1, minor = 2 , altered = 4, dominant = 8, dimished = 16 } 
		
		export const scaleMap: ScaleMap = {
			"Ionian" 				: { notes: [0,2,4,5,7,9,11], major: 0, minor: -3, 	group: Scale_GR.major },
			"Dorian" 				: { notes: [0,2,3,5,7,9,10], major: 3, minor: 0,  	group: Scale_GR.minor },
			"Phygian" 				: { notes: [0,1,3,5,7,8,10], major: 3, minor: 0,  	group: Scale_GR.minor },
			"Lydian" 				: { notes: [0,2,4,5,7,9,11], major: 0, minor: -3, 	group: Scale_GR.major },
			"Mixolydian" 			: { notes: [0,2,4,5,7,9,11], major: 0, minor: -3, 	group: Scale_GR.dominant },
			"Aeolian" 				: { notes: [0,2,3,5,7,8,10], major: 0, minor: 3,  	group: Scale_GR.minor },
			"Locrian" 				: { notes: [0,1,3,5,6,8,10], major: 0, minor: null, group: Scale_GR.dimished },
			"HarmonicMinor" 		: { notes: [0,2,3,5,7,8,11], major: 0, minor: null, group: Scale_GR.minor },
			"MelodicMinor" 			: { notes: [0,2,3,5,7,9,11], major: 0, minor: null, group: Scale_GR.minor }
		}
		
}