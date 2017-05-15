# CxChord
## Midi chord recognizer ##

Recognizes Chords from an array of midi notes and uses a Bayes probalistic method to find the most likely matches.

[An explaination of Midi Note Numbers can be seen here.](http://www.electronics.dit.ie/staff/tscarff/Music_technology/midi/midi_note_numbers_for_octaves.htm)

Installation
-------------

    $ npm install cxchord

Usage JavaScript (sample.js):
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
Execute the script at the command prompt:
```javascript
$ node sample.js
```

Usage TypeScript (TsSample.ts):
----------------
```javascript
import * as CxChord from "CxChord"

console.log("-------------------");
var midiChord = [64, 67, 71, 72, 74, 78, 81 ];
var cm =  new CxChord.ChordMatcher()
cm.match(midiChord)
var mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )
```
Compile and execute the script at the command prompt:
```javascript
$ tsc TsSample.ts
$ node TsSample.js
```

Usage HTML (sample.html):
----------------
```javascript
<!doctype html>
<html>
  <head>
    <title>CxChord HTML Example</title>
  </head>
  <body>
    <script type="text/javascript"   src="./node_modules/cxchord/lib/Chart.min.js"></script>
    <script type="text/javascript"   src="./node_modules/lodash/lodash.js"></script>
    <script type="text/javascript"   src="./node_modules/cxchord/lib/CxChord.js"></script>
    <script type="text/javascript">
        window.onload = function() {
            midiChord = [64, 67, 71, 72, 74, 78, 81];
            cm =   new CxChord.ChordMatcher();
            cm.match(midiChord);
            p0 = cm.bayes.getBestPosterior();
            cm.bayes.visualizeTopX("Match", cm.getChord(), 15);
        }
    </script>
    <h2> Math midi notes 64, 67, 71, 72, 74, 78, 81  ( E, G, B, C, D, F#, A ) </h2>
    <blockquote>
        Identifies a Cmaj type chord in first inversion (here displaying the first 15 chord-posibilities ranked): 
        <table>
            <tr>
                <td >
                    <canvas id="visualization"  height="400"  width="1300" ></canvas>
                </td>
                <td>
                    <div id="legend"></div>
                </td>
             </tr>
         </table>
    </blockquote>
   </body>
</html>
```
Open the html file in your browser.

For more details see the test specification under node_modules/cxchord/test/spec/CxChordSpec.ts for more details.