let changeAngleBigLeaves=0;
let flagChangingAngle=false;

function setup() {  
  l3=new Leaf(1,windowWidth/2,500,50);
  frameRate(15);
  colorBranch=color(56,87,35);
  windowHeightMod=windowHeight;
}

function draw(){  
  if(onOff==1){
    if(windowHeightMod>windowHeight*0.65){
      windowHeightMod-=windowHeight*0.06;
    }
    if(windowHeightMod<windowHeight*0.65) windowHeightMod=windowHeight*0.65;

    document.querySelectorAll(".container-synth")[0].style.display="block";
    
  }else{
    if(windowHeightMod<windowHeight){
      windowHeightMod+=windowHeight*0.15;
    }
    if(windowHeightMod>=windowHeight){
      windowHeightMod=windowHeight;
      document.querySelectorAll(".container-synth")[0].style.display="none";
    } 
  }

  if(keyModeSpaceOn) document.querySelectorAll(".keymode-space")[0].style.display="block";
  else document.querySelectorAll(".keymode-space")[0].style.display="none";

  createCanvas(windowWidth,windowHeightMod);
  clear();
  
  if(onOff == 1){
    initializeRootsCoordinates();
    drawRoots();
  }  

  scalePlantTrunk=truckScale/2*windowHeightMod/900;
  truckPlantSuperposition=truckSuperposition/2*windowHeightMod/900;

  //Home page
  if(game_state==0){
    l = new Leaf(1, 400, 400, angle);
    scale = windowHeightMod/900; 
    let j=0.3;
    document.querySelectorAll(".initial-button")[6].style.display="none";
    document.querySelectorAll(".button-keymodespace")[0].style.display = "none";
    document.querySelectorAll(".music")[0].style.display="block";

    if(changeAngleBigLeaves<1) flagChangingAngle=true;
    else if(changeAngleBigLeaves>10) flagChangingAngle=false;

    if(flagChangingAngle) changeAngleBigLeaves+=0.5;
    else changeAngleBigLeaves-=0.5;

    if (keysshown==false){
      l.transform(scale, 12, windowHeightMod*j, angle+70+changeAngleBigLeaves);
      l.plot();

      document.querySelectorAll(".initial-button")[3].style.display="none";
      document.querySelectorAll(".initial-button")[0].style.display="block";
    }
    else{
      document.querySelectorAll(".initial-button")[0].style.display="none";
      document.querySelectorAll(".initial-button")[3].style.display="block";
      keys_list.style.display = "block";
      //disegna ramo
      initializePosAngleToDrawTrunk();

      beginShape();
      noFill();
      strokeWeight(1.5);
      stroke(56,87,35);
      while(a<14){
        vertex(windowWidth*position_x[a], windowHeightMod*position_y[a]);
        a++;
      }
      endShape();
      //foglie con le keys
      a=1;
      while(a<13){  
        l.transform(scale*0.7, windowWidth*position_x[a], windowHeightMod*position_y[a], pos_angle[a-1]);
        l.plot();
        a++;
      }
      l.transform(scale, windowWidth*position_x[position_x.length-1] , windowHeightMod*position_y[position_y.length-1], angle+70+changeAngleBigLeaves);
      l.plot();
    }

    let xSecondLeave=12;
    if(openingFile==true){
      document.querySelectorAll(".textarea-songs")[0].style.display="block";
      document.querySelectorAll(".initial-button")[1].style.display="none"
      document.querySelectorAll(".initial-button")[4].style.display="block";
      xSecondLeave=12+windowWidth*0.3;
      drawTrunkForText(windowHeightMod*(j+0.25));
    }else{
      document.querySelectorAll(".initial-button")[4].style.display = "none";
      document.querySelectorAll(".textarea-songs")[0].style.display = "none";
      document.querySelectorAll(".initial-button")[1].style.display = "block";
      document.querySelectorAll(".textarea-songs")[0].innerText = "Artist - Title";
    }
    j+=0.25;
    l.transform(scale, xSecondLeave, windowHeightMod*j, angle+70+changeAngleBigLeaves);
    l.plot();

    let xThirdLeave=12;
    if(comparingSongs){
      document.querySelectorAll(".textarea-songs")[1].style.display="block";
      document.querySelectorAll(".textarea-songs")[2].style.display="block";
      document.querySelectorAll(".initial-button")[2].style.display="none";
      document.querySelectorAll(".initial-button")[5].style.display="block";
      xThirdLeave=12+windowWidth*0.3;

      j+=0.21;
      drawTrunkForText(windowHeightMod*(j));
      l.transform(scale, xThirdLeave, windowHeightMod*j, angle+70+changeAngleBigLeaves);
      l.plot();
      j+=0.1;
      drawTrunkForText(windowHeightMod*(j));
      l.transform(scale, xThirdLeave, windowHeightMod*j, angle+70+changeAngleBigLeaves);
      l.plot();
    }
    
    else{
      document.querySelectorAll(".textarea-songs")[1].innerText = "Artist - Title";
      document.querySelectorAll(".textarea-songs")[2].innerText = "Artist - Title";
      document.querySelectorAll(".initial-button")[2].style.display="block";
      document.querySelectorAll(".textarea-songs")[1].style.display = "none";
      document.querySelectorAll(".textarea-songs")[2].style.display = "none";
      document.querySelectorAll(".initial-button")[5].style.display = "none";
      j+=0.25;
      l.transform(scale, xThirdLeave, windowHeightMod*j, angle+70+changeAngleBigLeaves);
      l.plot();
    }

    t = new Trunk(0.3, 0, windowHeightMod, 180);
    let i = ceil(windowHeightMod/((920-196)*0.3));
    while(truckSuperposition*i>=0){             
      t.transform(truckScale, 0+13, truckSuperposition*i, 180 );
      t.plot();
      i--;
    } 
    document.querySelectorAll(".container-transparent")[0].style.display="block";
    document.querySelectorAll(".score")[0].style.display="none";
    document.querySelectorAll(".score")[1].style.display="none";
  }
  //The game started
  else if(game_state==1){
    keys_list.style.display = "none";
    document.querySelectorAll(".container-transparent")[0].style.display="none";
    document.querySelectorAll(".initial-button")[0].style.display = "none";
    document.querySelectorAll(".initial-button")[1].style.display = "none";
    document.querySelectorAll(".initial-button")[2].style.display = "none";
    document.querySelectorAll(".initial-button")[3].style.display = "none";
    document.querySelectorAll(".initial-button")[4].style.display = "none";
    document.querySelectorAll(".initial-button")[5].style.display = "none";
    document.querySelectorAll(".initial-button")[6].style.display = "block";
    document.querySelectorAll(".button-synth")[0].style.display = "block";
    document.querySelectorAll(".save-button")[0].style.display = "block";
    document.querySelectorAll(".textarea-songs")[0].style.display = "none";
    document.querySelectorAll(".container-options")[0].style.display = "flex";
    document.querySelectorAll(".button-keymodespace")[0].style.display = "block";
    document.querySelectorAll(".title-song")[0].style.right="5vh";
    document.querySelectorAll(".title-song")[0].style.transform="translateX(0vh)";
    document.querySelectorAll(".music")[0].style.display="none";
    document.querySelectorAll(".music")[0].checked=false;
    decreaseBackgroundMusic();

    moveClouds();
    drawLittlePlant();
    drawTrunkOnFloor();
    initializeVarToDrawLeaves();
    drawLeaves(0);  
    drawTrunkPlant(0);
    drawClouds(0);
  }
  //Compare mode
  else if(game_state==2){
    document.querySelectorAll(".container-transparent")[0].style.display="none";
    document.querySelectorAll(".initial-button")[0].style.display = "none";
    document.querySelectorAll(".initial-button")[1].style.display = "none";
    document.querySelectorAll(".initial-button")[5].style.display = "none";
    document.querySelectorAll(".initial-button")[6].style.display = "block";
    document.querySelectorAll(".textarea-songs")[1].style.display = "none";
    document.querySelectorAll(".textarea-songs")[2].style.display = "none";
    document.querySelectorAll(".title-song")[0].style.right="50%";
    document.querySelectorAll(".title-song")[0].style.transform="translateX(-5vh)";
    document.querySelectorAll(".music")[0].style.display="none";
    document.querySelectorAll(".music")[0].checked=false;
    decreaseBackgroundMusic();
    
    drawTrunkOnFloor();
    for(let i=0;i<songs.length;i++){
      initializeVarToDrawLeaves();
      adjustBranchX(i);
      extractDataForComparing(i);
      drawLeaves(i); 
      drawTrunkPlant(i);
    }
    drawClouds(1);
  }

  for(let i=0;i<document.querySelectorAll(".input-knob").length;i++){
    document.querySelectorAll(".input-knob")[i].style.width=String(windowHeight*0.08)+"px";
    document.querySelectorAll(".input-knob")[i].style.height=String(windowHeight*0.08)+"px";
    document.querySelectorAll(".input-knob")[i].width="8vh";
    document.querySelectorAll(".input-knob")[i].height="8vh";
  }
}

