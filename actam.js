var generalKey=0;
var chordsPlayed=[];
var chordDistances=[];
var listnotes=[];
var circleOfFifthForMode=[1,5,2,6,3,7,4];
var circleOfFifthForKey=[0,7,2,9,4,11,6,1,8,3,10,5];
var keysshown=false;
var maxtonal=0;
var maxmode=[0,0,0,0,0,0,0,0,0,0,0,0];
var game_state = 0;
var heightsForLeaves=[];
var widthsForLeaves=[];
var widthsForLeavesMirrored=[];
let chordsPlayedNoDup=[];

//chordsPlayed.push(new Chord(0,1,0));questa cosa non funziona devo fare in modo di far sentire il primo accordo.

/**
 * Get the key selected from the user before starting playing.
 */
function getKey(){
  generalKey=this.value;
  game_state=1;
  keys_list.style.display = "none";
  document.querySelectorAll(".initial-button")[1].style.display = "none";
  document.querySelectorAll(".initial-button")[2].style.display = "none";
  document.querySelectorAll(".initial-button")[3].style.display = "none";

}



/**
 * Compares integer numbers.
 * @param {Integer} a first factor
 * @param {Integer} b second factor
 */
function compareNumbers(a, b) {
  return a - b;
}

const keys = "q2we4r5ty7u8i9opazsxcfvgbhnmk";
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
  notes.sort(compareNumbers);
  tempnotes.push(notes[0],notes[1],notes[2],notes[3]);
  listnotes.push(tempnotes);
  var adj=0;
  var oldChordsPlayedLength=chordsPlayed.length;

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
  console.log("distance: "+ distance);
  console.log(distForModeRecog[0]);

