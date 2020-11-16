/**
 * Get the key selected from the user before starting playing.
 */
function getKey(){
    generalKey=this.value;
    game_state=1;
    keys_list.style.display = "none";
    document.querySelectorAll(".initial-button")[1].style.display = "none";
    document.querySelectorAll(".initial-button")[2].style.display = "none";
    document.querySelectorAll(".initial-button")[3].style.display = "none";
    startPlayKeyboard();
  }
  
  /**
   * Compares integer numbers.
   * @param {Integer} a first factor
   * @param {Integer} b second factor
   */
  function compareNumbers(a, b) {
    return a - b;
  }
  
  /**
   * Recognize chords. 
   * It fills the array chordsPlayed with objects of type Chord.
   * @param {Double} notes List of the pitches of the notes played in frequency.
   */
  function typeChord(notes){
    var distance=' ';
    var type=' ';
    var distForModeRecog=[];
    var tempnotes=[];
    notes.sort(compareNumbers);
    tempnotes.push(notes[0],notes[1],notes[2],notes[3]);
    listnotes.push(tempnotes);
    var adj=0;
    var oldChordsPlayedLength=chordsPlayed.length;
  
      for(var i=0;i<notes.length;i++){
      if(i<notes.length-1){
        var temp=Math.round(12*(Math.log2(notes[i+1]/440)-Math.log2(notes[i]/440)));
        distance=distance+temp.toString()+' ';
      }
      var temp1=Math.round(12*(Math.log2(notes[i]/440)-Math.log2(generalKey/440)));
      if(Math.abs(temp1)%12==0){
        temp1=0;
      }
      else if(temp1%12<0){
        temp1=temp1%12+12;
      }
      else{
        temp1=temp1%12;
      }
      distForModeRecog.push(temp1);
    }
    console.log("distance: "+ distance);
    console.log(distForModeRecog[0]);
  
  //TODO try to optimize it.
    //major chords, 1 e 4 modes
      if(distance==' 4 3 4 '){
      if(distForModeRecog[0]==0){
        chordsPlayed.push(new Chord(0,1,0)); 
      }
      else if(distForModeRecog[0]==5){
        chordsPlayed.push(new Chord(0,4,0));
      }
      else{
        chordsPlayed.push(new Chord(distForModeRecog[0],1,0))
      }
    }
    else if(distance==' 3 4 1 '){
      if(distForModeRecog[3]==0){
        chordsPlayed.push(new Chord(0,1,0));
      }
      else if(distForModeRecog[3]==5){
        chordsPlayed.push(new Chord(0,4,0));
      }
      else{
        chordsPlayed.push(new Chord(distForModeRecog[3],1,0))
      }
    }
    else if(distance==' 4 1 4 '){
      if(distForModeRecog[2]==0){
        chordsPlayed.push(new Chord(0,1,0));
      }
      else if(distForModeRecog[2]==5){
        chordsPlayed.push(new Chord(0,4,0));
      }
      else{
        chordsPlayed.push(new Chord(distForModeRecog[2],1,0))
      }
    }
    else if(distance==' 1 4 3 '){
      if(distForModeRecog[1]==0){
        chordsPlayed.push(new Chord(0,1,0));
      }
      else if(distForModeRecog[1]==5){
        chordsPlayed.push(new Chord(0,4,0));
      }
      else{
        chordsPlayed.push(new Chord(distForModeRecog[1],1,0))
      }
    }
    
    //minor chords, 2 3 6 modes, when there is a change of key it is considere a chord in second mode.
    else if(distance==' 3 4 3 '){
      if(distForModeRecog[0]==2){
        chordsPlayed.push(new Chord(0,2,0));
      }
      else if(distForModeRecog[0]==4){
        chordsPlayed.push(new Chord(0,3,0));
      }
      else if(distForModeRecog[0]==9){
        chordsPlayed.push(new Chord(0,6,0));
      }
      else{
        if(distForModeRecog[0]-2<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[0]-2)+adj,2,0));
      }
    }
    else if(distance==' 4 3 2 '){
      if(distForModeRecog[3]==2){
        chordsPlayed.push(new Chord(0,2,0));
      }
      else if(distForModeRecog[3]==4){
        chordsPlayed.push(new Chord(0,3,0));
      }
      else if(distForModeRecog[3]==9){
        chordsPlayed.push(new Chord(0,6,0));
      }
      else{
        if(distForModeRecog[3]-1<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[3]-1)+adj,2,0));
      }
    }
    else if(distance==' 3 2 3 '){
      if(distForModeRecog[2]==2){
        chordsPlayed.push(new Chord(0,2,0));
      }
      else if(distForModeRecog[2]==4){
        chordsPlayed.push(new Chord(0,3,0));
      }
      else if(distForModeRecog[2]==9){
        chordsPlayed.push(new Chord(0,6,0));
      }
      else{
        if(distForModeRecog[2]-1<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[2]-1)+adj,2,0));
      }
    }
    else if(distance==' 2 3 4 '){
          if(distForModeRecog[1]==2){
        chordsPlayed.push(new Chord(0,2,0));
      }
      else if(distForModeRecog[1]==4){
        chordsPlayed.push(new Chord(0,3,0));
      }
      else if(distForModeRecog[1]==9){
        chordsPlayed.push(new Chord(0,6,0));
      }
      else{
        if(distForModeRecog[1]-1<0){
          adj=12;
        }
        chordsPlayed.push(new Chord((distForModeRecog[1]-1)+adj,2,0));
      }
    }
    //Dominant chord
      else if(distance==' 4 3 3 '){
        if(distForModeRecog[0]==7){
          chordsPlayed.push(new Chord(0,5,0));
        }
        else{
          if(distForModeRecog[0]-7<0){
            adj=12;
          }
          chordsPlayed.push(new Chord((distForModeRecog[0]-7)+adj,5,0));
        }
      }
      else if(distance==' 3 3 2 '){
        if(distForModeRecog[3]==7){
          chordsPlayed.push(new Chord(0,5,0));
        }
        else{
          if(distForModeRecog[3]-7<0){
            adj=12;
          }
          chordsPlayed.push(new Chord((distForModeRecog[3]-7)+adj,5,0));
        }
      }
      else if(distance==' 3 2 4 '){
        if(distForModeRecog[2]==7){
          chordsPlayed.push(new Chord(0,5,0));
        }
        else{
          if(distForModeRecog[2]-7<0){
            adj=12;
          }
          chordsPlayed.push(new Chord((distForModeRecog[2]-7)+adj,5,0));
        }
      }
      else if(distance==' 2 4 3 '){
        if(distForModeRecog[1]==7){
          chordsPlayed.push(new Chord(0,5,0));
        }
        else{
          if(distForModeRecog[1]-7<0){
            adj=12;
          }
          chordsPlayed.push(new Chord((distForModeRecog[1]-7)+adj,5,0));
        }
      }
      //Locrian Chord
      else if(distance==' 3 3 4 '){
        if(distForModeRecog[0]==11){
          chordsPlayed.push(new Chord(0,7,0));
        }
        else{
          if(distForModeRecog[0]-11<0){
            adj=12;
          }
          chordsPlayed.push(new Chord((distForModeRecog[0]-11)+adj,7,0));
        }
      }
      else if(distance==' 3 4 2 '){
        if(distForModeRecog[3]==11){
        chordsPlayed.push(new Chord(0,7,0));
        }
        else{
          if(distForModeRecog[3]-11<0){
            adj=12;
          }
          chordsPlayed.push(new Chord((distForModeRecog[3]-11)+adj,7,0));
        }
      } 
      else if(distance==' 4 2 3 '){
        if(distForModeRecog[2]==11){
          chordsPlayed.push(new Chord(0,7,0));
        }
        else{
          if(distForModeRecog[2]-11<0){
            adj=12;
          }
          chordsPlayed.push(new Chord((distForModeRecog[2]-11)+adj,7,0));
        }
      }
      else if(distance==' 2 3 3 '){
        if(distForModeRecog[1]==11){
          chordsPlayed.push(new Chord(0,7,0));
        }
        else{
          if(distForModeRecog[1]-11<0){
            adj=12;
          }
          chordsPlayed.push(new Chord((distForModeRecog[1]-11)+adj,7,0));
        }
      }
  
      //Other common chords
  
      //major chord add2
      else if(distance==' 2 2 3 '){
        chordsPlayed.push(new Chord(distForModeRecog[0],1,2));
      }
      else if(distance==' 2 3 5 '){
        chordsPlayed.push(new Chord(distForModeRecog[3],1,2));
      }
      else if(distance==' 3 5 2 '){
        chordsPlayed.push(new Chord(distForModeRecog[2],1,2));
      }
      else if(distance==' 5 2 2 '){
        chordsPlayed.push(new Chord(distForModeRecog[1],1,2));
      }
  
      //major chord add9
      else if(distance==' 4 3 7 '){
        chordsPlayed.push(new Chord(distForModeRecog[0],1,9));
      }
  
      //minor 7maj
      else if(distance==' 3 4 4 '){
        if(distForModeRecog[0]-9<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[0]-9+adj,6,7));
      }
      else if(distance==' 4 4 1 '){
        if(distForModeRecog[3]-9<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[3]-9+adj,6,7));    
      }
      else if(distance==' 4 1 3 '){
        if(distForModeRecog[2]-9<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[2]-9+adj,6,7));    
      }
      else if(distance==' 1 3 4 '){
        if(distForModeRecog[1]-9<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[1]-9+adj,6,7));    
      }
  
      //minor add2
      else if(distance==' 2 1 4 '){
        if(distForModeRecog[0]-9<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[0]-9+adj,6,2));    
      }
      else if(distance==' 1 4 5 '){
        if(distForModeRecog[3]-9<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[3]-9+adj,6,2));    
      }
      else if(distance==' 4 5 2 '){
        if(distForModeRecog[2]-9<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[2]-9+adj,6,2));    
      }
      else if(distance==' 5 2 1 '){
        if(distForModeRecog[1]-9<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[1]-9+adj,6,2));    
      }
  
      //minor chord add9
      else if(distance==' 3 4 7 '){
        if(distForModeRecog[0]-9<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[0]-9+adj,6,9));
      }
  
      //diminished chord
      else if(distance==' 3 3 3 '){
        if(distForModeRecog[0]-11<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[0]-11+adj,7,7));
      }
  
      //augmented chord
      else if(distance==' 4 4 2 '){
        if(distForModeRecog[0]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[0]-7+adj,5,5));  
      }
      else if(distance==' 4 2 2 '){
        if(distForModeRecog[3]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[3]-7+adj,5,5));  
      }
      else if(distance==' 2 2 4 '){
        if(distForModeRecog[2]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[2]-7+adj,5,5));  
      }
      else if(distance==' 2 4 4 '){
        if(distForModeRecog[1]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[2]-7+adj,5,5));  
      }
  
      //suspended fourth chord
      else if(distance==' 5 2 3 '){
        if(distForModeRecog[0]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[0]-7+adj,5,4));  
      }
      else if(distance==' 2 3 2 '){
        if(distForModeRecog[3]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[3]-7+adj,5,4));  
      }
      else if(distance==' 3 2 5 '){
        if(distForModeRecog[2]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[2]-7+adj,5,4));  
      }
      else if(distance==' 2 5 2 '){
        if(distForModeRecog[1]-7<0){
          adj=12;
        }
        chordsPlayed.push(new Chord(distForModeRecog[2]-7+adj,5,4));  
      }
      else{
        listnotes.pop();
      }
      console.log(chordsPlayed);
      if(oldChordsPlayedLength<chordsPlayed.length){
        harmonicDistance();
        chordsPlayedNoDup=unique(chordsPlayed);
        mapChordsToLeaves();
      }
      console.log(chordDistances);  
  }
  
  /**
   * Calculate the harmonic distance following a TPS-like algorithm based on the differences of key, mode and sigle notes played.
   * It fills the array with the distance between the actual chord and the previous chord in the even indexes and the minimum distance between the actual chord and all the others played yet in the odd indexes. 
   */
  function harmonicDistance(){
    var ii;
    var distance;
    var modeDistance;
    var keydistance;
    var len=chordsPlayed.length-1;
    var minDistance=100;
  
    for(ii=len;ii>0;ii--){
      hammingDistance=0;
      for(j=0;j<4;j++){
        if(listnotes[len][j]!=listnotes[ii-1][0]&&listnotes[len][j]!=listnotes[ii-1][1]&&listnotes[len][j]!=listnotes[ii-1][2]&&listnotes[len][j]!=listnotes[ii-1][3]){
          hammingDistance++;
        }
      }
  
      //this part is useful for the phrigyan mode and its position in the circle of fifths.
      indexForMode1=circleOfFifthForMode.indexOf(chordsPlayed[len].mode);
      indexForMode2=circleOfFifthForMode.indexOf(chordsPlayed[ii-1].mode);
      if(indexForMode1==6&&indexForMode1==6){
        modeDistance=0;
      }
      else if(indexForMode1==6){
        modeDistance=indexForMode2+1;
      }
      else if(indexForMode2==6){
        modeDistance=indexForMode1+1;
      }
      else{
        modeDistance=Math.abs(indexForMode1-indexForMode2);
      }
      keydistance=Math.abs(circleOfFifthForKey.indexOf(chordsPlayed[len].tonal)-circleOfFifthForKey.indexOf(chordsPlayed[ii-1].tonal));
      //implements the circularity of the circle of fifth.
      if(keydistance>6){
        keydistance=12-keydistance;
      }
  
      distance=keydistance+modeDistance+hammingDistance;
  
      if(ii==len){
        chordDistances.push(distance);        
      }
      minDistance=Math.min(minDistance, distance);
    }
    if(minDistance!=100){
      chordDistances.push(minDistance);
    }
    
  
    adjForCircleOfFifthsForTrackLength=circleOfFifthForKey.indexOf(chordsPlayed[chordsPlayed.length-1].tonal);
    adjForCircleOfFifthsForTrackLength*=2;
    if(adjForCircleOfFifthsForTrackLength>11) adjForCircleOfFifthsForTrackLength=24-adjForCircleOfFifthsForTrackLength-1;
    maxtonal=Math.max(maxtonal,adjForCircleOfFifthsForTrackLength);
  
    adjForMaxMode=circleOfFifthForMode.indexOf(chordsPlayed[chordsPlayed.length-1].mode);
    adjForMaxMode+=2;
    if(adjForMaxMode==8) adjForMaxMode=1;
    maxmode[adjForCircleOfFifthsForTrackLength]=max(maxmode[adjForCircleOfFifthsForTrackLength],adjForMaxMode);
    truckLength=maxtonal;
  }

  /**
 * This function is called when "play" button is clicked. It creates the buttons to be used to select the key.
 */
