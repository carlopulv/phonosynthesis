 var audio = document.getElementById('audio');
 var sound_flag = 0;

 function musika(){
  // var ac = new AudioContext(); provare a fare con web api
  // var g = ac.createGain();
  // .connect(g);
  // g.connect(ac.destination);
  // g.gain.value=0;
  // g.gain.setValueAtTime(0 , ac.currentTime);
  // g.gain.linearRampToValueAtTime(G , ac.currentTime + A);

    if(document.getElementById("music_box").checked){
      audio.volume = 0.4;
      audio.play();
      sound_flag = 1;
     }
     else{
      sound_flag = 0;
      audio.volume = 0;
     }
  }

 function decreaseBackgroundMusic(){
  if(sound_flag == 1){
    sound_flag = 0;
    decrease = setInterval(function(){
      audio.volume = audio.volume - 0.05;
      console.log(audio.volume);
      if(audio.volume < 0.005){
        clearInterval(decrease);
        audio.volume = 0;
      }
      }, 200);
    }
 }
 
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





var filterType = document.querySelector(".filter_type:checked").id;
var cutoffFreq;
var rolloff = -24;
var resonance;
var delayTime;
var feedback = 0.7;
var decay;
var tremoloDepth = 0.75;
var tremoloFreq;
var gain = gainknob.value/100;
var psynth = new Tone.PolySynth(Tone.Synth);

function init(){
  A = parseFloat(document.getElementById("envelopeAttack").defaultValue);
  D = parseFloat(document.getElementById("envelopeDecay").defaultValue);
  S = parseFloat(document.getElementById("envelopeSustain").defaultValue);
  R = parseFloat(document.getElementById("envelopeRelease").defaultValue);

  document.getElementById("envelopeAttack").value = A;
  document.getElementById("envelopeDecay").value = D;
  document.getElementById("envelopeSustain").value = S;
  document.getElementById("envelopeRelease").value = R;
  clearCanvas();
  drawLines();
  createAmpEnvelope();

  document.getElementById("sine").checked = document.getElementById("sine").defaultChecked;
  document.getElementById("square").checked = document.getElementById("square").defaultChecked;
  document.getElementById("triangle").checked = document.getElementById("triangle").defaultChecked;
  modifyOscillatorType();

  document.getElementById("lowpass").checked = document.getElementById("lowpass").defaultChecked;
  document.getElementById("bandpass").checked = document.getElementById("bandpass").defaultChecked;
  document.getElementById("highpass").checked = document.getElementById("highpass").defaultChecked;
  updateFilterType();

  document.getElementById("delayLed").checked = document.getElementById("delayLed").defaultChecked;
  document.getElementById("reverbLed").checked = document.getElementById("delayLed").defaultChecked;
  document.getElementById("tremoloLed").checked = document.getElementById("delayLed").defaultChecked;

  document.getElementById("cutofffreq").value = 50;
  document.getElementById("resonance").value = 50;
  document.getElementById("delay").value = 50;
  document.getElementById("reverb").value = 50;
  document.getElementById("tremolo").value = 50;
  document.getElementById("gain").value = 75;

}

function envelopeModifier(){
  A = parseFloat(document.getElementById("envelopeAttack").value);
  D = parseFloat(document.getElementById("envelopeDecay").value);
  S = parseFloat(document.getElementById("envelopeSustain").value);
  R = parseFloat(document.getElementById("envelopeRelease").value);

  clearCanvas();
  drawLines();
  createAmpEnvelope();
}

function modifyOscillatorType(){
   /*psynth.set({
     "oscillator" : {
       "type" : document.querySelector(".osc:checked").id
     }
   });*/
   psynth.options.oscillator.type = document.querySelector(".osc:checked").id;
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
  // createFilter();
  filter.type = filterType;
  // psynth.chain(filter, feedbackDelay, reverb, tremolo, outputGain, Tone.Destination);
}

function modifyCutoffFreq(){
  var minFreq = 150;
  var maxFreq = 10000;  

  minv = Math.log(minFreq);
  maxv = Math.log(maxFreq);
  minp = cutoffknob.min;
  maxp = cutoffknob.max;
  scale = ((maxv - minv)/(maxp - minp));
  cutoffFreq = Math.exp(minv + scale*(cutoffknob.value - minp));
  // createFilter();
  filter.frequency.value = cutoffFreq;
  // psynth.chain(filter, feedbackDelay, reverb, tremolo, outputGain, Tone.Destination);
}

