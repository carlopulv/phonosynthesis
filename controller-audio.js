
delayknob = document.getElementById("delay");
reverbknob = document.getElementById("reverb");
cutoffknob = document.getElementById("cutofffreq");
resonanceknob = document.getElementById("resonance");
gainknob = document.getElementById("gain");
chorusknob = document.getElementById("chorus");

lpf = document.getElementById("lowpass");
bpf = document.getElementById("bandpass");
hpf = document.getElementById("highpass");

gainknob.value = 70;

var minDelay = 4;
var maxDelay = 20;

var maxFreq = 10000;
var minFreq = 150;
var minRes = Math.exp(0);
var maxRes = 10;

var minRev = Math.exp(0);
var maxRev = 5;

var treshold = -40;
var ratio = 4;

var gain = gainknob.value/100;
var filterType = document.querySelector(".filter_type:checked").id;
var rolloff = -24;

var chorusFrequency = 100;
var chorusDelayTime = 5;
var depth = 1;

var delayTime = 4 + ((delayknob.value*36)/100) + "n";
var decay = 0.00001 + ((reverbknob.value*5)/100);
var feedback = 0.7;
var cutoffFreq = minFreq + ((cutoffknob.value*(maxFreq-minFreq))/100);
var resonance = 0 + ((resonanceknob.value*30)/100);
var feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback);
var reverb = new Tone.Reverb(decay);
// var chorus = new Tone.Chorus(chorusFrequency, chorusDelayTime, depth);
var chorus = new Tone.Tremolo(9, 0.75);
var filter = new Tone.Filter(100, filterType);
var compressor = new Tone.Compressor(treshold, ratio);
var outputGain = new Tone.Gain(gain);



var psynth = new Tone.PolySynth(Tone.Synth);

var A = parseFloat(document.getElementById("envelopeAttack").value);
var D = parseFloat(document.getElementById("envelopeDecay").value);
var S = parseFloat(document.getElementById("envelopeSustain").value);
var R = parseFloat(document.getElementById("envelopeRelease").value);



function modifyOscillatorType(){
  psynth.set({
    "oscillator" : {
      "type" : document.querySelector(".osc:checked").id
    }
  });
}

function envelopeModifier(){
  A = parseFloat(document.getElementById("envelopeAttack").value);
  D = parseFloat(document.getElementById("envelopeDecay").value);
  S = parseFloat(document.getElementById("envelopeSustain").value);
  R = parseFloat(document.getElementById("envelopeRelease").value);

  clearCanvas();
  drawLines();
}


function updateFilterType(){
  if(lpf.checked == true){
      filterType = "lowpass";
  }
  else if(bpf.checked == true){
      filterType = "bandpass";
  }
  else{
      filterType = "highpass";
  }
}

function modifyCutoffFreq(){
  //cutoffFreq = minFreq + ((cutoffknob.value*(maxFreq-minFreq))/100);
  minv = Math.log(minFreq);
  maxv = Math.log(maxFreq);
  minp = cutoffknob.min;
  maxp = cutoffknob.max;
  scale = ((maxv - minv)/(maxp - minp));
  cutoffFreq = Math.exp(minv + scale*(cutoffknob.value - minp));
}

function modifyResonance(){
  //resonance = 0 + ((resonanceknob.value*15)/100);
  minv = Math.log(minRes);
  maxv = Math.log(maxRes);
  minp = resonanceknob.min;
  maxp = resonanceknob.max;
  scale = ((maxv - minv)/(maxp - minp));
  resonance = Math.round(Math.exp(minv + scale*(resonanceknob.value - minp)));
}

function modifyDelayTime(){
  //delayTime = Math.round(4 + ((delayknob.value*36)/100)) + "n";
  minv = Math.log(minDelay);
  maxv = Math.log(maxDelay);
  minp = delayknob.min;
  maxp = delayknob.max;
  scale = ((maxv - minv)/(maxp - minp));
  delayTime = Math.round(Math.exp(minv + scale*(delayknob.value - minp))) + "n";
}

function modifyReverbDecay(){
  //decay = 0.0001 + ((reverbknob.value*5)/100);
  minv = Math.log(minRev);
  maxv = Math.log(maxRev);
  minp = reverbknob.min;
  maxp = reverbknob.max;
  scale = ((maxv - minv)/(maxp - minp));
  decay = Math.round(Math.exp(minv + scale*(reverbknob.value - minp)));
}



function modifyGain(){
  gain = gainknob.value/100;
}

function initializeEffects(){
  feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback);
  reverb = new Tone.Reverb(decay);
  filter = new Tone.Filter(cutoffFreq, filterType, rolloff);
  outputGain = new Tone.Gain(gain);
  // chorus = new Tone.Chorus(chorusFrequency, chorusDelayTime, depth);
  chorus = new Tone.Tremolo(9,0.75);
}