//TODO ottimizzare sta merda
  //major chords, 1 e 4 modes
	if(distance==' 4 3 4 '){
    if(distForModeRecog[0]==0){
      chordsPlayed.push(new Chord(0,1,0)); 
    }
    else if(distForModeRecog[0]==5){
      chordsPlayed.push(new Chord(0,4,0));
    }
    else{
      chordsPlayed.push(new Chord(distForModeRecog[0],1,0))
    }
  }
  else if(distance==' 3 4 1 '){
    if(distForModeRecog[3]==0){
      chordsPlayed.push(new Chord(0,1,0));
    }
    else if(distForModeRecog[3]==5){
      chordsPlayed.push(new Chord(0,4,0));
    }
    else{
      chordsPlayed.push(new Chord(distForModeRecog[3],1,0))
    }
  }
  else if(distance==' 4 1 4 '){
    if(distForModeRecog[2]==0){
      chordsPlayed.push(new Chord(0,1,0));
    }
    else if(distForModeRecog[2]==5){
      chordsPlayed.push(new Chord(0,4,0));
    }
    else{
      chordsPlayed.push(new Chord(distForModeRecog[2],1,0))
    }
  }
  else if(distance==' 1 4 3 '){
    if(distForModeRecog[1]==0){
      chordsPlayed.push(new Chord(0,1,0));
    }
    else if(distForModeRecog[1]==5){
      chordsPlayed.push(new Chord(0,4,0));
    }
    else{
      chordsPlayed.push(new Chord(distForModeRecog[1],1,0))
    }
  }
  
  //minor chords, 2 3 6 modes, when there is a change of key it is considere a chord in second mode.
  else if(distance==' 3 4 3 '){
    if(distForModeRecog[0]==2){
      chordsPlayed.push(new Chord(0,2,0));
    }
    else if(distForModeRecog[0]==4){
      chordsPlayed.push(new Chord(0,3,0));
    }
    else if(distForModeRecog[0]==9){
      chordsPlayed.push(new Chord(0,6,0));
    }
    else{
      if(distForModeRecog[0]-2<0){
        adj=12;
      }
      chordsPlayed.push(new Chord((distForModeRecog[0]-2)+adj,2,0));
    }
  }
  else if(distance==' 4 3 2 '){
    if(distForModeRecog[3]==2){
      chordsPlayed.push(new Chord(0,2,0));
    }
    else if(distForModeRecog[3]==4){
      chordsPlayed.push(new Chord(0,3,0));
    }
    else if(distForModeRecog[3]==9){
      chordsPlayed.push(new Chord(0,6,0));
    }
    else{
      if(distForModeRecog[3]-1<0){
        adj=12;
      }
      chordsPlayed.push(new Chord((distForModeRecog[3]-1)+adj,2,0));
    }
  }
  else if(distance==' 3 2 3 '){
    if(distForModeRecog[2]==2){
      chordsPlayed.push(new Chord(0,2,0));
    }
    else if(distForModeRecog[2]==4){
      chordsPlayed.push(new Chord(0,3,0));
    }
    else if(distForModeRecog[2]==9){
      chordsPlayed.push(new Chord(0,6,0));
    }
    else{
      if(distForModeRecog[2]-1<0){
        adj=12;
      }
      chordsPlayed.push(new Chord((distForModeRecog[2]-1)+adj,2,0));
    }
  }
  else if(distance==' 2 3 4 '){
		if(distForModeRecog[1]==2){
      chordsPlayed.push(new Chord(0,2,0));
    }
    else if(distForModeRecog[1]==4){
      chordsPlayed.push(new Chord(0,3,0));
    }
    else if(distForModeRecog[1]==9){
      chordsPlayed.push(new Chord(0,6,0));
    }
    else{
      if(distForModeRecog[1]-1<0){
        adj=12;
      }
      chordsPlayed.push(new Chord((distForModeRecog[1]-1)+adj,2,0));
    }
  }
  //Dominant chord
    else if(distance==' 4 3 3 '){
      if(distForModeRecog[0]==7){
        chordsPlayed.push(new Chord(0,5,0));
      }
      else{
        if(distForModeRecog[0]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[0]-7)+adj,5,0));
      }
    }
    else if(distance==' 3 3 2 '){
      if(distForModeRecog[3]==7){
        chordsPlayed.push(new Chord(0,5,0));
      }
      else{
        if(distForModeRecog[3]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[3]-7)+adj,5,0));
      }
    }
    else if(distance==' 3 2 4 '){
      if(distForModeRecog[2]==7){
        chordsPlayed.push(new Chord(0,5,0));
      }
      else{
        if(distForModeRecog[2]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[2]-7)+adj,5,0));
      }
    }
    else if(distance==' 2 4 3 '){
      if(distForModeRecog[1]==7){
        chordsPlayed.push(new Chord(0,5,0));
      }
      else{
        if(distForModeRecog[1]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[1]-7)+adj,5,0));
      }
    }
    //Locrian Chord
    else if(distance==' 3 3 4 '){
      if(distForModeRecog[0]==11){
        chordsPlayed.push(new Chord(0,7,0));
      }
      else{
        if(distForModeRecog[0]-11<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[0]-11)+adj,7,0));
      }
    }
    else if(distance==' 3 4 2 '){
      if(distForModeRecog[3]==11){
      chordsPlayed.push(new Chord(0,7,0));
      }
      else{
        if(distForModeRecog[3]-11<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[3]-11)+adj,7,0));
      }
    } 
    else if(distance==' 4 2 3 '){
      if(distForModeRecog[2]==11){
        chordsPlayed.push(new Chord(0,7,0));
      }
      else{
        if(distForModeRecog[2]-11<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[2]-11)+adj,7,0));
      }
    }
    else if(distance==' 2 3 3 '){
      if(distForModeRecog[1]==11){
        chordsPlayed.push(new Chord(0,7,0));
      }
      else{
        if(distForModeRecog[1]-11<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[1]-11)+adj,7,0));
      }
    }

    //Other common chords

    //major chord add2
    else if(distance==' 2 2 3 '){
      chordsPlayed.push(new Chord(distForModeRecog[0],1,2));
    }
    else if(distance==' 2 3 5 '){
      chordsPlayed.push(new Chord(distForModeRecog[3],1,2));
    }
    else if(distance==' 3 5 2 '){
      chordsPlayed.push(new Chord(distForModeRecog[2],1,2));
    }
    else if(distance==' 5 2 2 '){
      chordsPlayed.push(new Chord(distForModeRecog[1],1,2));
    }

    //major chord add9
    else if(distance==' 4 3 7 '){
      chordsPlayed.push(new Chord(distForModeRecog[0],1,9));
    }

    //minor 7maj
    else if(distance==' 3 4 4 '){
      if(distForModeRecog[0]-9<0){
        adj=12;
      }
      chordsPlayed.push(new Chord(distForModeRecog[0]-9+adj,6,7));
    }
    else if(distance==' 4 4 1 '){
      if(distForModeRecog[3]-9<0){
        adj=12;
      }
      chordsPlayed.push(new Chord(distForModeRecog[3]-9+adj,6,7));    
    }
    else if(distance==' 4 1 3 '){
      if(distForModeRecog[2]-9<0){
        adj=12;
      }
      chordsPlayed.push(new Chord(distForModeRecog[2]-9+adj,6,7));    
    }
    else if(distance==' 1 3 4 '){
      if(distForModeRecog[1]-9<0){
        adj=12;
      }
      chordsPlayed.push(new Chord(distForModeRecog[1]-9+adj,6,7));    
    }

    //minor add2
    else if(distance==' 2 1 4 '){
      if(distForModeRecog[0]-9<0){
        adj=12;
      }
      chordsPlayed.push(new Chord(distForModeRecog[0]-9+adj,6,7));    
    }
    else if(distance==' 1 4 5 '){
      if(distForModeRecog[3]-9<0){
        adj=12;
      }
      chordsPlayed.push(new Chord(distForModeRecog[3]-9+adj,6,7));    
    }
    else if(distance==' 4 5 2 '){
      if(distForModeRecog[2]-9<0){
        adj=12;
      }
      chordsPlayed.push(new Chord(distForModeRecog[2]-9+adj,6,7));    
    }
    else if(distance==' 5 2 1 '){
      if(distForModeRecog[1]-9<0){
        adj=12;
      }
      chordsPlayed.push(new Chord(distForModeRecog[1]-9+adj,6,7));    
    }

    //minor chord add9
    else if(distance==' 3 4 7 '){
      if(distForModeRecog[0]-9<0){
        adj=12;
      }
      chordsPlayed.push(new Chord(distForModeRecog[0]-9+adj,6,9));
    }

    //diminished chord
    else if(distance==' 3 3 3 '){
      if(distForModeRecog[0]-11<0){
        adj=12;
      }
      chordsPlayed.push(new Chord(distForModeRecog[0]-11+adj,7,7));
    }

    //augmented chord
    else if(distance==' 4 4 2 '){
      chordsPlayed.push(new Chord(distForModeRecog[0],1,5));  
    }
    else if(distance==' 4 2 2 '){
      chordsPlayed.push(new Chord(distForModeRecog[3],1,5));  
    }
    else if(distance==' 2 2 4 '){
      chordsPlayed.push(new Chord(distForModeRecog[2],1,5));  
    }
    else if(distance==' 2 4 4 '){
      chordsPlayed.push(new Chord(distForModeRecog[2],1,5));  
    }

    //suspended fourth chord
    else if(distance==' 5 2 3 '){
      chordsPlayed.push(new Chord(distForModeRecog[0],1,4));  
    }
    else if(distance==' 2 3 2 '){
      chordsPlayed.push(new Chord(distForModeRecog[3],1,4));  
    }
    else if(distance==' 3 2 5 '){
      chordsPlayed.push(new Chord(distForModeRecog[2],1,4));  
    }
    else if(distance==' 2 5 2 '){
      chordsPlayed.push(new Chord(distForModeRecog[2],1,4));  
    }
    else{
      listnotes.pop();
    }
    console.log(chordsPlayed);
    if(oldChordsPlayedLength<chordsPlayed.length){
      harmonicDistance();
      chordsPlayedNoDup=unique(chordsPlayed);
      mapChordsToLeaves();
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

  adjForCircleOfFifthsForTrackLength=circleOfFifthForKey.indexOf(chordsPlayed[chordsPlayed.length-1].tonal);
  adjForCircleOfFifthsForTrackLength*=2;
  if(adjForCircleOfFifthsForTrackLength>11) adjForCircleOfFifthsForTrackLength=24-adjForCircleOfFifthsForTrackLength-1;
  maxtonal=Math.max(maxtonal,adjForCircleOfFifthsForTrackLength);

  adjForMaxMode=circleOfFifthForMode.indexOf(chordsPlayed[chordsPlayed.length-1].mode);
  adjForMaxMode+=2;
  if(adjForMaxMode==8) adjForMaxMode=1;
  maxmode[adjForCircleOfFifthsForTrackLength]=max(maxmode[adjForCircleOfFifthsForTrackLength],adjForMaxMode);
  truckLength=maxtonal;
}



