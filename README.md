<p align="center">
  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/titleGif.gif" width="100%"//>
</p>
<!-- <h1 align="center"> PHONOSYNTHESIS </h1> -->

<h1 align="center">
<a href="https://carlopulv.github.io/phonosynthesis" align="center"> OPEN PHONOSYNTHESIS</a>
</h1>

## Concept
Phonosynthesis was born from the curious juxtaposition of music and plants. We followed the concept of making music for plants, as some artists have made, for example Mort Garson's Mother Earth’s Plantasia, where plants grow in different ways based on the music they listen to.
In Phonosynthesis a plant will grow by playing music instead of following chlorophyll photosynthesis process.

<p align="center">
  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/growing.gif" alt="growing plant" width="40%"/>
</p>

## Introduction
Phonosynthesis is a web based application that aims to give an estimate of the harmonic surprise of a song and to create a visualization of it.
The application recognizes the most common chords made of four notes, so quadriads, with respect to a selected reference key.
Every chord corresponds to a leaf in a particular position in the plant: the farther the leaves the farther the chords.

<h3 align="center"> 
  <a href="https://www.youtube.com/watch?v=eVHMAzDCALU" align="center"> WATCH A DEMO </a>
</h3>

## Game Modes
Choose a modality among the three offered in the home page:
   * **Play** : Select a key and start to play your song
   * **Open** : Open a saved plant corresponding to a specific song, and possibly enrich it with other chords
   * **Compare** : Open two different songs to compare their plant representation and score
   
In the home page the song <a href="https://www.youtube.com/watch?v=LkesIsPGlSU" > Plantasia by Mort Garson </a> plays in background. <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/speaker.png" width="15"> 


## Controls
Access the **Play** or **Open** modality to enter into game mode. From there you can play a song and activate three different controls:

<p align="center">
  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/commands.png" width="80"/>
</p>

1. Open the **Key-Mode space**.
2. Open the **Sound controller**.  
3. **Save** the song. 

* #### 1. The Key-Mode space
  Click on the grid icon  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/keymodespace.png" width="15">  to make the key-mode space appear. The key-mode space is a grid where it is possible to check the key and the mode of each leaf of the plant according to what has been played.
  The leaves' disposition follows the circle of fifths for the keys in vertical axis, so a maximum of 12 trunks per side that represents the 12 notes of the chromatic scale, and for the modes in the horizontal one that represents the seven possible modes of a chord. So on each trunk there can be at most 7 leaves.
  
  <p align="center">
  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/grid.png" width="80%"/>
</p>

* #### 2. The Sound controller
  Click on the note icon  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/synth.png" width="15">  to open the sound controller.
It allows the user to select a preferred input: pc keyboard or a MIDI controller. 

  <p align="center"><img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/keyskeyboardgif.gif" width="40%"/></p>

There is the possibility to select the **Instrument** mode (piano / e-piano / guitar) or **Synth** mode which allows to modify a set of parameters to modulate the sound:
  - **Oscillators**: sinusoidal  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/sin.png" width="15">  , triangular  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/tri.png" width="15">   or square  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/sqr.png" width="15"> .
  - **Envelope**: characterized by the ADSR model (Attack - Decay - Sustain - Release).
  - **Filter**: low pass  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/lowpass.png" width="15">  , high pass  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/highpass.png" width="15">  and band pass filters  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/bandpass.png" width="15">  that control the timbre.
  - **Effects**: Delay - Reverb - Tremolo.
  
 <p align="center"><img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/synthGif.gif" width="80%"/></p>
  
 The set of sampled Instruments is imported from [WebAudioFont](https://surikov.github.io/webaudiofont/).
 The Synth controls are developed using [Tone.js](https://tonejs.github.io/) library.
 
* #### 3. Save
Click on the save icon  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/save.png" width="15">  in order to save the song that has been played. It allows to name the song in the *artist-title* box; if an existing song has the same name of the one given as input, the user will be able to choose, through an alert message, whether to overwrite the song or cancel the operation.
  
  <p align="center">
  <img src="https://github.com/carlopulv/phonosynthesis/blob/master/img/saveGif.gif" width="80%"/>
</p>
  
 ## Database
 The database is hosted by Google Firebase that allows the application to store and sync data between different users in real time and to recover pre-played and stored songs.  
 The model of the plants are based on these parameters:
 
 - String of chords 
 - String of distances
 - The maximum mode in string
 - The maximum tonal in string
 - The general key of the song 
 - The chords in frequency in string
 
Each time a song is loaded in the **Open** mode or in the **Compare** mode the app inquires the database and extracts the infos from it in order to update and draw the plant model based on the specific parameters required. 

## Distance algorithm
Every chord is characterized by its key and its mode.
The distance between two chords is composed by three parameter:
* the key distance
* the mode distacne
* the hamming distance

The key distance is the difference between the chords tonals following the circle of fifth.
The mode distance is the difference of chords modes following the circle of fifth.
The hamming distance is the number of different notes between two chords.

The final value per each computation is given by two factor:
* the local distance: distance between the chord just played and the previous one.
* the global distance: the minimum among the distances between the chord just played and all the preceding ones.

## Links

* [Phonosynthesis](https://carlopulv.github.io/phonosynthesis)
* [GitHub repository](https://github.com/carlopulv/phonosynthesis)
* [Video Demo](https://www.youtube.com/watch?v=eVHMAzDCALU) - on YouTube
* [Knobs library](https://g200kg.github.io/input-knobs/)


[1]: https://www.youtube.com/watch?v=LkesIsPGlSU
[2]: https://surikov.github.io/webaudiofont/
[3]: https://tonejs.github.io/
[4]: https://g200kg.github.io/input-knobs/

## References
* **A SURVEY OF CHORD DISTANCES WITH COMPARISON FOR CHORD ANALYSIS.**   
Thomas Rocher, Matthias Robine, Pierre Hanna, Myriam Desainte-Catherine
LaBRI - University of Bordeaux, France.

* **TONAL PITCH STEP DISTANCE: A SIMILARITY MEASURE FOR CHORD PROGRESSIONS.**
W.Bas de Haas, Remco C. Veltkamp, Frans Wiering
Departement of Information and Computing Sciences, Utrecht University.