function createAmpEnvelope(){
  var curve = "exponential"

  psynth.set({
    envelope:{
      attack: A,
      decay: D,
      sustain: S,
      release: R,
      "attackCurve" : curve,
      "decayCurve" : curve,
      "releaseCurve" : curve
    }
  })
}

function createFilter(){
  filter.dispose();
  filter = new Tone.Filter(cutoffFreq, filterType, rolloff);
  filter.Q.value = resonance;
}

function createDelay(){
  feedbackDelay.dispose();
  // feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback).toDestination();
  feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback);
}

function createReverb(){
  reverb.dispose();
  // reverb = new Tone.Reverb(decay).toDestination();
  reverb = new Tone.Reverb(decay);
}

function createChorus(){
  chorus.dispose();
  // chorus = new Tone.Chorus(chorusFrequency, chorusDelayTime, depth);
  //chorus = new Tone.Tremolo(9, 0.75).toDestination().start();
  chorus = new Tone.Tremolo(9, 0.75).start();
}

function createCompressor(){
  compressor.dispose();
  compressor = new Tone.Compressor(treshold, ratio);
  compressor.knee.value = 30;
  compressor.attack.value = 0.03;
  }

function createGain(){
  outputGain.dispose();
  outputGain = new Tone.Gain(gain);
}




function toggleDelay(){
  if(document.getElementById("delayLed").checked == true){
    return;
  }
  else{
    feedbackDelay.disconnect();
  }
}
function toggleReverb(){
  if(document.getElementById("reverbLed").checked == true){
    psynth.connect(reverb);
    reverb.toDestination();
  }
  else{
      reverb.disconnect();
  }
}
function toggleChorus(){
  if(document.getElementById("chorusLed").checked == true){
  chorus.toDestination();
  psynth.connect(chorus);
}
else{
    chorus.disconnect();
}
}

function initialize(){
  modifyCutoffFreq();
  modifyDelayTime();
  modifyResonance();
  modifyReverbDecay();
  modifyGain();
  }

initialize();


var delayChannel = new Tone.Channel(-20).toDestination();
var channel = new Tone.Channel(-20);

function on(){
  if(firstTime){
    initializeEffects();
    firstTime=false;
  }

  Tone.context.resume();
  // Tone.start();

  createAmpEnvelope();
  createFilter();
  createChorus();
  createDelay();
  createReverb();
  // toggleDelay();
  // toggleChorus();
  // toggleReverb();
  createCompressor();
  createGain();


  //psynth.chain(filter, feedbackDelay, chorus, reverb, compressor, outputGain, Tone.Destination);


  
  psynth.toDestination();

}



function selectInstrument(){
  if(document.getElementById("instrument").checked == true){
    console.log("mbare");
    document.querySelectorAll(".instruments_container")[0].style.display="inline-block";

  }

  else{
    document.querySelectorAll(".instruments_container")[0].style.display="none";
  }

}






/**
 * This function is used to change from the instrument mode to the synth mode. The global variable instrumentSynth is false when we are using an instrument, true otherwise.
 */
function toggleInstrumentSynth(){
  selectInstrument();

  if(document.getElementById("instrument").checked){
    document.querySelectorAll(".disable_synth_in")[0].style.display = "block";
    document.querySelectorAll(".disable_synth_in")[0].classList.remove("disable_synth_out");
    instrumentSynth=false;
  }
  else if(document.getElementById("synth").checked){
    document.querySelectorAll(".disable_synth_in")[0].classList.add("disable_synth_out");
    instrumentSynth=true;
  }
}




function playKey(pitch){
  if(document.getElementById("piano").checked){
  player.queueWaveTable(audioContext, audioContext.destination, _tone_0000_Aspirin_sf2_file, 0, pitch, 0.75);
  }
  else if(document.getElementById("e-piano").checked){
    player.queueWaveTable(audioContext, audioContext.destination, _tone_0040_GeneralUserGS_sf2_file, 0, pitch, 0.75);
    }
  else if(document.getElementById("guitar").checked){
    player.queueWaveTable(audioContext, audioContext.destination, _tone_0240_FluidR3_GM_sf2_file, 0, pitch, 0.75);
    }
  }

function resume_context(){
    c.resume();
}

function pitchFromKey(position){
  if(position>=0){
    return pitch = Math.round(440*Math.pow(2, position/12));
  }
}

function disableKeyboard(){
  document.body.onkeydown="none";
  document.body.onkeyup="none";
  document.body.onkeydown=function(e){
    if(e.key=="Enter"){
      e.preventDefault();
    }
  }
}

