/**
 * @class Represent the object "Chord"
 * @param {Integer} tonal Tonal note of the chord, the number represent its frequency. 
 * @param {String} chordType Chord type is "a" for major chord "b" for minor.
 */
function Chord(tonal, chordType) {
	this.tonal=tonal;
	this.chordType = chordType;
}

const keys = "awsedftgyhujkolp";
/**
 * Recognize major and minor chords.
 * @param {Double} notes List of the pitches of the notes played.
 */
function typeChord(notes){
	var distance=' ';
	var type=' ';
	notes.sort();

	//TODO:accordi con note in un ottava diversa da quella delle altre note non sono riconosciuti

	for(var i=0;i<notes.length-1;i++){
		var temp=Math.round(12*(Math.log2(notes[i+1]/440)-Math.log2(notes[i]/440)));
		distance=distance+temp.toString()+' ';
	}
	if(distance==' 4 3 4 '||distance==' 3 4 1 '||distance==' 4 1 4 '||distance==' 1 4 3 '){
		type='a';
		console.log("maggiore");
	}
	if(distance==' 3 4 3 '||distance==' 4 3 2 '||distance==' 3 2 3 '||distance==' 2 3 4 '){
		type='b';
        console.log("minore");
	}
    if(distance==' 4 3 3 '||distance==' 3 3 2 '||distance==' 3 2 4 '||distance==' 2 4 3 '){
        type='c';
        console.log("dominante");
    }
    if(distance==' 3 3 4 '||distance==' 3 4 2 '||distance==' 4 2 3 '||distance==' 2 3 3 '){
        type='d';
        console.log("diminuito");
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
