# CxChord - TESTING THE DISTRIBUTION Do NOT USE JUST YET
## Midi chord recognizer ##

Recognizes Chords from an array of midi notes and uses a Bayes probalistic method to find the most likely matches.
-------------

Do not use this package just yet 


Installation
-------------

    $ npm install CxChord
    $ cd CxChord
    $ npm install


Usage JavaScript
----------------
```javascript
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
```

With a Favor Jazz (rootless block chords option):

```javascript
console.log("-------------------");
console.log("First match a normal Major Chord:");
var midiChord = [ 63, 67, 69, 74] 
var cm =  new CxChord.ChordMatcher()
cm.match(midiChord)
mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )

console.log("-------------------");
console.log("Then the same notes, but this time favor a Jazz block chord interpretation:");
cm.favorJazz(true)
cm.match(midiChord)
mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )
```

Usage TypeScript
----------------
```javascript
///<reference types="../node_modules/@types/node" />
///<reference types="../node_modules/@types/lodash" />
///<reference types="../node_modules/@types/chartjs" />
///<reference types="../lib/CxChord" />

import * as _ from "lodash"
var  CxChord = require("../lib/CxChord.js")

console.log("-------------------");
var midiChord = [64, 67, 71, 72, 74, 78, 81 ];
var cm =  new CxChord.ChordMatcher()
cm.match(midiChord)
var mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )
```

See the examples directory for more examples or ./test/spec/CxChordSpec.ts for more details.

Run the test cases
------------------

In your browser, open the specRunnerJS.html page: "file:///<your own full path>/CxChord/test/specRunnerJS.html"
