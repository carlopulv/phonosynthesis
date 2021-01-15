/**
 * @class Represent the object "Chord"
 * @param {Integer} tonal Tonal note of the chord, the number represent the distance from the key selected by the user. 
 * @param {Integer} mode Represent the mode of the chord. It is a number between 1 and 7.
 * @param {Integer} other Gives information for augmented, diminished, suspended chords and also added note. This field is equal to: "2" add2, "4" sus4, "5" aum5, "7" diminished in case the chord is locrian or 7maj in case of minor chords, "9" add9.
 */
class Chord{
    constructor(tonal, mode, other){
        this.tonal = tonal;
        this.mode = mode;
        this.other = other;
    }  

    equals(chord){
        if(this.tonal==chord.tonal&&this.mode==chord.mode&&this.other==chord.other) return true;
        return false;
    }
}
