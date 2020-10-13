//mapping: x :[A,B]    y:[D,C] (final number:[final interval])
// y = C + (x-A)/(B-A)*(D-C);


delayknob = document.getElementById("delay");
reverbknob = document.getElementById("reverb");
cutoffknob = document.getElementById("cutoffknob");

delayknob.value = 100;
reverbknob.value = 100;

var maxFreq = 20000;
var minFreq = 20;
var delayTime = (4 + (((delayknob.value)*36)/100)) + "n";
var feedback = 0.5;
var decay = 0.00001 +((reverbknob.value)*5)/100;
var cutoffFreq = minFreq + (cutoffknob.value*(maxFreq-minFreq))/100;


    function modifyDelayTime(){
        delayTime = (Math.round(4 + (((delayknob.value)*36)/100))) + "n";
    }

    function modifyReverbDecay(){
        decay = 0.0001 +((reverbknob.value)*5)/100;
    }

    function modifyCutoffFreq(){
        cutoffFreq = minFreq + (cutoffknob.value*(maxFreq-minFreq))/100;
     }

    
     const synth = new Tone.Synth().toDestination();
     var feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback).toDestination();
     var reverb = new Tone.Reverb(decay).toDestination();
     var filter = new Tone.Filter(cutoffFreq, "lowpass").toDestination();





    function on(){
    Tone.context.resume();

    filter.dispose();
    feedbackDelay.dispose();
    reverb.dispose();

    feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback).toDestination();
    reverb = new Tone.Reverb(decay).toDestination();
    filter = new Tone.Filter(cutoffFreq, "lowpass").toDestination();
  
    //Tone.Destination.chain(feedbackDelay,reverb);
    synth.oscillator.type = "sine";
    synth.triggerAttackRelease("C5", "10n");

    
}