//connecting keybord to play sounds

/*const duration=1;
const c = new AudioContext();
const lfog = c.createGain();
const lfoo = c.createOscillator();
lfog.connect(c.destination);
lfoo.frequency.value = 10;
lfoo.connect(lfog.gain);
lfoo.frequency.value = 0;
lfoo.start();*/
var notes=[];
//resume_context()


var duration=4;
var selectedPreset=_tone_0000_Aspirin_sf2_file;
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var player=new WebAudioFontPlayer();
player.loader.decodeAfterLoading(audioContext, '_tone_0000_JCLive_sf2_file');

function playKey(pitch){
	player.queueWaveTable(audioContext, audioContext.destination, _tone_0000_Aspirin_sf2_file, 0, pitch, 0.75);
}

function resume_context() {
    c.resume();
}

//const keys = "awsedftgyhujkolp";

gains = {}
/*document.body.onkeydown = function(e) {
    //if(e.key == "v") {lfoo.frequency.value = 10; return;}
    if(e.repeat)return;

    o = c.createOscillator();
    g = c.createGain();
    o.connect(g);
    g.connect(lfog);
    g.gain.value = 0;

    const position = keys.indexOf(e.key);
    const pitch = Math.round(440*Math.pow(2, position/12));
    o.frequency.value = pitch;
    o.type = "sine";
    o.start()
    g.gain.linearRampToValueAtTime(1, c.currentTime + 0.1);
    gains[e.key] = g;
    notes.push(pitch);
}*/

document.body.onkeydown = function(e) {
  duration=3;
  if(e.repeat)return;
  var position = keys.indexOf(e.key);
  if(position>=0){
    var pitch = Math.round(440*Math.pow(2, position/12));
    midiPitch=Math.log2((Math.pow(pitch / 261.63,12) * Math.pow(2,60))) / Math.log2(2);
    player.queueWaveTable(audioContext, audioContext.destination, selectedPreset, 0, midiPitch, duration);
    notes.push(pitch);
  }  
}



document.body.onkeyup = function(e) {
  if(notes.length>3){
        typeChord(notes);
  }
  else if(notes.length==1){
    player.cancelQueue(audioContext);
  }
    /*if(e.key == "v") {lfoo.frequency.value = 0; return;}
    gains[e.key].gain.setValueAtTime(1, c.currentTime);
    gains[e.key].gain.linearRampToValueAtTime(0, c.currentTime + 0.1)*/
    notes.pop();
}

/**
 * This function is called when "play" button is clicked. It creates the buttons to be used to select the key.
 */
function showKeys() {
  keysshown = true;
  let i = 0;
  let name_key = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
  let freq_key = ["440", "466", "494", "523", "554", "587", "622", "659", "698", "740", "784", "831"];
  let position_x_keyButton = ["3vw","7.5vw","14vw","18vw","25vw","32vw","37.5vw","44vw","50vw","56vw","61.5vw","67vw"];
  let position_y_keyButton = ["16.5vh","22vh","16vh","29vh","33vh","24vh","34.5vh","26vh","31vh","20vh","30.5vh","20.5vh"];
  while(i<12){
  el=document.createElement("div");
  el.classList.add("keys_button");
  el.innerHTML+= name_key[i];
  el.value = freq_key[i];
  el.onclick = getKey; 
  el.style.top = position_y_keyButton[i];
  el.style.left = position_x_keyButton[i];
  keys_list.appendChild(el);
  i++;
  }
}




//graphics
let angle=0;
let scale = 1;
let truckLength=1;
let truckScale=0.3;
let truckSuperposition=(920-196)*truckScale;
let scalePlantTrunk=1;
let truckPlantSuperposition=1;
let colorBranch;
let branchY=[];
let branchX=[];
let angles=[50,140,50,140,50,140,50];
let anglesMirrored=[310,220,310,220,310,220,310];
let anglesForLeaves=[];
let anglesForLeavesMirrored=[];

let onOff=0;
var l3;

function setup() {  
  l3=new Leaf(1,windowWidth/2,500,50);
  frameRate(15);
  colorBranch=color(56,87,35);
}

function draw() {  
  createCanvas(windowWidth, windowHeight);
  clear();
  scalePlantTrunk=truckScale/2*windowHeight/900;
  truckPlantSuperposition=truckSuperposition/2*windowHeight/900;

  //Home page
  if(game_state==0){
    t = new Trunk(0.3, 0, windowHeight, 180);
    let i = ceil(windowHeight/((920-196)*0.3));
    while(truckSuperposition*i>=0){             
      t.transform(truckScale, 0+13, truckSuperposition*i, 180 );
      t.plot();
      i--;
    } 
    l = new Leaf(1, 400, 400, angle);
    scale = windowHeight/900; 
    let j=0.3;

    if (keysshown==false){
      l.transform(scale, 12, windowHeight*j, angle+70);
      l.plot();

      document.querySelectorAll(".initial-button")[3].style.display="none";
    }
    else{
      document.querySelectorAll(".initial-button")[0].style.display="none";
      document.querySelectorAll(".initial-button")[3].style.display="block";
      //disegna ramo
      let position_x = [0,0.02,0.07,0.13,0.18,0.25,0.31,0.37,0.43,0.49,0.55,0.61,0.67,0.72];
      let position_y = [0.3,0.22,0.23,0.21,0.28,0.33,0.3,0.35,0.31,0.31,0.25,0.3,0.27,0.25]; 
      let pos_angle = [55,120,60,150,130,50,120,60,130,70,140,40];
      let a=0;

      beginShape();
      noFill();
      strokeWeight(4);
      stroke(56,87,35);
      while(a<14){
        vertex(windowWidth*position_x[a], windowHeight*position_y[a]);
        a++;
      }
      endShape();
      //foglie con le keys
      a=1;
      while(a<13){  
        l.transform(scale*0.7, windowWidth*position_x[a], windowHeight*position_y[a], pos_angle[a-1]);
        l.plot();
        a++;
      }
      l.transform(scale, windowWidth*position_x[position_x.length-1] , windowHeight*position_y[position_y.length-1], angle+70);
      l.plot();
    }

    j+=0.25;
    l.transform(scale, 12, windowHeight*j, angle+70);
    l.plot();
    j+=0.25;
    l.transform(scale, 12, windowHeight*j, angle+70);
    l.plot();
  }
  //The game started
  else if(game_state==1){
    document.querySelectorAll(".button-synth")[0].style.display="block";
    t = new Trunk(truckScale, 0, windowHeight, 90);
    let i = ceil(windowWidth/truckSuperposition);
    while(truckSuperposition*i>=0){             
      t.transform(truckScale, truckSuperposition*i,windowHeight-13, 90);
      t.plot();
      i--;
    }

    branchY=[];
    branchYy=[];
    branchYyAdj=[50,60,58,65,63,70,68];
    branchX=[];
    branchXMirrored=[];
    anglesForLeaves=[];
    anglesForLeavesMirrored=[];

    for(let i=1;i<=7;i++){
      branchX.push(windowWidth/2+i*windowHeight/20); 
      branchXMirrored.push(windowWidth/2-i*windowHeight/20+5); 
    }
    for(let i=0;i<12;i++){
      branchYy=[];
      for(let j=0;j<7;j++){
        branchYy.push(windowHeight-i*windowHeight/15-branchYyAdj[j]);
      }
      branchY.push(branchYy);
    }


    //draw the leaves using the chords in ChordsPlayed
    if(chordsPlayed.length>0){
      mapChordsToLeaves();
      stroke(colorBranch);
      let initialAdj=5;
      let maxForBranchKey=maxtonal;
      let maxForBranchMode;
      if(maxForBranchKey<12) maxForBranchKey+=1;
      if(maxForBranchKey==0) maxForBranchKey=1;
      for(let i=0;i<maxForBranchKey;i++){
        if(i%2==0) initialAdj=5;
        else initialAdj=-5;
        let x=windowWidth/2+3;
        let y=branchY[i][0]+initialAdj;
        k=0;
        maxForBranchMode=maxmode[i];
        for(let j=0;j<maxForBranchMode;j++){
          line(x,y,branchX[j],branchY[i][k]);
          x=branchX[j];
          y=branchY[i][k];
          k++;
        }
        x=windowWidth/2+2;
        y=branchY[i][0]+initialAdj;
        k=0;
        for(let j=0;j<maxForBranchMode;j++){
          line(x,y,branchXMirrored[j],branchY[i][k]);
          x=branchXMirrored[j];
          y=branchY[i][k];
          k++;
        }
      }

      //Draws the leaves
      for(let i=0;i<heightsForLeaves.length;i++){
        l3.transform(windowHeight/2500,widthsForLeaves[i],heightsForLeaves[i],anglesForLeaves[i]);
        l3.plot();
        l3.transform(windowHeight/2500,widthsForLeavesMirrored[i],heightsForLeaves[i],anglesForLeavesMirrored[i]);
        l3.plot();
      }
    }

    // Draws the central trunk of the plant.
    i=0;
    t1= new Trunk(scalePlantTrunk,windowWidth/2,windowHeight,0);
    if(maxtonal==0) truckLength=0;
    if(maxtonal>=4) truckLength=maxtonal-1;
    if(maxtonal>5) truckLength=6;
    if(maxtonal==11) truckLength=7;
    while(i<=truckLength){
      
      t1.transform(scalePlantTrunk,windowWidth/2,windowHeight-truckPlantSuperposition*i,0);
      t1.plot();
      i++;
    }
  }
}

