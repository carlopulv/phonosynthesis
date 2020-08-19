/**
 * @class Represent the object "Chord"
 * @param {Integer} tonal Tonal note of the chord, the number represent its frequency. 
 * @param {String} chordType Chord type is "a" for major chord "b" for minor.
 */
function Chord(tonal, chordType) {
	this.tonal=tonal;
	this.chordType = chordType;
}

/**
 * Transform a buffer ia a string.
 * @param {Chord[]} buffer Array of Chords
 * @returns a string with the distance between the Chords of the progression and the type ok Chord like: "0a3b5a0b", a means major chord, b mean minor chord. 
 */
function BufferToString(buffer){
	tempArrayDistance=new Array();
	tempArrayDistance.push(0);
	negativeDistance=0;
	var bufferString='';
	//bufferString+=buffer[0].chordType;
	for(var i=0; i<buffer.length-1;i++){
		distanceChordsInSequence=Math.round(12*(Math.log2(buffer[i+1].tonal/440)-Math.log2(buffer[0].tonal/440)));
		tempArrayDistance.push(distanceChordsInSequence);
		if(distanceChordsInSequence<negativeDistance){
			negativeDistance=distanceChordsInSequence;
		} 
		//bufferString+=distanceChordsInSequence.toString();
		//bufferString+=buffer[i+1].chordType;
	}
	if(negativeDistance!=0){
		for(var i=0;i<tempArrayDistance.length;i++){
			tempArrayDistance[i]-=negativeDistance;
		}
		bufferString="";
	}
	for(var i=0; i<buffer.length;i++){
		bufferString+=tempArrayDistance[i].toString();
		bufferString+=buffer[i].chordType;
	}
	console.log(bufferString);
	return bufferString;
}

//The buffer contains only four chords per time.
var buffer= new Array();

const keys = "awsedftgyhujkolp";

//Progression contains the list of the common progressions and the ones the user will play.
var progressions=new Array();
//Contains the occurrences of the progressions.
var occurrences=new Array();

var probabilities=new Array();

//Initial set of progressions.
c1=new Chord(440, "a");
initialBuffer=[c1,c1,c1,c1];
var initialBufferString=BufferToString(initialBuffer);
progressions.push(initialBufferString);
occurrences.push(1);
var totalOccurrences=1;
updateProbabilities();

function updateProbabilities(){
	probabilities=[];
	for(var i=0; i<occurrences.length;i++){
		probabilities.push(occurrences[i]/totalOccurrences);
	}
}

/**
 * It looks for the progression saved in the buffer in the "progressions" variable.
 * @param {Chord[]} buffer list of last four chords played.
 * @return true if the progression is already saved, false if it doesn't.
 */
function findProgression(bufferStr){
	console.log(progressions)
	var i=0;
	for (i=0; i<progressions.length;i++){
		if(progressions[i]==bufferStr){
			occurrences[i]++;
			buffer=[];
			return true;
		}
	}
	return false;
}

/**
 * Recognize major and minor chords.
 * @param {Double} notes List of the pitches of the notes played.
 */
function typeChord(notes){
	var distance=' ';
	var type=' ';
	notes.sort();

	//TODO:rivolti e ottave devono essere riconosciuti

	for(var i=0;i<notes.length-1;i++){
		var temp=Math.round(12*(Math.log2(notes[i+1]/440)-Math.log2(notes[i]/440)));
		distance=distance+temp.toString()+' ';
	}
	if(distance==' 4 3 '){
		type='a';
	}
	if(distance==' 3 4 '){
		type='b';
	}
	if(buffer.length==4){
		buffer.shift();
	}
	buffer.push(new Chord(Math.round(notes[0]), type));

	//The progression is checked when the user plays al least four chords.
	if(buffer.length==4){
		bufferStr=BufferToString(buffer);
		var progressionFound=findProgression(bufferStr);

		if(progressionFound){
			console.log("la progressione esiste già");
		}
		else{
			console.log("nuova progressione");
			progressions.push(bufferStr);
			occurrences.push(1);
			buffer=[];
		}
		totalOccurrences++;
		updateProbabilities();
		console.log(probabilities);
	}	
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
    if(notes.length>=3){
        typeChord(notes);
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