/**
 * This function activates the keyboard input.
 */

function startPlayKeyboard(){
  if(midiKeyboard==false){
    document.body.onkeydown = function(e){
      duration=3;
      if(e.repeat) return;
      var position = keys.indexOf(e.key);
      if(position>=0){
        var pitch = pitchFromKey(position);
        midiPitch=Math.log2((Math.pow(pitch / 261.63,12) * Math.pow(2,60))) / Math.log2(2);
        notes.push(pitch);
        if(!instrumentSynth){
          if(document.getElementById("piano").checked){
            player.queueWaveTable(audioContext, audioContext.destination, _tone_0000_Aspirin_sf2_file, 0, midiPitch, duration);
          }
        else if(document.getElementById("e-piano").checked){
            player.queueWaveTable(audioContext, audioContext.destination, _tone_0040_GeneralUserGS_sf2_file, 0, midiPitch, duration);
          }
        else if(document.getElementById("guitar").checked){
            player.queueWaveTable(audioContext, audioContext.destination, _tone_0240_FluidR3_GM_sf2_file, 0, midiPitch, duration);
          }
        }
        else{
        if(notes.length == 1) on();
        psynth.triggerAttackRelease(pitch, A+D+100);
        }
      }
    }

  document.body.onkeyup = function(e){
    if(notes.length==4){
      typeChord(notes);
    }
    else if(notes.length==1){
      if(!instrumentSynth) player.cancelQueue(audioContext);
    }
    if(instrumentSynth){
      var position=keys.indexOf(e.key);
      if(position>=0){
        var pitch = pitchFromKey(position);
        psynth.triggerRelease(pitch);
        notes.pop();
        //on();
      }
    }
    else{
      notes.pop();
    }
  }
  }
}

/**
 * This function activate the midi input.
 */
function startPlayMidi(){
  /*document.body.onkeydown="none";
  document.body.onkeyup="none";*/
  if(midiKeyboard){
  //midion
  if(dataMidi[2]>0 && dataMidi[2] != 64) {
    duration=3;
    //if(data[2].repeat)return;
      var pitch = midiToFreq(dataMidi[1]);
      console.log(dataMidi[1]);
      midiPitch=Math.log2((Math.pow(pitch / 261.63,12) * Math.pow(2,60))) / Math.log2(2);
      notes.push(pitch);
      if(!instrumentSynth){
        if(document.getElementById("piano").checked){
          player.queueWaveTable(audioContext, audioContext.destination, _tone_0000_Aspirin_sf2_file, 0, midiPitch, duration);
        }
      else if(document.getElementById("e-piano").checked){
          player.queueWaveTable(audioContext, audioContext.destination, _tone_0040_GeneralUserGS_sf2_file, 0, midiPitch, duration);
        }
      else if(document.getElementById("guitar").checked){
          player.queueWaveTable(audioContext, audioContext.destination, _tone_0240_FluidR3_GM_sf2_file, 0, midiPitch, duration);
        }
      }
      else{
        if(notes.length == 1) on();
        psynth.triggerAttackRelease(pitch, A+D+100);
      }
    }

  //midioff
  if(dataMidi[2]==0 || dataMidi[2] == 64){
    if(notes.length==4){
          typeChord(notes);
    }
    else if(notes.length==1){
      if(!instrumentSynth) player.cancelQueue(audioContext);
    }
    if(instrumentSynth){
        var pitch = midiToFreq(note);
        psynth.triggerRelease(pitch);
        notes.pop();
        //on();
    }
    else{
      notes.pop();
    }
  }
}
}


//MIDI

/**
 * This function is used to change from midi input to keyboard input and viceversa. The global variable midiKeyboard is false when the input is taken from the keyboard, true viceversa.
 */
function toggleMidiKeyboard(){
  if(document.getElementById("keyboard").checked){
    midiKeyboard=false;
    startPlayKeyboard();
  }
  else if(document.getElementById("midi").checked){
    midiKeyboard=true;
    firstTimeMidi=false;
    disableKeyboard();
    // request MIDI access
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
      }).then(onMIDISuccess, onMIDIFailure);
    } else {
        alert("No MIDI support in your browser");
      }
  }   
}

// midi functions
function onMIDISuccess(midiAccess) {
    console.log('MIDI Access Object', midiAccess);
    midi = midiAccess; //MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(error) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API" + error);
}

function onMIDIMessage(message) {
  data = message.data;  //gives [command/channel, note, velocity] data.
    if(data.length==3){
      dataMidi=data;
      note = dataMidi[1];
      startPlayMidi();
    }
    //console.log(data);
}

function midiToFreq(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
}