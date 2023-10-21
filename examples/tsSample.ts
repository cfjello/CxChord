import * as CxChord from "../lib/CxChord"

console.log("-------------------");
var midiChord = [64, 67, 71, 72, 74, 78, 81 ];
var cm =  new CxChord.ChordMatcher()
cm.match(midiChord)
var mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )