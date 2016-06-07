/// <reference path="../../typings/jasmine/jasmine.d.ts"/>
/// <reference path="../../src/references.ts" />
// import jasmine = require("C:/Users/Claus/AppData/Roaming/npm/node_modules/lib/jasmine.js");
// jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));
describe('Testing CxChord', function () {
    var midiChord = [2, 6, 9, 13];
    var chordInst = new CxChord.ChordInstance(midiChord);
    it('ChordInst reads and inverts a chord', function () {
        expect(chordInst.chordInv.length).toEqual(4);
        expect(chordInst.chordInv[0][0]).toEqual(0);
        expect(chordInst.chordInv[0][1]).toEqual(4);
        expect(chordInst.chordInv[0][2]).toEqual(7);
        expect(chordInst.chordInv[0][3]).toEqual(11);
        //
        expect(chordInst.chordInv[1].length).toEqual(4);
        expect(chordInst.chordInv[1][0]).toEqual(0);
        expect(chordInst.chordInv[1][1]).toEqual(3);
        expect(chordInst.chordInv[1][2]).toEqual(7);
        expect(chordInst.chordInv[1][3]).toEqual(8);
        //
        expect(chordInst.chordInv[2].length).toEqual(4);
        expect(chordInst.chordInv[2][0]).toEqual(0);
        expect(chordInst.chordInv[2][1]).toEqual(4);
        expect(chordInst.chordInv[2][2]).toEqual(5);
        expect(chordInst.chordInv[2][3]).toEqual(9);
        midiChord = [60, 67, 74, 78, 81];
        chordInst = new CxChord.ChordInstance(midiChord);
        expect(chordInst.chordInv.length).toEqual(5);
        expect(chordInst.chordInv[0][0]).toEqual(0);
        expect(chordInst.chordInv[0][1]).toEqual(7);
        expect(chordInst.chordInv[0][2]).toEqual(14);
        expect(chordInst.chordInv[0][3]).toEqual(18);
        expect(chordInst.chordInv[0][4]).toEqual(21);
    });
    it('ChordMatcher.doMatch can do a full match', function () {
        midiChord = [60, 64, 67, 71];
        chordInst = new CxChord.ChordInstance(midiChord);
        expect(chordInst.chordInv.length).toEqual(4);
        expect(chordInst.chordInv[0][0]).toEqual(0);
        expect(chordInst.chordInv[0][1]).toEqual(4);
        expect(chordInst.chordInv[0][2]).toEqual(7);
        expect(chordInst.chordInv[0][3]).toEqual(11);
        var cm = new CxChord.ChordMatcher();
        var chordInst2 = cm.doMatch(chordInst);
        expect(chordInst2).toBeDefined();
        expect(chordInst2.matchedNotes).toBeDefined();
        expect(_.keys(chordInst2.matchedNotes).length > 0);
        _.forIn(chordInst2.matchedNotes, function (value, key) {
            if (key == "maj,7") {
                expect(value.invertions[0].length).toEqual(4);
            }
            else {
                expect(value.invertions[0].length > 0).toBeTruthy();
            }
        });
    });
    it('ChordMatcher.doMatch can do a full match', function () {
        midiChord = [60, 64, 67, 71];
        chordInst = new CxChord.ChordInstance(midiChord);
        expect(chordInst.chordInv.length).toEqual(4);
        expect(chordInst.chordInv[0][0]).toEqual(0);
        expect(chordInst.chordInv[0][1]).toEqual(4);
        expect(chordInst.chordInv[0][2]).toEqual(7);
        expect(chordInst.chordInv[0][3]).toEqual(11);
        var cm = new CxChord.ChordMatcher();
        var chordInst2 = cm.doMatch(chordInst);
        expect(chordInst2).toBeDefined();
        expect(chordInst2.matchedNotes).toBeDefined();
        expect(_.keys(chordInst2.matchedNotes).length > 0);
        _.forIn(chordInst2.matchedNotes, function (value, key) {
            if (key == "maj,7") {
                expect(value.invertions[0].length).toEqual(4);
            }
            else {
                expect(value.invertions[0].length > 0).toBeTruthy();
            }
        });
    });
    it('ChordMatcher.doMatch can do a partial match with chord extensions', function () {
        midiChord = [60, 67, 71, 74];
        chordInst = new CxChord.ChordInstance(midiChord);
        expect(chordInst.chordInv.length).toEqual(4);
        expect(chordInst.chordInv[0][0]).toEqual(0);
        expect(chordInst.chordInv[0][1]).toEqual(7);
        expect(chordInst.chordInv[0][2]).toEqual(11);
        expect(chordInst.chordInv[0][3]).toEqual(14);
        var cm = new CxChord.ChordMatcher();
        var chordInst2 = cm.doMatch(chordInst);
        expect(chordInst2).toBeDefined();
        _.forIn(chordInst2.matchedNotes, function (value, key) {
            // console.log("Partial Matched:" + key + "(" + value.invertions[0].length + ")")
            expect(value.invertions[0].length > 0 && value.invertions[0].length < 5).toBeTruthy();
            if (key == "maj,7") {
                expect(value.invertions[0].length).toEqual(3);
                expect(value.extensions[0].length).toEqual(1);
                expect(value.extensions[0][0]).toEqual(14);
            }
        });
    });
    it('ChordMatcher.doMatch can do multiple extensions', function () {
        midiChord = [60, 71, 74, 78, 81];
        chordInst = new CxChord.ChordInstance(midiChord);
        var cm = new CxChord.ChordMatcher();
        var chordInst2 = cm.doMatch(chordInst);
        expect(chordInst2).toBeDefined();
        _.forIn(chordInst2.matchedNotes, function (value, key) {
            if (key == "maj,7") {
                expect(value.invertions[0].length).toEqual(2);
                expect(value.extensions[0].length).toEqual(3);
                expect(value.extensions[0][0]).toEqual(14);
                expect(value.extensions[0][1]).toEqual(18);
                expect(value.extensions[0][2]).toEqual(21);
            }
        });
    });
    it('CxChord.getChordName can return correct names', function () {
        expect(CxChord.getChordName("Maj,7")).toEqual("CMaj7");
        expect(CxChord.getChordName("Maj,7,9,#11,13")).toEqual("CMaj79#1113");
        expect(CxChord.getChordName("Min,7,9,11,-1")).toEqual("CMin7911-no-root");
        expect(CxChord.getChordName("Maj,7,9,#11,13", 0, 7)).toEqual("CMaj79#1113/G");
        expect(CxChord.getChordName("Maj,7,9,#11,13", 0, -5)).toEqual("CMaj79#1113/G");
        // 
        expect(CxChord.getChordName("Maj,7", 2)).toEqual("DMaj7");
        expect(CxChord.getChordName("Maj,7,9,#11,13", 2)).toEqual("DMaj79#1113");
        expect(CxChord.getChordName("Min,7,9,11,-1", 2)).toEqual("DMin7911-no-root");
        expect(CxChord.getChordName("Maj,7,9,#11,13", 2, 9)).toEqual("DMaj79#1113/A");
        expect(CxChord.getChordName("Maj,7,9,#11,13", 2, -3)).toEqual("DMaj79#1113/A");
        // 
        expect(CxChord.getChordName("Maj,7", -1)).toEqual("BMaj7");
        expect(CxChord.getChordName("Maj,7,9,#11,13", -1)).toEqual("BMaj79#1113");
        expect(CxChord.getChordName("Min,7,9,11,-1", -1)).toEqual("BMin7911-no-root");
        expect(CxChord.getChordName("Maj,7,9,#11,13", -1, 6)).toEqual("BMaj79#1113/Gb");
        expect(CxChord.getChordName("Maj,7,9,#11,13", -1, -6)).toEqual("BMaj79#1113/Gb");
        // 
        expect(CxChord.getChordName("Maj,7", -13)).toEqual("BMaj7");
        expect(CxChord.getChordName("Maj,7,9,#11,13", -13)).toEqual("BMaj79#1113");
        expect(CxChord.getChordName("Min,7,9,11,-1", -13)).toEqual("BMin7911-no-root");
        expect(CxChord.getChordName("Maj,7,9,#11,13", -13, 6)).toEqual("BMaj79#1113/Gb");
        expect(CxChord.getChordName("Maj,7,9,#11,13", -13, -6)).toEqual("BMaj79#1113/Gb");
        expect(CxChord.getChordName("Maj,7", -2, 0, "sharp")).toEqual("A#Maj7");
        expect(CxChord.getChordName("Maj,7,9,#11,13", -2, 0, "flat")).toEqual("BbMaj79#1113");
        expect(CxChord.getChordName("Min,7,9,11,-1", -2, 0, "sharp")).toEqual("A#Min7911-no-root");
        expect(CxChord.getChordName("Maj,7,9,#11,13", -1, 6, "sharp")).toEqual("BMaj79#1113/F#");
        expect(CxChord.getChordName("Maj,7,9,#11,13", -2, -7, "flat")).toEqual("BbMaj79#1113/F");
    });
    it('ChordMatcher moves a root correctly', function () {
        var cm = new CxChord.ChordMatcher(); // [0, 4, 5, 9]
        var inv0 = cm.chordMapWithInv["Min,7,9,-1(B)"][0];
        expect(inv0.root).toEqual(-10);
        // var root = cm.addRootOffset()
        var inv1 = cm.chordMapWithInv["Min,7,9,-1(B)"][1];
        expect(inv1.inv).toEqual(1);
        expect(inv1.root).toEqual(-2);
        var inv2 = cm.chordMapWithInv["Min,7,9,-1(B)"][2];
        expect(inv2.inv).toEqual(2);
        expect(inv2.root).toEqual(-3);
        var inv2 = cm.chordMapWithInv["Min,7,9,-1(B)"][3];
        expect(inv2.inv).toEqual(3);
        expect(inv2.root).toEqual(-7);
    });
    it('ChordMatcher moves a negative root correctly', function () {
        // midiChord = [60, 64, 67, 70 ]
        var cm = new CxChord.ChordMatcher(); // [0, 4, 5, 9]
        var inv0 = cm.chordMapWithInv["Maj,6,9,-1(A)"][0];
        expect(inv0.inv).toEqual(0);
        expect(inv0.root).toEqual(-4);
        var newChord = cm.addRootOffset(inv0.notes, inv0.root);
        var inv1 = cm.chordMapWithInv["Min,7,9,-1(B)"][1];
        expect(inv1.inv).toEqual(1);
        expect(inv1.root).toEqual(-2);
        /*
var inv2 = cm.chordMapWithInv["MinCluster,7,9,-1"][2]
expect(inv2.inv).toEqual(2)
expect(inv2.root).toEqual(-3)
var inv2 = cm.chordMapWithInv["MinCluster,7,9,-1"][3]
expect(inv2.inv).toEqual(3)
expect(inv2.root).toEqual(-7)
*/
    });
    it('ChordMatcher can match a C chord', function () {
        midiChord = [60, 64, 67];
        // var chord : CxChord.ChordInstance = new CxChord.ChordInstance(midiChord)        
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var psr = cm.getPosterior();
        expect(psr).toBeDefined();
        expect(psr.length).toBeGreaterThan(0);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Maj');
    });
    it('ChordMatcher can match full major chords', function () {
        var midiChord = [60, 64, 67, 71, 74, 78, 81];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        // console.log( JSON.stringify( cm.bayes.getTopTeen(), null, 2 ) )
        expect(CxChord.getExtName(p0.hypo.key)).toEqual('Maj79#1113');
        midiChord = [60, 64, 67, 71, 74, 78];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(CxChord.getExtName(p0.hypo.key)).toEqual('Maj79#11');
        midiChord = [60, 64, 67, 71, 74];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(CxChord.getExtName(p0.hypo.key)).toEqual('Maj79');
        midiChord = [60, 64, 67, 69, 74];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(CxChord.getExtName(p0.hypo.key)).toEqual('Maj69');
        midiChord = [60, 64, 67, 69];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        // expect(CxChord.getExtName(p0.hypo.key)).toEqual('Maj6') // TODO - should be Maj6
    });
    it('ChordMatcher can match partial major chords', function () {
        var midiChord = [60, 64, 71, 74, 78, 81];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(CxChord.getExtName(p0.hypo.key)).toEqual('Maj79#1113');
        midiChord = [60, 64, 71, 74, 78];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(CxChord.getExtName(p0.hypo.key)).toEqual('Maj79#11');
        midiChord = [60, 64, 71, 74];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(CxChord.getExtName(p0.hypo.key)).toEqual('Maj79');
        midiChord = [60, 64, 69, 74];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(CxChord.getExtName(p0.hypo.key)).toEqual('Maj69');
        midiChord = [60, 64, 69];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        // expect(CxChord.getExtName(p0.hypo.key)).toEqual('Maj6') // TODO - should be Maj6 in the right context
        // console.log( JSON.stringify( cm.bayes.getTopTeen(2), null, 2 ) )
    });
    it('ChordMatcher can match inverted major chords', function () {
        var midiChord = [64, 67, 71, 72, 74, 78, 81];
        var cm = new CxChord.ChordMatcher();
        var chord = cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(CxChord.getExtName(p0.hypo.key)).toEqual('Maj79#1113');
        midiChord = [67, 71, 72, 74, 76, 78, 81];
        cm = new CxChord.ChordMatcher();
        chord = cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        // var res: CxChord.Posterior[] = cm.bayes.getTopX()
        expect(CxChord.getExtName(p0.hypo.key)).toEqual('Maj79#1113');
        var midiChord = [67, 71, 72, 74, 76, 78, 81];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Maj,7,9,#11,13');
        // console.log( JSON.stringify( cm.bayes.getTopTeen(), null, 2 ) )
        midiChord = [60, 64, 67, 71, 74, 78];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Maj,7,9,#11');
        midiChord = [60, 64, 67, 71, 74];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Maj,7,9');
        midiChord = [60, 64, 67, 69, 74];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Maj,6,9');
        midiChord = [60, 64, 67, 69];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Maj,6');
    });
    it('Standard  Deriviation Works', function () {
        var cm = new CxChord.ChordMatcher();
        // var chord = cm.match(midiChord)
        // var p0 = cm.bayes.getBestMatch()
        var stdDev = cm.bayes.standardDeriviation([1, 2, 3, 4, 5, 6, 7, 8, 9, 25]); // Standard Deviation: 6.48074069840786
        expect(stdDev).toEqual(6.48074069840786);
    });
    it('ChordMatcher can match Minor chords', function () {
        midiChord = [60, 63, 67];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Min');
        midiChord = [60, 63, 67, 70];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Min,7');
        // cm.bayes.visualizeTopX("Match -> Min,7", cm.getChord(),  20)
        midiChord = [60, 63, 67, 69];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Min,6');
        midiChord = [60, 63, 67, 69, 74];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Min,6,9');
    });
    it('ChordMatcher can match a Dominant Chords chord', function () {
        midiChord = [60, 64, 67, 70];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7');
        midiChord = [64, 67, 70, 72];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7');
        midiChord = [67, 70, 72, 76];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7');
        midiChord = [60, 64, 67, 70, 74];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7,9');
        midiChord = [64, 67, 70, 72, 74];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7,9');
        midiChord = [67, 70, 72, 74, 76];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7,9');
        // cm.bayes.visualizeTopX("Match", cm.getChord(),  20)
    });
    it('ChordMatcher can match no fifth Dominant Chords chord', function () {
        midiChord = [60, 64, 70];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7');
        midiChord = [64, 70, 72];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7');
        midiChord = [70, 72, 76];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7');
        midiChord = [60, 64, 70, 74];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7,9');
        midiChord = [64, 70, 72, 74];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7,9');
        midiChord = [70, 72, 74, 76];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7,9');
    });
    it('ChordMatcher can match sus chords', function () {
        midiChord = [60, 65, 67];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Sus4');
        midiChord = [60, 62, 67];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Sus2');
        midiChord = [60, 65, 67, 71];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Sus4');
        midiChord = [60, 62, 67, 71];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Sus2');
        midiChord = [60, 65, 70];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Sus2');
        midiChord = [67, 72, 74];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Sus4');
        midiChord = [60, 65, 67, 70];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7,sus4');
        midiChord = [60, 62, 67, 70];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dom,7,sus2');
    });
    it('ChordMatcher can match diminished chords', function () {
        midiChord = [60, 63, 66];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dim');
        midiChord = [60, 63, 66, 69];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dim,7');
        midiChord = [60, 63, 66, 69, 71];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('Dim,7(WH)');
    });
    it('ChordMatcher can match a C5 chord', function () {
        midiChord = [60, 67];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('5');
        midiChord = [55, 60, 67];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('5');
        midiChord = [55, 60, 67, 72];
        var cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual('5');
    });
    it('ChordMatcher can match a few jazz block chords', function () {
        midiChord = [64, 67, 69, 74]; // Cmaj,7,9,-1
        var cm = new CxChord.ChordMatcher();
        cm.favorJazz(true);
        cm.match(midiChord);
        var p0 = cm.bayes.getBestMatch();
        // cm.bayes.visualizeTopX("Match", cm.getChord(),  20)
        expect(p0.hypo.key).toEqual("Maj,6,9,-1(A)");
        midiChord = [67, 69, 74, 76];
        cm = new CxChord.ChordMatcher();
        cm.favorJazz(true);
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual("Maj,6,9,-1(A)");
        midiChord = [63, 67, 69, 74];
        cm = new CxChord.ChordMatcher();
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        expect(p0.hypo.key).toEqual("Min,6,9,-1(A)");
        midiChord = [17, 21, 23, 28];
        cm = new CxChord.ChordMatcher();
        cm.favorJazz(true);
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        cm.bayes.visualizeTopX("Match", cm.getChord(), 15);
        // cm.bayes.visualizeForm('Dom,7,9,-1(A)', cm.getChord())
        expect(p0.hypo.key).toEqual('Dom,7,9,-1(A)');
        midiChord = [21, 23, 28, 29];
        cm = new CxChord.ChordMatcher();
        cm.favorJazz(true);
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        cm.bayes.visualizeTopX("Match", cm.getChord(), 15);
        // cm.bayes.visualizeForm('Dom,7,9,-1(A)', cm.getChord())
        expect(p0.hypo.key).toEqual('Dom,7,9,-1(A)');
        midiChord = [23, 28, 29, 33];
        cm = new CxChord.ChordMatcher();
        cm.favorJazz(true);
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        // cm.bayes.visualizeTopX("Match", cm.getChord(),  15)
        // cm.bayes.visualizeForm('Dom,7,9,-1(A)', cm.getChord())
        expect(p0.hypo.key).toEqual('Dom,7,9,-1(B)');
        midiChord = [28, 29, 33, 35];
        cm = new CxChord.ChordMatcher();
        cm.favorJazz(true);
        cm.match(midiChord);
        p0 = cm.bayes.getBestMatch();
        cm.bayes.visualizeTopX("Match", cm.getChord(), 15);
        // cm.bayes.visualizeForm('Dom,7,9,-1(A)', cm.getChord())
        expect(p0.hypo.key).toEqual('Dom,7,9,-1(B)');
    });
});
//# sourceMappingURL=CxChordSpec.js.map