/**
 * This function updates the model in such a way to have the positions of all the leaves to draw.
 */
function mapChordsToLeaves(){
  let len=chordsPlayedNoDup.length;
  heightsForLeaves=[];
  widthsForLeaves=[];
  widthsForLeavesMirrored=[];
  anglesForLeaves=[];
  anglesForLeavesMirrored=[];
  for(let i=0;i<len;i++){
    let idxKeyChordsNoDup=circleOfFifthForKey.indexOf(chordsPlayedNoDup[i].tonal);
    let idxModeChordsNoDup=circleOfFifthForMode.indexOf(chordsPlayedNoDup[i].mode);
    idxKeyChordsNoDup*=2;
    if(idxKeyChordsNoDup>11) idxKeyChordsNoDup=24-idxKeyChordsNoDup-1;
    if(idxModeChordsNoDup==6) idxModeChordsNoDup=-1;
    heightsForLeaves.push(windowHeight-idxKeyChordsNoDup*windowHeight/15-branchYyAdj[idxModeChordsNoDup+1]);
    widthsForLeaves.push(windowWidth/2+(idxModeChordsNoDup+2)*windowHeight/20);
    widthsForLeavesMirrored.push(windowWidth/2-(idxModeChordsNoDup+2)*windowHeight/20+5);
    anglesForLeaves.push(angles[idxModeChordsNoDup+1]);
    anglesForLeavesMirrored.push(anglesMirrored[idxModeChordsNoDup+1]);
  }
}

/**
 * This function takes the arraylist and builds a new one without duplicates.
 * @param {ArrayList} list the list with duplicates.
 * @return the version of the arraylist without duplicates.
 */
function unique(list){
  let len1=list.length;
  let newList=[];
  let same=false;
  newList.push(list[0]);
  for(let i=0;i<len1;i++){
    same=false;
    for(let j=0;j<newList.length;j++){
      if(list[i].equals(newList[j])){
        same=true;
      }
    }
    if(same==false){
      newList.push(list[i]);
    } 
  }
  return newList;
}

/**
 * This function is used to show the synth and the regulation of other sound parameter.
 */
function showSynth(){
  if(onOff==0){
    document.querySelectorAll(".container-synth")[0].classList.remove("container-synth-closing");
    document.querySelectorAll(".container-synth")[0].style.display="block";
    var interv=setInterval(function(){window.scrollTo(0,document.body.scrollHeight)},15);
    setTimeout(function(){clearInterval(interv);onOff=1;},500);
    
  }
  if(onOff==1){
    document.querySelectorAll(".container-synth")[0].classList.add("container-synth-closing");
    onOff=0;
  }
}



document.querySelectorAll(".initial-button")[0].onclick=showKeys;
document.querySelectorAll(".button-synth")[0].onclick=showSynth;
