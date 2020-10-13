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

    
    
    var feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback);
    var reverb = new Tone.Reverb(decay);
    var filter = new Tone.Filter(100, "lowpass");   
    const synth = new Tone.Synth();


    function on(){
    Tone.context.resume();

    filter.dispose();
    feedbackDelay.dispose();
    reverb.dispose();

    feedbackDelay = new Tone.FeedbackDelay(delayTime, feedback);
    reverb = new Tone.Reverb(decay);
    filter = new Tone.Filter(cutoffFreq, "lowpass");
    
    synth.connect(Tone.Destination.chain(filter,feedbackDelay,reverb));
    synth.oscillator.type = "sine";
    synth.triggerAttackRelease("C6", "10n");
}












