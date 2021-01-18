<p align="center">
  <img src="" width="50%"//>
</p>

<p align="center">
  <img src="" width="150%"/>
</p>

<h1 align="center"> PHONOSYNTHESIS </h1>

## Concept
Phonosynthesis was born from the curious juxtaposition of music and plants. We followed  the concept of making music for plants, as some artists have made, for example Mother Earth’s Plantasia of Mort Garson, where plants grow in different ways based on the music they listen to.
In Phonosynthesis a plant will grow by playing music instead of the process of chlorophyll photosynthesis.

## introduction
Phonosynthesis is a web based application that aims to give an estimate of the harmonic surprise of a song and to create a visualization of it.
The application recognizes the most common chords made of four notes, so quadriads, with respect to a reference key.

The distance computation is based on three parameters: the key, the mode and the note distance. 
Every chord corresponds to a leaf in a particular position in the plant.
The disposition follows the circle of fifths for the keys in vertical axis, so a maximum of 12 trunks per side that represents the 12 notes of the chromatic scale, and for the modes in the horizontal one that represents the seven possible modes of a chord. So on each trunk there can be at most 7 leaves. To summarize the farther the leaves the farther the chords.

## How to use
Chose a modality among the three offered
   * PLAY: Select a key and start to play your song
   * OPEN: Open a saved plant corresponding to a specific song, and possibly enrich it with other chords
   * COMPARE: Open two different songs to compare their plant representation and score

Sound modulation: The set of possible sampled sounds is imported from [WebAudioFont](https://surikov.github.io/webaudiofont/).


<h3 align="center"> 
  <a href="" align="center"> WATCH A DEMO </a>
</h3>

## Controls
Acces the PLAY or OPEN modality to enter into game mode. From here you can play a song and activate three different controls:

1. Open the key-mode space.
2. Open the synth.  
3. Save the song. 

* #### 1. The key-mode space
  Click on the grid icon  <img src="https://github.com/carlopulv/actam19/blob/master/img/keymodespace.png" width="15">  to make the key-mode space appear. The key-mode space is a grid where it is possible to check the key and the mode of each leaf of the plant according to what has been played. 

* #### 2. The synth
  Click on the note icon  <img src="https://github.com/carlopulv/actam19/blob/master/img/synth.png" width="15">  to open the synthetizer.
The synthetizer allows the user to select in which way to play: via pc keyboard or via MIDI input.
There is also the possibility to select the "instrument" mode (piano / e-piano / guitar) or "synth" mode which allows to modify a set of parameters to modulate the sound:
  - the envelope: characterized by the ADSR model (attack - decay - sustain - release).
  - the oscillators: sinusoidal, triangular or rectangular.
  - frequencies: cut off frequency - resonance frequency.
  - effects: delay - reverb - tremolo.

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
