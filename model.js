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
var chordsPlayedNoDup=[];
const keys = "q2we4r5ty7u8i9opazsxcfvgbhnmk";
var notes=[];
var duration=4;
var selectedPreset=_tone_0000_Aspirin_sf2_file; 
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var player=new WebAudioFontPlayer();
var firstTime=true;
var firstTimeMidi=true;
var instrumentSynth=true;
var midiKeyboard=false;
var keyModeSpaceOn=false;
var namesong="Artist - Title";
var midi=0, data=0, note=0, dataMidi=0;
var openingFile=false;
var comparingSongs=false;
var songs=[];
var songsname=[];
var finalScores=[0,0];
var pos = 0;
var ranY = 150;

let name_key = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
let labelsForKeyModeSpace= ["C","F", "G", "A#", "D", "D#", "A", "G#", "E", "C#", "B", "F#"];
let freq_key = ["440", "466", "494", "523", "554", "587", "622", "659", "698", "740", "784", "831"];
let position_x_keyButton = ["3vw","7.5vw","14vw","18vw","25vw","32vw","37.5vw","44vw","50vw","56vw","61.5vw","67vw"];
let position_y_keyButton = ["16.5vh","22vh","16vh","29vh","33vh","24vh","34.5vh","26vh","31vh","20vh","30.5vh","20.5vh"];
    

let angle=0;
let scale=1;
let truckLength=1;
let truckScale=0.3;
let truckSuperposition=(920-196)*truckScale;
let scalePlantTrunk=1;
let truckPlantSuperposition=1;
let colorBranch;
let branchY=[];
let branchX=[];
let arrayForSpecialChords=[2,7,9,4,5];
let angles=[50,130,50,130,50,130,90,110,0,90,70,90,110,90,70,50];
let anglesMirrored=[];
let anglesForLeaves=[];
let anglesForLeavesMirrored=[];
let moving=[];
let rotationLeaves=[];
let onOff=0;
let l3;
let windowHeightMod=0;

let position_x;
let position_y;
let pos_angle ;
let a=0;

let posTrunkOpeningx=[0, 0.015,0.2,0.27,0.325];
let posTrunkOpeningy=[0, 0.0125,0.012,-0.01,0.002];


//Roots
     var xRoots = [816,785,764,726,697,664,700,729,761,737,709,737,724,704,729,744,767,790,795,777,
                   767,751,771,775,772,779,777,780,800,804,824,830,833,835,855,873,860,837,827,809,
                   814,846,867,882,905,885,872,901,871,849,873,899,933,901,870,839];
     var yRoots = [580,579,589,589,602,607,606,592,593,615,630,621,649,672,651,620,595,582,582,604,
                   634,661,636,660,701,671,630,606,582,582,605,635,670,636,659,689,657,632,603,582,
                   582,597,622,653,675,649,620,632,614,593,592,605,605,600,587,587];


                   
// Synth initialization

// var delayknob = document.getElementById("delay");
// var reverbknob = document.getElementById("reverb");
// var cutoffknob = document.getElementById("cutofffreq");
// var resonanceknob = document.getElementById("resonance");
// var gainknob = document.getElementById("gain");
// gainknob.value = 70;
// var lpf = document.getElementById("lowpass");
// var bpf = document.getElementById("bandpass");
// var hpf = document.getElementById("highpass");
// var minDelay = 4;
// var maxDelay = 20;
// var maxFreq = 10000;
// var minFreq = 150;
// var minRes = Math.exp(0);
// var maxRes = 10;
// var minRev = Math.exp(0);
// var maxRev = 5;
// var gain = gainknob.value/100;
// var filterType = document.querySelector(".filter_type:checked").id;
// var rolloff = -24;
// var env;
// var delayTime = 4 + ((delayknob.value*36)/100) + "n";
// var decay = 0.00001 + ((reverbknob.value*5)/100);
// var feedback = 0.7;
// var cutoffFreq = minFreq + ((cutoffknob.value*(maxFreq-minFreq))/100);
// var resonance = 0 + ((resonanceknob.value*30)/100);
// var feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback);
// var reverb = new Tone.Reverb(decay);
// var filter = new Tone.Filter(100, filterType);
// var outputGain = new Tone.Gain(gain);
// //var synth = new Tone.Synth();
// var psynth = new Tone.PolySynth(Tone.Synth);
// var A = parseFloat(document.getElementById("envelopeAttack").value);
// var D = parseFloat(document.getElementById("envelopeDecay").value);
// var S = parseFloat(document.getElementById("envelopeSustain").value);
// var R = parseFloat(document.getElementById("envelopeRelease").value);