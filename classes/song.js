/**
* This class represent a song with all the necessary parameters to be represented in the game
* @param {Chord[]} chordsPlayed array of chords
* @param {String[]} chordDistances array of distances
* @param {Integer[]} maxmode the maximum mode for each tonal
* @param {Integer} maxtonal the maximum tonal
* @param {String} generalKey the general key of the song
* @param {String[]} listnotes array of chords in frequency
*/
class Song{
    constructor(dataChord,dataDistances,dataMaxmode,dataMaxtonal,dataGeneralKey,dataListnotes){
        this.chordsPlayed=stringToChords(dataChord);;
        this.chordDistances=stringToDistances(dataDistances);
        this.maxmode=int(dataMaxmode);
        this.maxtonal=int(dataMaxtonal);
        this.generalKey=dataGeneralKey;
        this.listnotes=stringToListnotes(dataListnotes);    
    }
}