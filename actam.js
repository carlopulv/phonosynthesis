/**
 * @class Represent the object "Chord"
 * @param {Integer} tonal Tonal note of the chord, the number represent the distance from the key selected by the user. 
 * @param {String} mode Represent the mode of the chord. It is a number between 1 and 7.
 */
function Chord(tonal, mode) {
	this.tonal=tonal;
	this.mode = mode;
}

var generalKey=0;
var chordsPlayed=[];
/**
 * Get the key selected from the user before starting playing.
 */
function getKey(){
  generalKey=document.key.key.value;
}

const keys = "awsdrftghujikolpzxcvbnm";
/**
 * Recognize chords.
 * @param {Double} notes List of the pitches of the notes played in frequency.
 */
function typeChord(notes){
	var distance=' ';
  var type=' ';
  var distForModeRecog=[];
	notes.sort();
  var adj=0;
	//TODO:accordi con note in un ottava diversa da quella delle altre note non sono riconosciuti

	for(var i=0;i<notes.length;i++){
    if(i<notes.length-1){
      var temp=Math.round(12*(Math.log2(notes[i+1]/440)-Math.log2(notes[i]/440)));
      distance=distance+temp.toString()+' ';
    }
    var temp1=Math.round(12*(Math.log2(notes[i]/440)-Math.log2(generalKey/440)));
    if(Math.abs(temp1)%12==0){
      temp1=0;
    }
    else if(temp1%12<0){
      temp1=temp1%12+12;
    }
    else{
      temp1=temp1%12;
    }
    distForModeRecog.push(temp1);
  }

//TODO ottimizzare sta merda
  //major chords, 1 e 4 modes
	if(distance==' 4 3 4 '){
    if(distForModeRecog[0]==0){
      chordsPlayed.push(new Chord(0,1)); 
    }
    else if(distForModeRecog[0]==5){
      chordsPlayed.push(new Chord(0,4));
    }
    else{
      chordsPlayed.push(new Chord(distForModeRecog[0],1))
    }
  }
  if(distance==' 3 4 1 '){
    if(distForModeRecog[3]==0){
      chordsPlayed.push(new Chord(0,1));
    }
    else if(distForModeRecog[3]==5){
      chordsPlayed.push(new Chord(0,4));
    }
    else{
      chordsPlayed.push(new Chord(distForModeRecog[3],1))
    }
  }
  if(distance==' 4 1 4 '){
    if(distForModeRecog[2]==0){
      chordsPlayed.push(new Chord(0,1));
    }
    else if(distForModeRecog[2]==5){
      chordsPlayed.push(new Chord(0,4));
    }
    else{
      chordsPlayed.push(new Chord(distForModeRecog[2],1))
    }
  }
  if(distance==' 1 4 3 '){
    if(distForModeRecog[1]==0){
      chordsPlayed.push(new Chord(0,1));
    }
    else if(distForModeRecog[1]==5){
      chordsPlayed.push(new Chord(0,4));
    }
    else{
      chordsPlayed.push(new Chord(distForModeRecog[1],1))
    }
  }
  
  //minor chords, 2 3 6 modes, when there is a change of key it is considere a chord in second mode.
  if(distance==' 3 4 3 '){
    if(distForModeRecog[0]==2){
      chordsPlayed.push(new Chord(0,2));
    }
    else if(distForModeRecog[0]==4){
      chordsPlayed.push(new Chord(0,3));
    }
    else if(distForModeRecog[0]==9){
      chordsPlayed.push(new Chord(0,6));
    }
    else{
      if(distForModeRecog[0]-1<0){
        adj=12;
      }
      chordsPlayed.push(new Chord((distForModeRecog[0]-1)+adj,2));
    }
  }
  if(distance==' 4 3 2 '){
    if(distForModeRecog[3]==2){
      chordsPlayed.push(new Chord(0,2));
    }
    else if(distForModeRecog[3]==4){
      chordsPlayed.push(new Chord(0,3));
    }
    else if(distForModeRecog[3]==9){
      chordsPlayed.push(new Chord(0,6));
    }
    else{
      if(distForModeRecog[3]-1<0){
        adj=12;
      }
      chordsPlayed.push(new Chord((distForModeRecog[3]-1)+adj,2));
    }
  }
  if(distance==' 3 2 3 '){
    if(distForModeRecog[2]==2){
      chordsPlayed.push(new Chord(0,2));
    }
    else if(distForModeRecog[2]==4){
      chordsPlayed.push(new Chord(0,3));
    }
    else if(distForModeRecog[2]==9){
      chordsPlayed.push(new Chord(0,6));
    }
    else{
      if(distForModeRecog[2]-1<0){
        adj=12;
      }
      chordsPlayed.push(new Chord((distForModeRecog[2]-1)+adj,2));
    }
  }
  if(distance==' 2 3 4 '){
		if(distForModeRecog[1]==2){
      chordsPlayed.push(new Chord(0,2));
    }
    else if(distForModeRecog[1]==4){
      chordsPlayed.push(new Chord(0,3));
    }
    else if(distForModeRecog[1]==9){
      chordsPlayed.push(new Chord(0,6));
    }
    else{
      if(distForModeRecog[1]-1<0){
        adj=12;
      }
      chordsPlayed.push(new Chord((distForModeRecog[1]-1)+adj,2));
    }
  }
  //Dominant chord
    if(distance==' 4 3 3 '){
      if(distForModeRecog[0]==7){
        chordsPlayed.push(new Chord(0,5));
      }
      else{
        if(distForModeRecog[0]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[0]-7)+adj,5));
      }
    }
    if(distance==' 3 3 2 '){
      if(distForModeRecog[3]==7){
        chordsPlayed.push(new Chord(0,5));
      }
      else{
        if(distForModeRecog[3]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[3]-7)+adj,5));
      }
    }
    if(distance==' 3 2 4 '){
      if(distForModeRecog[2]==7){
        chordsPlayed.push(new Chord(0,5));
      }
      else{
        if(distForModeRecog[2]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[2]-7)+adj,5));
      }
    }
    if(distance==' 2 4 3 '){
      if(distForModeRecog[1]==7){
        chordsPlayed.push(new Chord(0,5));
      }
      else{
        if(distForModeRecog[1]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[1]-7)+adj,5));
      }
    }
    //Locrian Chord
    if(distance==' 3 3 4 '){
      if(distForModeRecog[0]==11){
        chordsPlayed.push(new Chord(0,7));
      }
      else{
        if(distForModeRecog[0]-11<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[0]-11)+adj,7));
      }
    }
    if(distance==' 3 4 2 '){
      if(distForModeRecog[3]==11){
      chordsPlayed.push(new Chord(0,7));
      }
      else{
        if(distForModeRecog[3]-11<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[3]-11)+adj,7));
      }
    } 
    if(distance==' 4 2 3 '){
      if(distForModeRecog[2]==11){
        chordsPlayed.push(new Chord(0,7));
      }
      else{
        if(distForModeRecog[2]-11<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[2]-11)+adj,7));
      }
    }
    if(distance==' 2 3 3 '){
      if(distForModeRecog[1]==11){
        chordsPlayed.push(new Chord(0,7));
      }
      else{
        if(distForModeRecog[1]-11<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[1]-11)+adj,7));
      }
    }
    console.log(chordsPlayed);
}



