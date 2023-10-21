import { BayesChordCalculator } from "./CxBayes";
import { ChordInstance } from "./CxChordInst";
import { ChordForms, conflicts, extensions, getExtName, getKnockouts, getNoteNumber, isNoRootChord, knockouts, mustHave } from "./CxForms";
import { Rules } from "./CxRules";
import { Posterior, ChordMapEntry, Hypothesis, ChordMatchIntf, Rule   } from "./Interfaces";
import * as _ from "lodash"

export class ChordMatch implements ChordMatchIntf {

    inv: number
    type: string
    notes: number[] = []
    chord: string
    bass: string
    root: string
    list: string

    constructor(public hypo: Hypothesis, chordEntry: ChordInstance, _mapEntry: ChordMapEntry, sharpOrFlat: string = 'flat') {
        this.inv = hypo.inv
        this.type = hypo.key
        for (let i = 0; i < chordEntry.chordInv[0].length; i++) {
            const note = chordEntry.chordInv[0][i] + chordEntry.offset[0]
            this.notes.push(note)
        }
        this.bass = chordEntry.getBassName(hypo, sharpOrFlat)
        this.root = chordEntry.getRootName(hypo, sharpOrFlat)           
        this.list  = this.root + "," + this.hypo.key
        if ( this.bass !== this.root ) {
            this.list += ",/" +  this.bass
        }
        this.chord = getExtName(this.list);
    }
}

export class ChordMatcher extends ChordForms {

    chord: ChordInstance | null = null
    bayes: BayesChordCalculator | null = null
    rules: Rules | null = null
    favorJazzChords = false
    priorChords: ChordInstance[] = []

    constructor(public debugKey: string = "Maj") {
        super()
    }

    getMatches(sharpOrFlat = 'flat'): ChordMatch[] { //TODO: Implement sharpOrFlat
        const post = this.bayes!.getPosterior()
        const res: ChordMatch[] = []
        for (let i = 0; i < post.length; i++)
            if (i == 0 || post[i].post == post[i - 1].post) {
                const chordEntry = this.chord!
                const chordMapEntry = this.chordMapWithInv[post[i].hypo!.key][post[i].hypo!.inv]
                const entry = new ChordMatch(post[i].hypo!, chordEntry, chordMapEntry, sharpOrFlat)
                res.push(entry)
            }
            else { break }

        return res
    }

    getMatch(idx = 0, sharpOrFlat = 'flat'): ChordMatch {
        const res: ChordMatch[] = this.getMatches(sharpOrFlat)
        if ( idx < 0 || idx >= res.length ) 
            throw Error("getMatch index: " + idx + " is out of range")
        else 
            return res[idx]
    }

    getPosterior(): Posterior[] { return this.bayes!.getPosterior() }

    getChord() { return this.chord }

    favorJazz(favor = true) {
        this.favorJazzChords = favor
        if ( this.chord !== null ) {
            this.chord!.favorJazzChords = favor
        }
    }

    addRootOffset(_arr: number[] = [], root: number, _addOctave = true): number[] {
        let arr: number[] = []
        if (root == 0) {
            arr = _arr
        }
        else {
            for (let i = 0; i < _arr.length; i++) {
                let note = _arr[i] + root % 12
                note = note < 0 ? note + 12 : note
                arr.push(note)
            }
        }
        return _.sortedUniq(arr)
    }

    addToArray(_arr: number[], value: number): number[] {
        const arr: number[] = []
        for (let i = 0; i < _arr.length; i++) {
            arr.push(_arr[i] + value)
        }
        return arr
    }

