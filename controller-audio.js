// const audio = document.getElementById('audio');
// function musika(){
//   console.log("ihih");
//   audio.play();
// }


var delayknob = document.getElementById("delay");
var reverbknob = document.getElementById("reverb");
var cutoffknob = document.getElementById("cutofffreq");
var resonanceknob = document.getElementById("resonance");
var gainknob = document.getElementById("gain");
var tremoloknob = document.getElementById("tremolo");

var lpf = document.getElementById("lowpass");
var bpf = document.getElementById("bandpass");
var hpf = document.getElementById("highpass");

var A = parseFloat(document.getElementById("envelopeAttack").value);
var D = parseFloat(document.getElementById("envelopeDecay").value);
var S = parseFloat(document.getElementById("envelopeSustain").value);
var R = parseFloat(document.getElementById("envelopeRelease").value);


var minDelay = 4;
var maxDelay = 20;

var minFreq = 150;
var maxFreq = 10000;

var minRes = Math.exp(0);
var maxRes = 10;

var minRev = Math.exp(0);
var maxRev = 8;

var minTrem = 0.5;
var maxTrem = 10;

// var treshold = -40;
// var ratio = 4;

var gain = gainknob.value/100;

var filterType = document.querySelector(".filter_type:checked").id;
var rolloff = -24;


var delayTime = 4 + ((delayknob.value*36)/100) + "n";
var decay = 0.00001 + ((reverbknob.value*5)/100);
var feedback = 0.7;
var cutoffFreq = minFreq + ((cutoffknob.value*(maxFreq-minFreq))/100);
var resonance = 0 + ((resonanceknob.value*30)/100);
var feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback);
var reverb = new Tone.Reverb(decay);
// var chorus = new Tone.Chorus(chorusFrequency, chorusDelayTime, depth);
var tremolo = new Tone.Tremolo(tremoloFreq, tremoloDepth);
var filter = new Tone.Filter(100, filterType);
var tremoloFreq = 10;
var tremoloDepth = 0.75;
// var compressor = new Tone.Compressor(treshold, ratio);
var outputGain = new Tone.Gain(gain);

var psynth = new Tone.PolySynth(Tone.Synth);



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
  minv = Math.log(minRev);
  maxv = Math.log(maxRev);
  minp = reverbknob.min;
  maxp = reverbknob.max;
  scale = ((maxv - minv)/(maxp - minp));
  decay = Math.round(Math.exp(minv + scale*(reverbknob.value - minp)));
}

function modifyTremoloFreq(){
  minv = Math.log(minTrem);
  maxv = Math.log(maxTrem);
  minp = tremoloknob.min;
  maxp = tremoloknob.max;
  scale = ((maxv - minv)/(maxp - minp));
  tremoloFreq = Math.exp(minv + scale*(tremoloknob.value - minp));
}

function modifyGain(){
  gain = 20*Math.log10(gainknob.value/1000);
}


function initializeEffects(){
  feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback);
  reverb = new Tone.Reverb(decay);
  filter = new Tone.Filter(cutoffFreq, filterType, rolloff);
  outputGain = new Tone.Gain(gain);
  // chorus = new Tone.Chorus(chorusFrequency, chorusDelayTime, depth);
  chorus = new Tone.Tremolo((tremoloFreq, tremoloDepth));
}