function drawClouds(i){
  let c=new Cloud(windowHeight*0.0003,windowWidth-windowHeight*0.15, windowHeight*0.1);
  c.plot();
  document.querySelectorAll(".score")[0].innerText=finalScores[0];
  document.querySelectorAll(".score")[0].style.display="block";
  if(i==1){
    c.transform(windowHeight*0.0003,windowWidth/2-windowHeight*0.15, windowHeight*0.1);
    c.plot();
    document.querySelectorAll(".score")[1].innerText=finalScores[0];
    document.querySelectorAll(".score")[0].innerText=finalScores[1];
    document.querySelectorAll(".score")[1].style.display="block";
  }
}

function moveClouds() {  
  pos++;
  let c = new Cloud(windowHeight*dim*1.5, pos, ranY);
  c.plot();
  //let c1 = new Cloud(windowHeight*dim, pos, ranY+70);
  //c1.plot();  
  if (pos>windowWidth) { 
    pos = -100;
    ranY = Math.random() * (windowHeight*0.5 - windowHeight*0.13) + windowHeight*0.13;
    dim = Math.random() * (windowHeight*0.00000035 - windowHeight*0.00000009) + windowHeight*0.00000009;
  }
  var time = requestAnimationFrame(moveClouds);
  cancelAnimationFrame(time);
}

