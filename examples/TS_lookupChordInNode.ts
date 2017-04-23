///<reference path="../node_modules/@types/node/index.d.ts" />
///<reference path="../typings/lodash/lodash.d.ts" />
///<reference path="../typings/chartjs/chart.d.ts" />
///<reference path="../lib/CxChord.d.ts" />

import * as _ from "lodash"
var  CxChord = require("../lib/CxChord.js")

console.log("-------------------");
var midiChord = [64, 67, 71, 72, 74, 78, 81 ];
var cm =  new CxChord.ChordMatcher()
cm.match(midiChord)
var mached = cm.getMatch();
console.log( JSON.stringify(mached, null, " ") )
