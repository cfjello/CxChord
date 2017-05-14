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