function createAmpEnvelope(){
  var curve = "linear"

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

function createTremolo(){
  tremolo.dispose();
  // chorus = new Tone.Chorus(chorusFrequency, chorusDelayTime, depth);
  //chorus = new Tone.Tremolo(9, 0.75).toDestination().start();
  tremolo = new Tone.Tremolo(tremoloFreq, tremoloDepth).start();
}

// function createCompressor(){
//   compressor.dispose();
//   compressor = new Tone.Compressor(treshold, ratio);
//   compressor.knee.value = 30;
//   compressor.attack.value = 0.03;
//   }

function createGain(){
  outputGain.dispose();
  outputGain = new Tone.Volume(gain);
}


// function toggleDelay(){
//   if(document.getElementById("delayLed").checked == true){
//     return;
//   }
//   else{
//     feedbackDelay.disconnect();
//   }
// }

// function toggleReverb(){
//   if(document.getElementById("reverbLed").checked == true){
//     psynth.connect(reverb);
//     reverb.toDestination();
//   }
//   else{
//       reverb.disconnect();
//   }
// }

// function toggleChorus(){
//   if(document.getElementById("chorusLed").checked == true){
//   chorus.toDestination();
//   psynth.connect(chorus);
// }
// else{
//     chorus.disconnect();
// }
// }

function toggleDelay(){
  if(document.getElementById("delayLed").checked == true){
    feedback = 0.7;
  }
  else{
    feedbackDelay.wet.value = 0;
    feedback = 0;
  }
}

function toggleReverb(){
  if(document.getElementById("reverbLed").checked == true){
    reverb.wet.value = reverbknob.value/100;
  }
  else{
      reverb.wet.value = 0;
  }
}

function toggleTremolo(){
  if(document.getElementById("tremoloLed").checked == true){
    return;
  }
else{
    tremolo.wet.value = 0;
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


function on(){
  if(firstTime){
    initializeEffects();
    firstTime=false;
  }

  Tone.context.resume();
  // Tone.start();

  createAmpEnvelope();
  createFilter();
  createTremolo();
  createDelay();
  createReverb();
  toggleDelay();
  toggleTremolo();
  toggleReverb();
  // createCompressor();
  createGain();


  psynth.chain(filter, feedbackDelay, reverb, tremolo, outputGain, Tone.Destination);

}



/**
 * This function is used to change from the instrument mode to the synth mode. The global variable instrumentSynth is false when we are using an instrument, true otherwise.
 */

function closeSynthShowInstruments(){
  document.querySelectorAll(".instruments_container")[0].style.display="inline-block";
    document.querySelectorAll(".instruments_container")[0].classList.remove("hide_instruments_container");
    document.querySelectorAll(".disable_synth_in")[0].style.display = "block";
    document.querySelectorAll(".disable_synth_in")[0].classList.remove("disable_synth_out");
    instrumentSynth = false;
}

function closeInstrumentsShowSynth(){
  //document.querySelectorAll(".instruments_container")[0].style.display="none";
  document.querySelectorAll(".instruments_container")[0].classList.add("hide_instruments_container");
  document.querySelectorAll(".disable_synth_in")[0].classList.add("disable_synth_out");
  instrumentSynth = true;
}

function toggleInstrumentSynth(){

  if(document.getElementById("instrument").checked){
    closeSynthShowInstruments();
  }
  else if(document.getElementById("synth").checked){
    closeInstrumentsShowSynth();
  }
}


var piano =  _tone_0000_Aspirin_sf2_file;
var elpiano = _tone_0051_FluidR3_GM_sf2_file;
var guitar = _tone_0270_JCLive_sf2_file;

function playKey(pitch){
  if(document.getElementById("piano").checked){
  player.queueWaveTable(audioContext, audioContext.destination, piano, 0, pitch, 0.75);
  }
  else if(document.getElementById("e-piano").checked){
    player.queueWaveTable(audioContext, audioContext.destination, elpiano, 0, pitch, 0.75);
    }
  else if(document.getElementById("guitar").checked){
    player.queueWaveTable(audioContext, audioContext.destination, guitar, 0, pitch, 0.75);
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
            player.queueWaveTable(audioContext, audioContext.destination, piano, 0, midiPitch, duration);
          }
        else if(document.getElementById("e-piano").checked){
            player.queueWaveTable(audioContext, audioContext.destination, elpiano, 0, midiPitch, duration);
          }
        else if(document.getElementById("guitar").checked){
            player.queueWaveTable(audioContext, audioContext.destination, guitar, 0, midiPitch, duration);
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
          player.queueWaveTable(audioContext, audioContext.destination, piano, 0, midiPitch, duration);
        }
      else if(document.getElementById("e-piano").checked){
          player.queueWaveTable(audioContext, audioContext.destination, elpiano, 0, midiPitch, duration);
        }
      else if(document.getElementById("guitar").checked){
          player.queueWaveTable(audioContext, audioContext.destination, guitar, 0, midiPitch, duration);
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
  }

}
// request MIDI access
  if (navigator.requestMIDIAccess) { //fare dentro funzione che si attiva quando clicca midi nel synth
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
    } else {
        alert("No MIDI support in your browser");
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
  data = message.data; // this gives us [command/channel, note, velocity] data.
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