function showKeys() {
    keysshown = true;
    let i = 0;
    let name_key = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];
    let freq_key = ["440", "466", "494", "523", "554", "587", "622", "659", "698", "740", "784", "831"];
    let position_x_keyButton = ["3vw","7.5vw","14vw","18vw","25vw","32vw","37.5vw","44vw","50vw","56vw","61.5vw","67vw"];
    let position_y_keyButton = ["16.5vh","22vh","16vh","29vh","33vh","24vh","34.5vh","26vh","31vh","20vh","30.5vh","20.5vh"];
    while(i<12){
      el=document.createElement("div");
      el.classList.add("keys_button");
      el.innerHTML+= name_key[i];
      el.value = freq_key[i];
      el.onclick = getKey; 
      el.style.top = position_y_keyButton[i];
      el.style.left = position_x_keyButton[i];
      keys_list.appendChild(el);
      i++;
    }
  }
  
  /**
   * This function updates the model in such a way to have the positions of all the leaves to draw.
   */
  function mapChordsToLeaves(){
    let len=chordsPlayedNoDup.length;
    heightsForLeaves=[];
    widthsForLeaves=[];
    widthsForLeavesMirrored=[];
    anglesForLeaves=[];
    anglesForLeavesMirrored=[];
    for(let i=0;i<len;i++){
      let idxKeyChordsNoDup=circleOfFifthForKey.indexOf(chordsPlayedNoDup[i].tonal);
      let idxModeChordsNoDup=circleOfFifthForMode.indexOf(chordsPlayedNoDup[i].mode);
      let specialChord=chordsPlayedNoDup[i].other;
      let idxSpecialChord=arrayForSpecialChords.indexOf(specialChord);
      idxKeyChordsNoDup*=2;
      if(idxKeyChordsNoDup>11) idxKeyChordsNoDup=24-idxKeyChordsNoDup-1;
      if(idxModeChordsNoDup==6) idxModeChordsNoDup=-1;
      heightsForLeaves.push(windowHeight-idxKeyChordsNoDup*windowHeight/25-branchYyAdj[idxModeChordsNoDup+1]);
      widthsForLeaves.push(windowWidth/2+(idxModeChordsNoDup+2)*windowHeight/30);
      widthsForLeavesMirrored.push(windowWidth/2-(idxModeChordsNoDup+2)*windowHeight/30+5);
      
      if(specialChord==0){
        anglesForLeaves.push(angles[idxModeChordsNoDup+1]);
        anglesForLeavesMirrored.push(anglesMirrored[idxModeChordsNoDup+1]);
      }
      else if(chordsPlayedNoDup[i].mode==7&&specialChord==7){
        anglesForLeaves.push(angles[15]);
        anglesForLeavesMirrored.push(anglesMirrored[15]);
      }
      else if(chordsPlayedNoDup[i].mode==6){
        anglesForLeaves.push(angles[12+idxSpecialChord]);
        anglesForLeavesMirrored.push(anglesMirrored[12+idxSpecialChord]);
      }
      else{
        anglesForLeaves.push(angles[7+arrayForSpecialChords.indexOf(specialChord)]);
        anglesForLeavesMirrored.push(anglesMirrored[7+idxSpecialChord]);
      }
    }
  }
  
  /**
   * This function takes the arraylist and builds a new one without duplicates.
   * @param {ArrayList} list the list with duplicates.
   * @return the version of the arraylist without duplicates.
   */
  function unique(list){
    let len1=list.length;
    let newList=[];
    let same=false;
    newList.push(list[0]);
    for(let i=0;i<len1;i++){
      same=false;
      for(let j=0;j<newList.length;j++){
        if(list[i].equals(newList[j])){
          same=true;
        }
      }
      if(same==false){
        newList.push(list[i]);
      } 
    }
    return newList;
  }
  
  /**
   * This function is used to show the synth and the regulation of other sound parameter.
   */
  function showSynth(){
    if(onOff==0){
      document.querySelectorAll(".container-synth")[0].classList.remove("container-synth-closing");
      document.querySelectorAll(".container-synth")[0].style.display="block";
      var interv=setInterval(function(){window.scrollTo(0,document.body.scrollHeight)},15);
      setTimeout(function(){clearInterval(interv);onOff=1;},500);
    }
    if(onOff==1){
      document.querySelectorAll(".container-synth")[0].classList.add("container-synth-closing");
      onOff=0;
    }
  }

  /**
   * This function set some variables useful for the view.
   */
  function initializePosAngleToDrawTrunk(){
    position_x = [0,0.02,0.07,0.13,0.18,0.25,0.31,0.37,0.43,0.49,0.55,0.61,0.67,0.72];
    position_y = [0.3,0.22,0.23,0.21,0.28,0.33,0.3,0.35,0.31,0.31,0.25,0.3,0.27,0.25]; 
    pos_angle = [55,120,60,150,130,50,120,60,130,70,140,40];
    a=0;
  }

  /**
   * This function set some variables useful for the view to draw the leaves.
   */
  function initializeVarToDrawLeaves(){
    branchY=[];
    branchYy=[];
    branchYyAdj=[50,60,58,65,63,70,68];
    branchX=[];
    branchXMirrored=[];
    anglesForLeaves=[];
    anglesForLeavesMirrored=[];

    for(let i=1;i<=7;i++){
      branchX.push(windowWidth/2+i*windowHeight/30); 
      branchXMirrored.push(windowWidth/2-i*windowHeight/30+5); 
    }
    for(let i=0;i<12;i++){
      branchYy=[];
      for(let j=0;j<7;j++){
        branchYy.push(windowHeight-i*windowHeight/25-branchYyAdj[j]);
      }
      branchY.push(branchYy);
    }
  }

  function fillAnglesMirrored(){
    for(let i=0;i<angles.length;i++){
      anglesMirrored.push(360-angles[i]);
    }
  }
  
  fillAnglesMirrored();
  document.querySelectorAll(".initial-button")[0].onclick=showKeys;
  document.querySelectorAll(".button-synth")[0].onclick=showSynth;