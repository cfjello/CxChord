/// <reference path="references.d.ts" />
declare namespace CxChord {
    enum Scale_Type {
        major = 1,
        minor = 2,
        altered = 4,
        dominant = 8,
        dimished = 16,
        wholeTone = 32,
    }
    const scaleMap: ScaleMap;
    enum Chord_Type {
        major = 0,
        majorb5 = 1,
        majorAug = 2,
        minor = 3,
        minorb5 = 4,
        dominant = 5,
        dominantAlt = 6,
        dimished = 7,
        halfDiminished = 8,
    }
}