function modifyResonance(){
  var minRes = Math.exp(0);
  var maxRes = 10;

  minv = Math.log(minRes);
  maxv = Math.log(maxRes);
  minp = resonanceknob.min;
  maxp = resonanceknob.max;
  scale = ((maxv - minv)/(maxp - minp));
  resonance = Math.round(Math.exp(minv + scale*(resonanceknob.value - minp)));
  // createFilter();
  filter.Q.value = resonance;
  // psynth.chain(filter, feedbackDelay, reverb, tremolo, outputGain, Tone.Destination);
}

function modifyDelayTime(){
  var minDelay = 4;
  var maxDelay = 20;

  minv = Math.log(minDelay);
  maxv = Math.log(maxDelay);
  minp = delayknob.min;
  maxp = delayknob.max;
  scale = ((maxv - minv)/(maxp - minp));
  delayTime = Math.round(Math.exp(minv + scale*(delayknob.value - minp))) + "n";
  // createDelay();
  feedbackDelay.delayTime.value = delayTime;
  toggleDelay();
  // psynth.chain(filter, feedbackDelay, reverb, tremolo, outputGain, Tone.Destination);
}

function modifyReverbDecay(){
  var minRev = Math.exp(0);
  var maxRev = 8;

  minv = Math.log(minRev);
  maxv = Math.log(maxRev);
  minp = reverbknob.min;
  maxp = reverbknob.max;
  scale = ((maxv - minv)/(maxp - minp));
  decay = Math.round(Math.exp(minv + scale*(reverbknob.value - minp)));
  // createReverb();
  reverb.decay = decay;
  toggleReverb();
  // psynth.chain(filter, feedbackDelay, reverb, tremolo, outputGain, Tone.Destination);
}

function modifyTremoloFreq(){
  var minTrem = 0.5;
  var maxTrem = 10;

  minv = Math.log(minTrem);
  maxv = Math.log(maxTrem);
  minp = tremoloknob.min;
  maxp = tremoloknob.max;
  scale = ((maxv - minv)/(maxp - minp));
  tremoloFreq = Math.exp(minv + scale*(tremoloknob.value - minp));
  // createTremolo();
  tremolo.frequency.value = tremoloFreq;
  toggleTremolo();
}

function modifyGain(){
  gain = 20*Math.log10(gainknob.value/1000);
  // createGain();
  outputGain.volume.value = gain;
  // psynth.chain(filter, feedbackDelay, reverb, tremolo, outputGain, Tone.Destination);
}

function initializeEffects(){
  filter = new Tone.Filter(cutoffFreq, filterType, rolloff);
  feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback);
  reverb = new Tone.Reverb(decay);
  tremolo = new Tone.Tremolo(tremoloFreq, tremoloDepth);
  outputGain = new Tone.Volume(gain);
}


function initializeModifiers(){
  modifyOscillatorType();
  updateFilterType();
  modifyCutoffFreq();
  modifyDelayTime();
  modifyResonance();
  modifyReverbDecay();
  modifyTremoloFreq();
  modifyGain();
  }

// initializeEffects();
// initializeModifiers();



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

function disposeEffects(){
  filter.dispose();
  feedbackDelay.dispose();
  reverb.dispose();
  outputGain.dispose();
}

function createFilter(){
  filter.dispose();
  filter = new Tone.Filter(cutoffFreq, filterType, rolloff);
}
function createDelay(){
  feedbackDelay.dispose();
  feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback);
}
function createReverb(){
  reverb.dispose();
  reverb = new Tone.Reverb(decay);
}
function createTremolo(){
  tremolo.dispose();
  tremolo = new Tone.Tremolo(tremoloFreq, tremoloDepth).start();
}

function createGain(){
  outputGain.dispose();
  outputGain = new Tone.Volume(gain);
}

function toggleDelay(){
  if(document.getElementById("delayLed").checked == true){
    feedbackDelay.wet.value = delayknob.value/100;
  }
  else{
    feedbackDelay.wet.value = 0;
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
    tremolo.wet.value = 1;
  }
  else{
    tremolo.wet.value = 0;
  }
}

