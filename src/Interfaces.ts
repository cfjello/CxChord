/// <reference path="CxBayes.ts" />
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
        (  chord?: ChordInstance, bayes?: CxChord.BayesCalculator, row?: number, col?: number ) : number
    }

    export interface Rule {
            rule?:      string
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
        chord: string
        root:  string
        type:  string
        bass:  string
        inv:   number
        group: number
        notes: number[]
    }
            
    export interface Posterior {
        post: number,
        idx:  number,
        hypo?: Hypothesis
    }

/*
    //
    // A lodash mixin function - not good with type checking
    //         
    export function addNum (_arr: number [], _val: number) {
            var arr = []
            for ( var _i = 0 ; _i < _arr.length; _i++ ) {
                arr.push(_arr[_i] + _val )
            }
            return arr;
        }
        _.mixin( {'addNum': CxChord.addNum })
  */
}