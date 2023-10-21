const CxChord = require('../lib/CxChord');

console.log("-------------------");
var midiChord = [64, 67, 71, 72, 74, 78, 81 ];
var cm =  new CxChord.ChordMatcher()
cm.match(midiChord)
var mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") );

console.log("-------------------");
console.log("First match a normal Major Chord:");
var midiChord = [ 63, 67, 69, 74];
var cm =  new CxChord.ChordMatcher();
cm.match(midiChord);
mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") );

console.log("-------------------");
console.log("Then the same notes, but this time favor a Jazz block chord interpretation:");
cm.favorJazz(true);
cm.match(midiChord);
mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") );