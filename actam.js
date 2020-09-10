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
var chordDistances=[];
var listnotes=[];
var circleOfFifthForMode=[0,4,1,5,2,6,3];
var circleOfFifthForKey=[0,7,2,9,4,11,6,1,8,3,10,5];


/**
 * Get the key selected from the user before starting playing.
 */
function getKey(){
  generalKey=document.key.key.value;
}

const keys = "awsdrftghujikolpzxcvbnm";
/**
 * Recognize chords. 
 * It fills the array chordsPlayed with objects of type Chord.
 * @param {Double} notes List of the pitches of the notes played in frequency.
 */
function typeChord(notes){
	var distance=' ';
  var type=' ';
  var distForModeRecog=[];
  var tempnotes=[];
  notes.sort();
  tempnotes.push(notes[0],notes[1],notes[2],notes[3]);
  listnotes.push(tempnotes);
  var adj=0;
  var oldChordsPLayedLength=chordsPlayed.length;
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
    if(chordsPlayed.length>1&&oldChordsPLayedLength<chordsPlayed.length){
      harmonicDistance();
    }
    console.log(chordDistances);
}

/**
 * Calculate the harmonic distance following a TPS-like algorithm based on the differences of key, mode and sigle notes played.
 * It fills the array with the distance between the actual chord and the previous chord in the even indexes and the minimum distance between the actual chord and all the others played yet in the odd indexes. 
 */
function harmonicDistance(){
  var ii;
  var distance;
  var modeDistance;
  var keydistance;
  var len=chordsPlayed.length-1;
  var minDistance=100;

  for(ii=len;ii>0;ii--){
    hammingDistance=0;
    for(j=0;j<4;j++){
      if(listnotes[len][j]!=listnotes[ii-1][0]&&listnotes[len][j]!=listnotes[ii-1][1]&&listnotes[len][j]!=listnotes[ii-1][2]&&listnotes[len][j]!=listnotes[ii-1][3]){
        hammingDistance++;
      }
    }

    //this part is useful for the phrigyan mode and its position in the circle of fifths.
    indexForMode1=circleOfFifthForMode.indexOf(chordsPlayed[len].mode);
    indexForMode2=circleOfFifthForMode.indexOf(chordsPlayed[ii-1].mode);
    if(indexForMode1==6&&indexForMode1==6){
      modeDistance=0;
    }
    else if(indexForMode1==6){
      modeDistance=indexForMode2+1;
    }
    else if(indexForMode2==6){
      modeDistance=indexForMode1+1;
    }
    else{
      modeDistance=Math.abs(indexForMode1-indexForMode2);
    }
    keydistance=Math.abs(circleOfFifthForKey.indexOf(chordsPlayed[len].tonal)-circleOfFifthForKey.indexOf(chordsPlayed[ii-1].tonal));
    //implements the circularity of the circle of fifth.
    if(keydistance>6){
      keydistance=12-keydistance;
    }

    distance=keydistance+modeDistance+hammingDistance;

    if(ii==len){
       chordDistances.push(distance);
    }
    minDistance=Math.min(minDistance, distance);
  }
  chordDistances.push(minDistance);
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
    //if(e.key == "v") {lfoo.frequency.value = 10; return;}
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


//graphics

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}