    doMatch(chord: ChordInstance, _limit = chord.chordInv[0].length): ChordInstance {
        // deno-lint-ignore no-this-alias
        const self = this
        let idx = 0;
        _.forIn(this.chordMapWithInv, function (hypothesis: ChordMapEntry[], key: string) {
            idx++
            for (let inv = 0; inv < hypothesis.length; inv++) {
                idx += inv
                if (!_.has(chord.matchedNotes, key)) {
                    chord.matchedNotes[key] = {
                        invertions: [],
                        extensions: [],
                        knockouts: [],
                        mustHave: [],
                        rootNotes: [],
                        conflicts: [],
                        roots: [],
                        group: hypothesis[inv].group
                    }
                }
                // Save the root note for the inversion
                chord.matchedNotes[key].rootNotes.push(hypothesis[inv].root)
                //
                // Check for matching notes
                // 
                const intersection = _.intersection(chord.chordInv[0], hypothesis[inv].notes)

                if (!_.isArray(intersection)) throw Error('inversion Intersection is not an array')
                chord.matchedNotes[key].invertions.push(intersection)
                // if ( chord.chordInv[0].length == intersection.length  ) this.fullMatches = true             
                //
                // The following checks should also check against the the root of no-root chords
                //        
                let _hypoToMatch: number[] = []
                let chordToMatch: number[] = []
                const invRoot = (hypothesis[inv].root < 0 ? 12 + hypothesis[inv].root : hypothesis[inv].root) % 12

                if (isNoRootChord(key) && hypothesis[inv].root < 0) {
                    const tmpArr: number[] = []
                    tmpArr.push(invRoot)
                    _hypoToMatch = tmpArr.concat(hypothesis[inv].notes).sort()
                    chordToMatch = chord.addRootOffset(chord.chordInv[0], hypothesis[inv].root)
                }
                else {
                    _hypoToMatch = hypothesis[inv].notes
                    chordToMatch = chord.chordInv[0]
                }
                //
                // Check for the root notes
                // For chord without the root it should not be present
                // For chord with roots it should score higher if present 
                //
                const indexOfRoot = chordToMatch.indexOf(invRoot) >= 0 ? chordToMatch.indexOf(invRoot) : chordToMatch.indexOf(invRoot + 12)
                chord.matchedNotes[key].roots.push(indexOfRoot)
                // 
                // Check for must Have notes
                //
                let mustHaveTrans: number[]
                let mustHaveMatch: number[]
                if (!_.isUndefined(mustHave[key])) {
                    mustHaveTrans = self.addRootOffset(mustHave[key], hypothesis[inv].root, false)
                    mustHaveMatch = _.intersection(chordToMatch, mustHaveTrans)
                    chord.matchedNotes[key].mustHave.push(mustHaveMatch.length - mustHaveTrans.length)
                }
                else chord.matchedNotes[key].mustHave.push(0)
                //
                // Now check the extensions
                // 
                const extensionNotes = extensions[key]
                const remainingNotes = _.difference(chord.chordInv[0], intersection)
                const extensionMatch = _.intersection(remainingNotes, extensionNotes)
                chord.matchedNotes[key].extensions.push(extensionMatch)
                //
                // Now check the knockouts
                // 
                let knockoutTrans: number[]
                let knockoutMatch: number[]
                const KOs = getKnockouts(key)

                if (KOs.length > 0) {
                    knockoutTrans = self.addRootOffset(knockouts[key], hypothesis[inv].root)
                    knockoutMatch = _.intersection(chord.chordInv[0], knockoutTrans)
                }
                chord.matchedNotes[key].knockouts.push( knockoutMatch! ?? [])
                // 
                // Check for Conflicting notes
                //
                let conflictCount = 0
                let conflictTrans: number[]
                if (!_.isUndefined(conflicts[key])) {
                    for (let i = 0; i < conflicts[key].length; i++) {
                        conflictTrans = self.addRootOffset(conflicts[key][i], hypothesis[inv].root)
                        let conflictMatch = _.intersection(chordToMatch, conflictTrans)
                        if (conflictMatch.length == conflictTrans.length) { conflictCount += 1 }
                        // Check in 2 octaves
                        conflictTrans = self.addToArray(conflictTrans, 12)
                        conflictMatch = _.intersection(chord.chordInv[0], conflictTrans)
                        if (conflictMatch.length == conflictTrans.length) { conflictCount += 1 }
                    }
                }
                chord.matchedNotes[key].conflicts.push(conflictCount)
            }
        })
        return chord;
    }

    //
    // Tone number and name support
    //
    match(midiChord: number[] | string[]): ChordInstance {
        if (_.isUndefined(midiChord) || _.isEmpty(midiChord)) throw "match: supplied Chord is empty";
    
        if (_.isNumber(midiChord[0])) 
            return this.matchNotes(midiChord as number[])
        // else
        return this.matchNoteNames(midiChord as string[])

    }

    matchNoteNames(midiNames: string[]): ChordInstance {
        const midiChord: number[] = []
        for (let i = 0; i < midiNames.length; i++)
            try {
                const noteNo = getNoteNumber(midiNames[i])
                midiChord.push(noteNo)
            }
            catch (e) {
                throw e
            }
        return this.matchNotes(midiChord)
    }

    matchNotes(midiChord: number[]): ChordInstance { 
        this.bayes = new BayesChordCalculator(this.chordMapWithInv)
        this.chord = new ChordInstance(midiChord)
        this.chord.favorJazzChords = this.favorJazzChords
        //
        // TODO: Application of rules should be configurable or even dynamic for best matching capabilities
        //
        // Do chord tone matches 
        //     
        this.doMatch(this.chord)
        this.rules = new Rules(this.chord, this.debugKey)!
        //
        // Apply the Bayes Rules
        // 
        // Even distribution
        //
        const ruleE: Rule = this.rules.get('EvenDistribution')
        this.bayes.applyRule(ruleE)
        //
        // Count Notes Rule  
        //
        // var ruleN: Rule = this.rules.get('CountNotes')  
        // this.bayes.applyRule(ruleN)
        //
        // Knockout Rule  
        //
        var ruleK: Rule = this.rules.get('Knockouts')
        this.bayes.applyRule(ruleK)
        //
        // Matched Notes rule
        // 
        var ruleM: Rule = this.rules.get('MatchedNotes')
        this.bayes.applyRule(ruleM)
        //
        // MustHave Notes rule
        //  
        var ruleH: Rule = this.rules.get('MustHave')
        this.bayes.applyRule(ruleH)
        //
        // Favor Jazz Chords
        // 
        // if ( this.favorJazzChords ) { 
        //      var ruleJ: Rule = this.rules.get('FavorJazz') 
        //      this.bayes.applyRule(ruleJ)
        // }
        //
        // Conflict Notes rule
        //  
        // var ruleX: Rule = this.rules.get('Conflicts') 
        // this.bayes.applyRule(ruleX)
        //
        // Root is present Rule  
        //
        var ruleR: Rule = this.rules.get('RootFound')
        this.bayes.applyRule(ruleR)
        //
        // Group Rule  
        //
        // var ruleG: Rule = this.rules.get('ChordGroup')
        // this.bayes.applyRule(ruleG)          

        // this.priorChords.push(this.chord) 
        //
        return this.chord;
    }

}
