/**
 * Get the key selected from the user before starting playing.
 */
function getKey(){
    generalKey=this.value;
    game_state=1;
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
    openingFile=false;
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
      heightsForLeaves.push(windowHeightMod-idxKeyChordsNoDup*windowHeightMod/25-branchYyAdj[idxModeChordsNoDup+1]);
      widthsForLeaves.push(windowWidth/2+(idxModeChordsNoDup+2)*windowHeightMod/30);
      widthsForLeavesMirrored.push(windowWidth/2-(idxModeChordsNoDup+2)*windowHeightMod/30+5);
      
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
      onOff=1;
      document.querySelectorAll(".container-synth")[0].classList.remove("container-synth-closing");
      /*var interv=setInterval(function(){window.scrollTo(0,document.body.scrollHeight)},15);
      setTimeout(function(){clearInterval(interv);onOff=1;},500);*/
      
    }
    else if(onOff==1){
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
    branchYyAdj=[windowHeightMod*0.0625,windowHeightMod*0.075,windowHeightMod*0.0725,windowHeightMod*0.0813,windowHeightMod*0.0788,windowHeightMod*0.0875,windowHeightMod*0.085];
    branchX=[];
    branchXMirrored=[];
    anglesForLeaves=[];
    anglesForLeavesMirrored=[];

    for(let i=1;i<=7;i++){
      branchX.push(windowWidth/2+i*windowHeightMod/30); 
      branchXMirrored.push(windowWidth/2-i*windowHeightMod/30+5); 
    }
    for(let i=0;i<12;i++){
      branchYy=[];
      for(let j=0;j<7;j++){
        branchYy.push(windowHeightMod-i*windowHeightMod/25-branchYyAdj[j]);
      }
      branchY.push(branchYy);
    }
  }

  function fillAnglesMirrored(){
    for(let i=0;i<angles.length;i++){
      anglesMirrored.push(360-angles[i]);
    }
  }

  /**
   * This function convert the array of the chords played without duplicates into a string. The "c" is a separator that say that there is a new chord, the "," is a separator of the chord attributes.
   * @returns the string obtained from the list of chords.
   */
  function chordsToString(){
    var finalString="";
    for(let i=0;i<chordsPlayedNoDup.length;i++){
      finalString+="c"+chordsPlayedNoDup[i].tonal+","+chordsPlayedNoDup[i].mode+","+chordsPlayedNoDup[i].other;
    }
    return finalString;
  }

  /**
   * This function convert a string in chords. The string has to be created with the function "chordsToString" or following the format with the "c" separator for chords and the "," to separate "tonal", "mode" and "other". 
   * @param {String} dataChord string to convert in chords.
   */
  function stringToChords(dataChord){
    let i=0;
    let ton=0;
    let mod=0;
    let oth=0;
    chordsPlayedNoDup=[];
    while(i<dataChord.length){
      if(dataChord[i]=="c"){
        i++;
        ton=int(dataChord[i]);
        if(dataChord[i+1]!=","){
          ton=ton*10+int(dataChord[i+1]);
          i+=3;
        }else{
          i+=2;
        }
        mod=int(dataChord[i]);
        i+=2;
        oth=int(dataChord[i]);
        i++;
        chordsPlayedNoDup.push(new Chord(ton,mod,oth));
      }
    }
    return chordsPlayedNoDup;
  }

  /**
   * This function convert the array of the chord distances in a string. The "d" is a separator for the chord measurement, the "," is a separator for the two measurements obtained for each chord.
   * @returns the string converted.
   */
  function distancesToString(){
    var finalString="";
    for(let i=0;i<chordDistances.length-1;i=i+2){
      finalString+="d"+chordDistances[i]+","+chordDistances[i+1];
    }
    return finalString;
  }

  /**
   * This function convert a string in the array of chord distances. The string has to be in th format created by the function "distancesToString".
   * @param {String} dataDistances string to convert in the array of chord distances.
   */
  function stringToDistances(dataDistances){
    chordDistances=[];
    let i=0;
    let num=0;
    while(i<dataDistances.length){
      if(dataDistances[i]=="d"){
        i++;
        while(dataDistances[i]!=","){
          num=num*10+int(dataDistances[i]);
          i++;
        }
        chordDistances.push(num);
        num=0;
        i++;
        while(dataDistances[i]!="d"&&i<dataDistances.length){
          num=num*10+int(dataDistances[i]);
          i++;
        }
        chordDistances.push(num);
        num=0;
      }
    }
    return chordDistances;
  }

  /**
   * This function convert the array of the list notes list played(frequencies) in a string. The separator "l" is used to separate the chords, the separator "," to separate the singole notes.
   * @returns the string converted.
   */
  function listnotesToString(){
    let finalString="";
    for(let i=0;i<listnotes.length;i++){
      finalString+=listnotes[i][0]+","+listnotes[i][1]+","+listnotes[i][2]+","+listnotes[i][3]+"l";
    }
    return finalString;
  }

  /**
   * This function convert a string into an array of chords, every chords contains four notes in frequency.
   * @param {String} dataListnotes string to convert. 
   * @returns the array of chords in frequency.
   */
  function stringToListnotes(dataListnotes){
    listnotes=[];
    let i=0;
    while(i<dataListnotes.length){
      let note1=0,note2=0,note3=0,note4=0;
      while(dataListnotes[i]!="l"){
        let note=0;
        while(dataListnotes[i]!=","&&dataListnotes[i]!="l"){
          note=note*10+int(dataListnotes[i]);
          i++;
        }
        if(note1==0) note1=note;
        else if(note2==0) note2=note;
        else if(note3==0) note3=note;
        else if(note4==0){
          note4=note;
          i--;
        } 
        i++;
      }
      listnotes.push([note1,note2,note3,note4]);
      i++;
    }
    return listnotes;
  }