//connecting keybord to play sounds

const duration=1;
const c = new AudioContext();
const lfog = c.createGain();
const lfoo = c.createOscillator();
lfog.connect(c.destination);
lfoo.frequency.value = 10;
lfoo.connect(lfog.gain);
lfoo.frequency.value = 0;
lfoo.start();
var notes=[];
resume_context()

function resume_context() {
    c.resume();
}

//const keys = "awsedftgyhujkolp";

gains = {}
document.body.onkeydown = function(e) {
    if(e.key == "v") {lfoo.frequency.value = 10; return;}
    if(e.repeat)return;

    o = c.createOscillator();
    g = c.createGain();
    o.connect(g);
    g.connect(lfog);
    g.gain.value = 0;

    const position = keys.indexOf(e.key);
    const pitch = 440*Math.pow(2, position/12);
    o.frequency.value = pitch;
    o.type = "sine";
    o.start()
    g.gain.linearRampToValueAtTime(1, c.currentTime + 0.1);
    gains[e.key] = g;
    notes.push(pitch);
}


document.body.onkeyup = function(e) {
    if(notes.length>3){
        typeChord(notes);
        //mapChordToVertex(chordsPlayed[chordsPlayed.length-1]);
    }
    /*if(e.key == "v") {lfoo.frequency.value = 0; return;}*/
    gains[e.key].gain.setValueAtTime(1, c.currentTime);
    gains[e.key].gain.linearRampToValueAtTime(0, c.currentTime + 0.1)
    notes.pop();
    /*if(notes.length==0){
        cont++;
    }
    if(cont==2){
        computeProbability();
        cont==0;
    }*/
}





/**
 * Select a color in a restricted area of the color space to avoid white, black, brown.
 */
function rgbselector(){
  if (red==255){
    if(green<200&&blue<100){
      green=green+1;
    }
    else if(blue<100){
      blue=blue+1;
    }
    else{
      if(blue<200){
        blue=blue+1;
        if(blue==110){
          green=0;
        }
      }
      else if(green<100){
        green=green+1;
      }
      else{
        red=100;
        green=255;
        blue=0;
      } 
    }
  }
  if (green==255){
    if(red<200&&blue<100){
      red=red+1;
    }
    else if(blue<100){
      blue=blue+1;
    }
    else{
      if(blue<200){
        blue=blue+1;
        if(blue==110){
          red=0;
        }
      }
      else if(red<100){
        red=red+1;
      }
      else{
        red=100;
        green=0;
        blue=255;
      } 
    }
  }
  if (blue==255){
    if(red<200&&green<100){
      red=red+1;
    }
    else if(green<100){
      green=green+1;
    }
    else{
      if(green<200){
        green=green+1;
        if(green==110){
          red=0;
        }
      }
      else if(red<100){
        red=red+1;
      }
      else{
        red=255;
        green=100;
        blue=0;
      } 
    }
  }
  array=[red, green, blue];
  return array;
}

//graphics

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}