function drawTrunkOnFloor(){
  t = new Trunk(truckScale, 0, windowHeightMod, 90);
  let i = ceil(windowWidth/truckSuperposition);
  while(truckSuperposition*i>=0){             
    t.transform(truckScale, truckSuperposition*i,windowHeightMod-13, 90);
    t.plot();
    i--;
  }
}

function drawLeaves(index){
  if(chordsPlayed.length>0){
    mapChordsToLeaves();
    stroke(colorBranch);
    let initialAdj=5;
    let maxForBranchKey=maxtonal;
    let maxForBranchMode;
    if(maxForBranchKey<12) maxForBranchKey+=1;
    if(maxForBranchKey==0) maxForBranchKey=1;
    for(let i=0;i<maxForBranchKey;i++){
      if(i%2==0) initialAdj=windowHeightMod*0.006;
      else initialAdj=-windowHeightMod*0.006;

      let x=windowWidth/2+windowHeightMod*0.00375;

      if(comparingSongs&&index==0) x=windowWidth/4+windowHeightMod*0.00375;
      else if(comparingSongs&&index==1) x=windowWidth*3/4+windowHeightMod*0.00375;
      else x=windowWidth/2+windowHeightMod*0.00375;

      let y=branchY[i][0]+initialAdj;
      k=0;
      maxForBranchMode=maxmode[i];
      for(let j=0;j<maxForBranchMode;j++){
        line(x,y,branchX[j],branchY[i][k]);
        x=branchX[j];
        y=branchY[i][k];
        k++;
      }

      if(comparingSongs&&index==0) x=windowWidth/4+windowHeightMod*0.0025;
      else if(comparingSongs&&index==1) x=windowWidth*3/4+windowHeightMod*0.0025;
      else x=windowWidth/2+windowHeightMod*0.0025;

      y=branchY[i][0]+initialAdj;
      k=0;
      for(let j=0;j<maxForBranchMode;j++){
        line(x,y,branchXMirrored[j],branchY[i][k]);
        x=branchXMirrored[j];
        y=branchY[i][k];
        k++;
      }
    }

    if(comparingSongs) adjustWidths(index);

    //moving leaves
    for(let i=0;i<anglesForLeaves.length;i++){
      angles
    }

    //Draws the leaves
    while(chordsPlayedNoDup.length>rotationLeaves.length){
      rotationLeaves.push(0);
      moving.push(false);
    }
    for(let i=0;i<heightsForLeaves.length;i++){
      if(anglesForLeaves[i]+rotationLeaves[i]>130) moving[i]=true;
      else if(anglesForLeaves[i]+rotationLeaves[i]<50) moving[i]=false;

      if(moving[i]) rotationLeaves[i]-=0.2;
      else rotationLeaves[i]+=0.2;

      l3.transform(windowHeightMod/2500,widthsForLeaves[i],heightsForLeaves[i],anglesForLeaves[i]+rotationLeaves[i]);
      l3.plot();
      l3.transform(windowHeightMod/2500,widthsForLeavesMirrored[i],heightsForLeaves[i],anglesForLeavesMirrored[i]-rotationLeaves[i]);
      l3.plot();
    }
  }
}