//database stuff

  var firebaseConfig = {
    apiKey: "AIzaSyC6zVjgfiX-hNXh_7G0z2U4TQVJyCJGNNQ",
    authDomain: "actamproj.firebaseapp.com",
    databaseURL: "https://actamproj.firebaseio.com",
    projectId: "actamproj",
    storageBucket: "actamproj.appspot.com",
    messagingSenderId: "274232532971",
    appId: "1:274232532971:web:ac0ac2edb8f5209a8bc3ae",
    measurementId: "G-PVFXPZ85BZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  var db = firebase.firestore();

  /**
   * This function save the song in the database. The document is the title of the song.
   */
  function saveToDB(exi,name){
    console.log(exi);
    if(exi==1){
      let chordsString=chordsToString();
      let distancesString=distancesToString();
      let generalkeyString=generalKey;
      let maxtonalString=maxtonal;
      let maxmodeString=maxmode;
      let listnotesString=listnotesToString();
      db.collection("songs").doc(name).set({
        chords: chordsString,
        distances: distancesString,
        generalkey: generalkeyString,
        maxmode: maxmodeString,
        maxtonal: maxtonalString,
        listnotes: listnotesString,
      });
      alert("Song saved");
    }
    else{
      alert("Sorry, there was an error. Try again");
    }
    
  }
  
  /**
   * This function checks if there exists already a song with the name specified.
   */
  function checkExistingDocuments(){
    var name=document.querySelectorAll(".name-song")[0].innerText;
    name=name.toLowerCase();
    document.querySelectorAll(".save-button")[0].onclick=openTextfield;
    document.querySelectorAll(".name-song")[0].style.display="none";
    if(midiKeyboard==false) startPlayKeyboard();

    if(name!=""&&name!="artist - title"){
    db.collection("songs").doc(name).get().then(function(doc) {
    if (doc.exists) {
      var r = confirm("A song with the same name already exists. The song will be overwritten.");
      if (r == true) {
        saveToDB(1, name);
      } else {
        console.log("action cancelled");
      }
    } else {
      saveToDB(1,name);
    }
  }).catch(function(error) {
    console.log("Error"+error);
    alert("Sorry, there was an error, try again")
  });
}
  }

  /**
   * This function makes appear a textfield where the user have to insert the name of the song to save.
   */
  function openTextfield(){
    if(midiKeyboard==false) disableKeyboard();

    document.querySelectorAll(".name-song")[0].style.display="block";
    document.querySelectorAll(".name-song")[0].innerText="Artist - Title"

    document.querySelectorAll(".save-button")[0].onclick=checkExistingDocuments;
  }

  function namesongOnBlur(string){
    if(document.querySelectorAll(string)[0].innerText==""){
      document.querySelectorAll(string)[0].innerText="Artist - Title";
    }
    if(midiKeyboard==false) startPlayKeyboard();
  }
 
  function namesongOnFocus(string){
    if(document.querySelectorAll(string)[0].innerText=="Artist - Title"){
      document.querySelectorAll(string)[0].innerText="";
    }
    disableKeyboard();
  }

  function openFile(){
    openingFile=true;
    keysshown=false;
    let iterations=document.querySelectorAll(".keys_button").length;
    for(let i=0;i<iterations;i++){
      document.querySelectorAll(".keys_button")[0].remove();
    }
  }

  function searchSongs(){
    var songname=document.querySelectorAll(".textarea-songs")[0].innerText;
    songname=songname.toLowerCase();
    if(songname!="artist - title"){
    db.collection("songs").doc(songname).get().then(function(doc) {
      if (doc.exists) {
        alert("Song found");
        let dataChord=doc.data().chords;
        let dataDistances=doc.data().distances;
        let dataMaxmode=doc.data().maxmode;
        let dataMaxtonal=doc.data().maxtonal;
        let dataGeneralKey=doc.data().generalkey;
        let dataListnotes=doc.data().listnotes;
        extractSongData(dataChord,dataDistances,dataMaxmode,dataMaxtonal,dataGeneralKey,dataListnotes);
      } else {
        alert("This song does not exists");
        console.log(error);
      }
    }).catch(function(error) {
      console.log(error);
    });
  }else{
    alert("Write the name of the song");
  }
  }

  /**
   * This function update the model after choosing a song from the ones stored in the database and start the game starting from it.
   * @param {String} dataChord string of chords
   * @param {String} dataDistances string of distances
   * @param {String} dataMaxmode the maximum mode in string
   * @param {String} dataMaxtonal the maximum tonal in string
   * @param {String} dataGeneralKey the general key of the song
   * @param {String} dataListnotes the chords in frequency in string
   */
  function extractSongData(dataChord,dataDistances,dataMaxmode,dataMaxtonal,dataGeneralKey,dataListnotes){
    chordsPlayed=stringToChords(dataChord);
    chordDistances=stringToDistances(dataDistances);
    listnotes=stringToListnotes(dataListnotes);
    maxmode=int(dataMaxmode);
    maxtonal=int(dataMaxtonal);
    generalKey=dataGeneralKey;

    game_state=1;
    startPlayKeyboard();
  } 

  
  fillAnglesMirrored();
  document.querySelectorAll(".initial-button")[0].onclick=showKeys;
  document.querySelectorAll(".initial-button")[1].onclick=openFile;

  document.querySelectorAll(".button-synth")[0].onclick=showSynth;
  document.querySelectorAll(".save-button")[0].onclick=openTextfield;
  document.querySelectorAll(".initial-button")[4].onclick=searchSongs;
