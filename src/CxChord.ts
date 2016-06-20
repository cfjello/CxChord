/// <reference path="references.ts" />

namespace CxChord {

    export class ChordInstance {
		offset: number[] = []
		chordInv: number[][] = []
        matchedNotes: MatchedNotes = {}
		favorJazzChords: boolean = false

		constructor(public midiChord: number[], public normalizeChord: boolean = true) {
			this.validate(midiChord)
			for (var i = 0; i < midiChord.length; i++) {
				this.offset.push(midiChord[i])
			}
			this.chordInv = this.invert(midiChord)
		}

		addOffset(chord: number[], offset: number): number[] {
			var res: number[] = []
			for (var i = 0; i < chord.length; i++) {
				res.push(chord[i] + offset)
			}
			return res;
		}

		addRootOffset(chord: number[], root: number): number[] {
			var offset = (root < 0 ? 12 + root : root) % 12
			return this.normalize(this.addOffset(chord, offset))
		}

		getOffset(inv: number): number {
			if (inv < 0 || inv >= this.offset.length)
				throw Error("getRootOffset inversion is out of range")
			else
				return this.offset[inv]
		}

		getBassName(hypo: Hypothesis, sharpOrFlat: string = 'flat'): string {
			var bass = this.offset[hypo.inv]
			var bassName: string = CxChord.rootNoteNames[sharpOrFlat][bass]
			return bassName
		}


		getRootName(hypo: Hypothesis, sharpOrFlat: string = 'flat'): string {
			var _offset = (this.offset[0] + hypo.root) % 12
			// var octave  = Math.floor( ( this.offset[hypo.inv] + hypo.root )  / 12 )	
			var root = _offset < 0 ? _offset + 12 : _offset
			var rootName: string = CxChord.rootNoteNames[sharpOrFlat][root]
			return rootName
		}

        getInversion(inv: number) {
			return _.isUndefined(this.chordInv[inv]) ? [] : this.chordInv[inv]
        }

		validate(notes: number[]) {
			if (notes.length == 0) {
				throw Error("No notes in notes array")
			}
			for (var i = 0; i < notes.length; i++) {
				if (notes[i] < 0 || notes[i] > 127) {
					throw Error("Illegal midi note value:" + notes[i])
				}
			}
		}

		normalize(notes: number[]): number[] {
			var target: number[] = []
			try {
				var offset = notes[0]
				for (var i = 0; i < notes.length; i++) {
					var note = notes[i] - offset
					while (note > 21) note -= 12
					// if ( note == 16 || note == 19 ) {
					// 	note -= 12
					// }
					target[i] = note
				}
			}
			catch (e) {
				throw Error(e)
			}
			return target
		}

		invert(notes: number[]): number[][] {
			if (notes.length < 2) throw Error("Cannot invert less than 2 notes")
			var target: number[][] = []
			target[0] = this.normalizeChord ? this.normalize(notes) : notes;
			this.offset[0] = notes[0]
			for (var d = 1; d < notes.length; d++) {
				var currNotes = _.drop(target[d - 1])
                var invNote = _.head(target[d - 1])
				invNote += 12
				currNotes.push(invNote)
				target[d] = this.normalizeChord ? this.normalize(currNotes) : currNotes
			}
			if (target.length < notes.length) throw Error("Bad invertion")
			return target;
		}
	}
}