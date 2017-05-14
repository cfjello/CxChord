# CxChord
## Midi chord recognizer ##

Recognizes Chords from an array of midi notes and uses a Bayes probalistic method to find the most likely matches.

Installation
-------------

    $ npm install cxchord

Usage JavaScript:
----------------
```javascript
//
// Lookup Chords for midi notes
// 
var CxChord = require('cxchord');

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
```
See also the examples directory of the package under node_modules or the test specification under ./test/spec/CxChordSpec.ts for more details.