/// <reference path="CxBayes.ts" />
/// <reference path="CxForms.ts" />

namespace CxChord {  
    
    export interface ChordMapEntry {
        notes: number[]
        root:  number
        inv:   number
        group: number
        count?: number
        probability?: number
    }
    
    export interface MatchedNotes { 
        [key:string] : { 
            invertions: any[] 
            extensions: any[] 
            knockouts:  any[] 
            mustHave:   any[] 
            rootNotes:  any[]
            conflicts:  any[]
            roots:      number[]
            group:      number 
        } 
    } 

    export interface ChordMap {
        [key:string]: ChordMapEntry   
    }   

    export interface ChordMapTable {
        [key:string]: ChordMapEntry[]   
    } 
    
    export interface Conflicts {
        [key:string]: any[][]
    }
    
    export interface RootNoteNames {
        [key:string]: string[]   
    } 
    
    export interface RuleFx {
        (  chord?: ChordInstance, bayes?: CxChord.BayesChordCalculator, row?: number, col?: number ) : number
    }

    export interface Rule {
            rule?:     string
            chord:     ChordInstance
            ruleFx:    RuleFx
    }

    export interface Hypothesis {
        idx:  number
        key:  string 
        inv:  number 
        len : number
        root: number
        group: number 
    }
    
    export interface ChordMatchIntf {
        hypo:  Hypothesis,
        chord: string
        root:  string
        type:  string
        bass:  string
        inv:   number
        notes: number[]
        list:  string
    }
            
    export interface Posterior {
        post: number,
        idx:  number,
        hypo?: Hypothesis
    }

    export interface ScaleMapEntry {
            notes: number[]
            major: number 
            minor: number 
            group: number
        }

    export interface ScaleMap {
        [key:string]: ScaleMapEntry   
    }   
}