<p align="center">
  <img src="https://github.com/carlopulv/actam19/blob/master/img/titleGif.gif" width="100%"//>
</p>

<p align="center">
  <img src="" width="150%"/>
</p>

<!-- <h1 align="center"> PHONOSYNTHESIS </h1> -->

## Concept
Phonosynthesis was born from the curious juxtaposition of music and plants. We followed the concept of making music for plants, as some artists have made, for example Mort Garson's Mother Earth’s Plantasia, where plants grow in different ways based on the music they listen to.
In Phonosynthesis a plant will grow by playing music instead of following chlorophyll photosynthesis process.

## Introduction
Phonosynthesis is a web based application that aims to give an estimate of the harmonic surprise of a song and to create a visualization of it.
The application recognizes the most common chords made of four notes, so quadriads, with respect to a reference key.

The distance computation is based on three parameters: the key, the mode and the note distance. 
Every chord corresponds to a leaf in a particular position in the plant.
The disposition follows the circle of fifths for the keys in vertical axis, so a maximum of 12 trunks per side that represents the 12 notes of the chromatic scale, and for the modes in the horizontal one that represents the seven possible modes of a chord. So on each trunk there can be at most 7 leaves. To summarize the farther the leaves the farther the chords.

## How to use
Chose a modality among the three offered in the home page:
   * PLAY: Select a key and start to play your song
   * OPEN: Open a saved plant corresponding to a specific song, and possibly enrich it with other chords
   * COMPARE: Open two different songs to compare their plant representation and score
   
In the home page the song <a href="https://www.youtube.com/watch?v=LkesIsPGlSU" > Plantasia by Mort Garrison </a> plays in background. <img src="https://github.com/carlopulv/actam19/blob/master/img/speaker.png" width="15"> 
<h3 align="center"> 
  <a href="" align="center"> WATCH A DEMO </a>
</h3>

## Controls
Access the PLAY or OPEN modality to enter into game mode. From there you can play a song and activate three different controls:

1. Open the key-mode space.
2. Open the sound controller.  
3. Save the song. 

* #### 1. The key-mode space
  Click on the grid icon  <img src="https://github.com/carlopulv/actam19/blob/master/img/keymodespace.png" width="15">  to make the key-mode space appear. The key-mode space is a grid where it is possible to check the key and the mode of each leaf of the plant according to what has been played. 

* #### 2. The synth
  Click on the note icon  <img src="https://github.com/carlopulv/actam19/blob/master/img/synth.png" width="15">  to open the synthetizer.
The synthetizer allows the user to select in which way to play: via pc keyboard or via MIDI input.
There is also the possibility to select the "instrument" mode (piano / e-piano / guitar) or "synth" mode which allows to modify a set of parameters to modulate the sound:
  - Oscillators: sinusoidal  <img src="https://github.com/carlopulv/actam19/blob/master/img/sin.png" width="15">  , triangular  <img src="https://github.com/carlopulv/actam19/blob/master/img/tri.png" width="15">   or square  <img src="https://github.com/carlopulv/actam19/blob/master/img/sqr.png" width="15"> .
  - Envelope: characterized by the ADSR model (attack - decay - sustain - release).
  - Filter: low pass  <img src="https://github.com/carlopulv/actam19/blob/master/img/lowpass.png" width="15">  , high pass  <img src="https://github.com/carlopulv/actam19/blob/master/img/highpass.png" width="15">  and band pass filters  <img src="https://github.com/carlopulv/actam19/blob/master/img/bandpass.png" width="15">  that control the timbre.
  - Effects: delay - reverb - tremolo.
  
 Sound modulation: The set of possible sampled sounds is imported from [WebAudioFont](https://surikov.github.io/webaudiofont/).
* #### 3. Save
  click on the save icon  <img src="https://github.com/carlopulv/actam19/blob/master/img/save.png" width="15">  in order to save the song that has been played. It allows to name the song thanks to an the artist-title box; if an existing song has the same name of the one given as input, the system notifies the user with an alert message warning that if the users decides to save the progress, the system will overwrite an already existing song. 
  
 ## Database
 The model of the plants are based on these parameters:
 
 - string of chords 
 - string of distances
 - the maximum mode in string
 - the maximum tonal in string
 - the general key of the song and the chords in frequency in string
 
To be able to recover at every moment a saved song, these parameters are stored in a cloud database hosted by Firebase. It allows to store and sync data between different users in real time. 

Each time a song is loaded in the "OPEN" mode or in the "COMPARE" mode the app inquires the database and extract the infos from it in order to update and draw the plant model based on the specific parameters required. 
