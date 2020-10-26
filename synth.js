// Linear Mapping: 
    //x :[A,B] --> y:[D,C] (final number:[final interval])
    //formula: y = C + (x-A)/(B-A)*(D-C);


// Exponential Mapping: 
    // minv = Math.log(min value); (min value we set - for ex 150 Hz for cutoff)
    // maxv = Math.log(max value); (max value we set - for ex 20000 Hz for cutoff)
    // minp = knob.min; (0 - miv value of the knob slider)
    // maxp = knob.max; (100 - max value of the knob slider)
    // scale = ((maxv - minv)/(maxp - minp));
    // final_number = Math.exp(minv + scale*(knob.value - minp));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

delayknob = document.getElementById("delay");
reverbknob = document.getElementById("reverb");
cutoffknob = document.getElementById("cutofffreq");
resonanceknob = document.getElementById("resonance");
gainknob = document.getElementById("gain");
lpf = document.getElementById("lowpass");
bpf = document.getElementById("bandpass");
hpf = document.getElementById("highpass");


// Starting Knob Values/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

gainknob.value = 70;

// Variables Initialization/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var minDelay = 4;
var maxDelay = 20;
var maxFreq = 10000;
var minFreq = 150;
var minRes = Math.exp(0);
var maxRes = 10;
var minRev = Math.exp(0);
var maxRev = 5;
var gain = gainknob.value/100;
var filterType = document.querySelector(".filter_type:checked").id;
var rolloff = -24;
var env;

var delayTime = 4 + ((delayknob.value*36)/100) + "n";
var decay = 0.00001 + ((reverbknob.value*5)/100);
var feedback = 0.7;
var cutoffFreq = minFreq + ((cutoffknob.value*(maxFreq-minFreq))/100);
var resonance = 0 + ((resonanceknob.value*30)/100);


//Knob Modifiers/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
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

    function modifyGain(){
        gain = gainknob.value/100;
    }

function initialize(){
    modifyCutoffFreq();
    modifyDelayTime();
    modifyResonance();
    modifyReverbDecay();
    modifyGain();
}

initialize();

//Tone Effects Declaration/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback);
var reverb = new Tone.Reverb(decay);
var filter = new Tone.Filter(100, filterType);
var outputGain = new Tone.Gain(gain);


//Synth/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  


//psynth = new Tone.PolySynth();

var synth = new Tone.Synth();



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//use switch???
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


function toggleDelay(){
    if(document.getElementById("delayLed").checked == true){
        return;
    }
    else{
        feedbackDelay.wet.value=0;
    }
}

function toggleReverb(){
    if(document.getElementById("reverbLed").checked == true){
        return;    
    }
    else{
        reverb.wet.value=0;
    }
}



function modifyOscillatorType(){
    synth.oscillator.type = document.querySelector(".oscillators:checked").id;
}


function createFilter(){
    filter.dispose();
    filter = new Tone.Filter(cutoffFreq, filterType, rolloff);
    filter.Q.value = resonance;
}

function createDelay(){
    feedbackDelay.dispose();
    feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback);
}

function createReverb(){
    reverb.dispose();
    reverb = new Tone.Reverb(decay);  

}

function createGain(){
    outputGain.dispose();
    outputGain = new Tone.Gain(gain);
}

    var A = parseFloat(document.getElementById("envelopeAttack").value);
    var D = parseFloat(document.getElementById("envelopeDecay").value);
    var S = parseFloat(document.getElementById("envelopeSustain").value);
    var R = parseFloat(document.getElementById("envelopeRelease").value);

function envelopeModifier(){
    A = parseFloat(document.getElementById("envelopeAttack").value);
    D = parseFloat(document.getElementById("envelopeDecay").value);
    S = parseFloat(document.getElementById("envelopeSustain").value);
    R = parseFloat(document.getElementById("envelopeRelease").value);

    clearCanvas();
    drawLines();
    drawCircles();
}


function createAmpEnvelope(){
       synth.envelope.attack = A;
       synth.envelope.decay = D;
       synth.envelope.sustain = S;
       synth.envelope.release = R; 
       synth.envelope.decayCurve = "linear";
       synth.envelope.releaseCurve = "linear";
}

// CANVAS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var envCanvas = document.getElementById("envelopeCanvas");
var ctx  = envCanvas.getContext("2d");

function envChange(Q){
    var envchange = Q*100;
    return envchange;
  }

  function drawLines(){ 
    ctx.lineWidth=  "0.5";
    ctx.strokeStyle = "grey";
    ctx.beginPath();
    ctx.moveTo(100,0);
    ctx.lineTo(100,150);
    ctx.moveTo(200,0);
    ctx.lineTo(200,150);
    ctx.stroke();
    
    ctx.lineWidth=  "1";
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(100,0);
    ctx.lineTo(100,7);
    ctx.moveTo(200,0);
    ctx.lineTo(200,7);
    ctx.moveTo(100,140);
    ctx.lineTo(100,150);
    ctx.moveTo(200,140);
    ctx.lineTo(200,150);
    ctx.stroke();

    ctx.lineWidth=  "2.5";
    ctx.strokeStyle = "white"; 
  
    ctx.beginPath();
    ctx.moveTo(0,150);
    ctx.lineTo(envChange(A),0);
    ctx.stroke();

    ctx.moveTo(envChange(A),0);
    ctx.lineTo((envChange(D) + envChange(A)) , (150 - 1.5 *envChange(S)));
    ctx.stroke();

    ctx.moveTo((envChange(D) + envChange(A)) , (150 - 1.5 *envChange(S)));
    ctx.lineTo((envChange(D) + envChange(A) + envChange(R)) , 150);
    ctx.stroke();
 
}

function drawCircles(){  
    ctx.beginPath(); 
    ctx.arc(envChange(A) , 0 , 2 , 0 , 2* Math.PI);
    ctx.fillStyle = "red";
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc((envChange(D) + envChange(A)) , (150 - 1.5 *envChange(S)) , 2 , 0 , 2* Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(envChange(D) + envChange(A) + envChange(R) , 150 , 2 , 0 , 2* Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();  
  }

drawLines();
drawCircles();

function clearCanvas(){
    ctx.clearRect(0, 0, 300, 150);
  }

// PLAY ///////////////////////////////////////////////////////////////////////////////////////////////////////////
function on(){
    Tone.context.resume();

    createFilter();
    createDelay();
    createReverb();
    createAmpEnvelope();
    createGain();
    toggleDelay();
    toggleReverb();
     
    
    // psynth.chain(filter, feedbackDelay, reverb, outputGain, waveform, Tone.Destination);
    // psynth.triggerAttackRelease(["C4","E4","G4","B4"], "20n");


    synth.chain(filter, feedbackDelay, reverb, outputGain, Tone.Destination);
  
    
    synth.triggerAttackRelease("C5",A+D);   
}