function drawLittlePlant(){
  let t=new Trunk(windowHeightMod*0.00015,windowWidth*0.95,windowHeightMod,0);
  let l=new Leaf(windowHeightMod*0.0004,windowWidth*0.95+windowHeightMod*0.00015*79,windowHeightMod*0.95,70);
  t.plot();
  l.plot();
  l.transform(windowHeightMod*0.0004,windowWidth*0.95,windowHeightMod*0.95,290);
  l.plot();
  l.transform(windowHeightMod*0.0004,windowWidth*0.95+windowHeightMod*0.00015*50,windowHeightMod*0.92,20);
  l.plot();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    

function mapRootsCoord(){
      initializeRootsCoordinates();
      var offset = 605;
      var xscaling = 0.5;
      var yscaling = 0.5;
      for (var i = 0; i < xRoots.length; i++) {
      xRoots[i] = xRoots[i] - offset + windowWidth/2; 
      yRoots[i] = yRoots[i];
      }
    }
    
    
function drawRoots(){

  var rootsCanvas = document.getElementById("rootsCanvas");
    var rootsCtx  = rootsCanvas.getContext("2d");
    rootsCtx.beginPath();
    rootsCtx.moveTo(xRoots[0],yRoots[0]);
    for (var i = 1; i < xRoots.length; i++) {
        rootsCtx.lineTo(xRoots[i],yRoots[i]); 
    }
 
  rootsCtx.closePath();
     rootsCtx.fillStyle = "rgb(115,95,68)";
     rootsCtx.fill();
}

// P5 Roots 
//function drawRoots(){
//   mapRootsCoord();
  
  
//   fill(115,95,68);
//   beginShape();

//   for (var i = 0; i < xRoots.length; i++) {
//     vertex((xRoots[i]-30),(yRoots[i]-100)); 
//   }

//   endShape(CLOSE);  
// }


function drawTrunkPlant(index){
  let widthForTrunk=windowWidth/2;
  if(comparingSongs&&index==0) widthForTrunk=windowWidth/4;
  else if(comparingSongs&&index==1) widthForTrunk=windowWidth*3/4;
  
  i=0;
  t1= new Trunk(scalePlantTrunk,widthForTrunk,windowHeightMod,0);
  if(maxtonal==0) truckLength=0;
  if(maxtonal>=2) truckLength=ceil(maxtonal-maxtonal/2);
  if(maxtonal>=9) truckLength=4;
  while(i<=truckLength){
    t1.transform(scalePlantTrunk,widthForTrunk,windowHeightMod-truckPlantSuperposition*i,0);
    t1.plot();
    i++;
  }
}

function drawTrunkForText(yStart){
  beginShape();
  noFill();
  strokeWeight(1.5);
  stroke(56,87,35);
  for(let i=0;i<posTrunkOpeningx.length;i++){
    vertex(windowWidth*posTrunkOpeningx[i], windowHeightMod*posTrunkOpeningy[i]+yStart);
  }
  endShape();
}

// Synth Envelope 
var envCanvas = document.getElementById("envelopeCanvas");
var ctx  = envCanvas.getContext("2d");
var space = 3;
var xCanvas = document.getElementById("envelopeCanvas").width;
var yCanvas = document.getElementById("envelopeCanvas").height;

function envChange(Q){
    var envchange = Q*100;
    return envchange;
  }

  function drawLines(){ 
    ctx.lineWidth=  "1";
    ctx.strokeStyle = "rgb(115, 95, 68)";
    ctx.fillStyle = "rgb(115, 95, 68)";
 
    ctx.beginPath();
    ctx.moveTo(0,150);
    ctx.lineTo(envChange(A),0);
    ctx.lineTo(envChange(A),yCanvas);
    ctx.lineTo(0, yCanvas);
    ctx.fill();
    ctx.stroke();

    ctx.moveTo((envChange(A) + space),yCanvas);
    ctx.lineTo(envChange(A) + space,0);
    ctx.lineTo((envChange(A) + envChange(D)) + space ,(yCanvas - (yCanvas/100) *envChange(S)));
    ctx.lineTo((envChange(A) + envChange(D) + space) , yCanvas);
    ctx.lineTo(envChange(A) + space ,yCanvas);
    ctx.fill();
    ctx.stroke();

    ctx.moveTo(2*space + (envChange(D) + envChange(A)) , yCanvas);
    ctx.lineTo(2*space + (envChange(D) + envChange(A)) , (yCanvas - (yCanvas/100) *(envChange(S)-0.5)));
    ctx.lineTo(2*space + (envChange(D) + envChange(A) + envChange(R)) , yCanvas);
    ctx.lineTo(2*space + (envChange(D) + envChange(A)),yCanvas);
    ctx.fill();
    ctx.stroke();
 
}

drawLines();

function clearCanvas(){
    ctx.clearRect(0, 0, xCanvas, yCanvas);
  }