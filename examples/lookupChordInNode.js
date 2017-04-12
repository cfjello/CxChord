
//
// Lookup Chords for midi notes
// 
var CxChord = require('../lib/CxChord.js');

console.log("Lookup Chord for Midi notes: [64, 67, 71, 72, 74, 78, 81 ]");
var midiChord = [64, 67, 71, 72, 74, 78, 81 ];
var chordMatcher =  new CxChord.ChordMatcher()
chordMatcher.match(midiChord)
var p0 = chordMatcher.bayes.getBestPosterior()
console.log("Chord:" + p0.hypo.key + "; Short Name:" + CxChord.getExtName(p0.hypo.key));

console.log("-------------------");
console.log("Lookup Chord for Midi notes: [60, 65, 67]");
midiChord = [60, 65, 67]
chordMatcher.match(midiChord)
var p0 = chordMatcher.bayes.getBestPosterior()
console.log("Chord:" + p0.hypo.key+ "; Short Name:" + CxChord.getExtName(p0.hypo.key));  

/*
midiChord = [60, 62, 67]
var cm =   new CxChord.ChordMatcher()
cm.match(midiChord)
var p0 = cm.bayes.getBestPosterior()
expect(p0.hypo.key).toEqual('Sus2')
*/