function on(){
  if(firstTime){
    initializeEffects();
    firstTime=false;
  }

  // Tone.context.resume();
  Tone.start();

  initializeEffects();
  modifyOscillatorType();
  updateFilterType();
  createAmpEnvelope();
  createFilter();
  createTremolo();
  createDelay();
  createReverb();
  toggleDelay();
  toggleTremolo();
  toggleReverb();
  createGain();
  
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


// function playKey(pitch){
//   if(document.getElementById("piano").checked){
//   player.queueWaveTable(audioContext, audioContext.destination, piano, 0, pitch, 0.75);
//   }
//   else if(document.getElementById("e-piano").checked){
//     player.queueWaveTable(audioContext, audioContext.destination, elpiano, 0, pitch, 0.75);
//     }
//   else if(document.getElementById("guitar").checked){
//     player.queueWaveTable(audioContext, audioContext.destination, guitar, 0, pitch, 0.75);
//     }
//   }

var piano =  _tone_0000_Aspirin_sf2_file;
var elpiano = _tone_0051_FluidR3_GM_sf2_file;
var guitar = _tone_0270_JCLive_sf2_file;

var instVolume = gainknob.value/100;

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
  on();
  Tone.start();
  if(midiKeyboard==false){
    document.body.onkeydown = function(e){
      if(psynth._voices.length>4) psynth._voices.shift();
      duration=3;
      if(e.repeat) return;
      var position = keys.indexOf(e.key);
      if(position>=0){
        var pitch = pitchFromKey(position);
        midiPitch=Math.log2((Math.pow(pitch / 261.63,12) * Math.pow(2,60))) / Math.log2(2);
        notes.push(pitch);
        if(!instrumentSynth){
          if(document.getElementById("piano").checked){
            player.queueWaveTable(audioContext, audioContext.destination, piano, 0, midiPitch, duration, instVolume);
          }
        else if(document.getElementById("e-piano").checked){
            player.queueWaveTable(audioContext, audioContext.destination, elpiano, 0, midiPitch, duration, instVolume);
          }
        else if(document.getElementById("guitar").checked){
            player.queueWaveTable(audioContext, audioContext.destination, guitar, 0, midiPitch, duration, instVolume);
          }
        }
        else{
        //if(notes.length == 1) on();
        psynth.chain(filter, feedbackDelay, reverb, tremolo, outputGain, Tone.Destination);
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
  // on();
    /*document.body.onkeydown="none";
  document.body.onkeyup="none";*/
  if(midiKeyboard){
  //midion
  if(dataMidi[2]>0 && dataMidi[2] != 64 && dataMidi[0] == 144) {
    if(psynth._voices.length>6) psynth._voices.shift();
    duration=3;
    //if(dataMidi.repeat )return;
      var pitch = int(midiToFreq(dataMidi[1]));
      //console.log(dataMidi[1]);
      //midiPitch=Math.log2((Math.pow(pitch / 261.63,12) * Math.pow(2,60))) / Math.log2(2);
      midiPitch=dataMidi[1];
      notes.push(pitch);
      if(!instrumentSynth){
        if(document.getElementById("piano").checked){
          player.queueWaveTable(audioContext, audioContext.destination, piano, 0, midiPitch, duration, instVolume);
        }
      else if(document.getElementById("e-piano").checked){
          player.queueWaveTable(audioContext, audioContext.destination, elpiano, 0, midiPitch, duration, instVolume);
        }
      else if(document.getElementById("guitar").checked){
          player.queueWaveTable(audioContext, audioContext.destination, guitar, 0, midiPitch, duration, instVolume);
        }
      }
      else{
        //on();
        psynth.chain(filter, feedbackDelay, reverb, tremolo, outputGain, Tone.Destination);
        psynth.triggerAttackRelease(pitch, A+D+100);
      }
    }

  //midioff
  if(dataMidi[2]==0 || dataMidi[2] == 64 || dataMidi[0]==128){
    if(notes.length==4){
          typeChord(notes);
    }
    else if(notes.length==1){
      if(!instrumentSynth) player.cancelQueue(audioContext);
    }

    if(instrumentSynth){
        var pitch = int(midiToFreq(note));
        notes.pop();
        psynth.triggerRelease(pitch);
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
    disableKeyboard();
    // request MIDI access
    if(firstTimeMidi){
      if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess({
            sysex: false
          }).then(onMIDISuccess, onMIDIFailure);
        } else {
            alert("No MIDI support in your browser");
          }
    }
    firstTimeMidi=false;
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
  data = message.data;  //gives [command/channel, note, velocity] data
    if(data.length==3){
      dataMidi=data;
      note = dataMidi[1];
      startPlayMidi();
    }
    //console.log(data[0]);
}

function midiToFreq(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
}