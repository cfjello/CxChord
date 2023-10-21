const CxChord = require('../lib/CxChord');
var midiChord = [64, 67, 71, 72, 74, 78, 81];
var cm =   new CxChord.ChordMatcher();
cm.match(midiChord);
p0 = cm.bayes.getBestPosterior();
cm.bayes.visualizeTopX("Match", cm.getChord(), 15);