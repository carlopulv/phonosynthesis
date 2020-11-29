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
var instrumentSynth=false;
var midiKeyboard=false;
var namesong="Artist - Title";
var midi=0, data=0, note=0, dataMidi=0;
var openingFile=false;
var comparingSongs=false;
var songs=[];
var songsname=[];



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

  //  var xRoots = [0,300,300,300];
  //  var yRoots = [150,140,150,150];


