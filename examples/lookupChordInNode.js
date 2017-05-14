
//
// Lookup Chords for midi notes
// 
var CxChord = require('../lib/CxChord.js');

console.log("-------------------");
var midiChord = [64, 67, 71, 72, 74, 78, 81 ];
var cm =  new CxChord.ChordMatcher()
cm.match(midiChord)
var mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )

console.log("-------------------");
midiChord = [60, 64, 67, 69,74]
cm.match(midiChord)
mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )

console.log("-------------------");
midiChord = [60, 62, 67]
cm.match(midiChord)
mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )

console.log("-------------------");
midiChord = [60, 63, 67, 70]
cm.match(midiChord)
mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )

console.log("-------------------");
          
midiChord = [60, 63, 67, 69]
cm.match(midiChord)
mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )

console.log("-------------------"); 
          
midiChord = [60, 63, 67, 69, 74]
cm.match(midiChord)
mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )

console.log("-------------------");
console.log("As Major Chords:");
var midiChord = [ 63, 67, 69, 74] 
cm.match(midiChord)
mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )

console.log("-------------------");
console.log("Same as favor Jazz block Chord:");
cm.favorJazz(true)
cm.match(midiChord)
mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )

console.log("-------------------");
console.log("Favor Jazz block Chord:");
midiChord = [ 60, 64, 65, 69]
cm.favorJazz(true)
cm.match(midiChord)
mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )
