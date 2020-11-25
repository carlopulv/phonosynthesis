function setup() {  
  l3=new Leaf(1,windowWidth/2,500,50);
  frameRate(20);
  colorBranch=color(56,87,35);
  windowHeightMod=windowHeight;
}

function draw() {  
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
  createCanvas(windowWidth, windowHeightMod);
  clear();
  scalePlantTrunk=truckScale/2*windowHeightMod/900;
  truckPlantSuperposition=truckSuperposition/2*windowHeightMod/900;

  //Home page
  if(game_state==0){
    l = new Leaf(1, 400, 400, angle);
    scale = windowHeightMod/900; 
    let j=0.3;

    if (keysshown==false){
      l.transform(scale, 12, windowHeightMod*j, angle+70);
      l.plot();

      document.querySelectorAll(".initial-button")[3].style.display="none";
      document.querySelectorAll(".initial-button")[0].style.display="block";

    }
    else{
      document.querySelectorAll(".initial-button")[0].style.display="none";
      document.querySelectorAll(".initial-button")[3].style.display="block";

      //disegna ramo
      initializePosAngleToDrawTrunk();

      beginShape();
      noFill();
      strokeWeight(2);
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
      l.transform(scale, windowWidth*position_x[position_x.length-1] , windowHeightMod*position_y[position_y.length-1], angle+70);
      l.plot();
    }

    let xSecondLeave=12;
    if(openingFile==true){
      document.querySelectorAll(".textarea-songs")[0].style.display="block";
      document.querySelectorAll(".initial-button")[1].style.display="none"
      document.querySelectorAll(".initial-button")[4].style.display="block";
      xSecondLeave=12+windowWidth*0.3;
    }else{
      document.querySelectorAll(".initial-button")[4].style.display = "none";
      document.querySelectorAll(".textarea-songs")[0].style.display = "none";
      document.querySelectorAll(".initial-button")[1].style.display = "block";
      document.querySelectorAll(".textarea-songs")[0].innerText = "Artist - Title";
    }
    j+=0.25;
    l.transform(scale, xSecondLeave, windowHeightMod*j, angle+70);
    l.plot();

    let xThirdLeave=12;
    if(comparingSongs){
      document.querySelectorAll(".textarea-songs")[1].style.display="block";
      document.querySelectorAll(".textarea-songs")[2].style.display="block";
      document.querySelectorAll(".initial-button")[2].style.display="none";
      document.querySelectorAll(".initial-button")[5].style.display="block";
      //document.querySelectorAll(".initial-button")[6].style.display="block";
      xThirdLeave=12+windowWidth*0.3;

      j+=0.21;
      l.transform(scale, xThirdLeave, windowHeightMod*j, angle+70);
      l.plot();
      j+=0.1;
      l.transform(scale, xThirdLeave, windowHeightMod*j, angle+70);
      l.plot();

    }else{
      document.querySelectorAll(".textarea-songs")[1].innerText = "Artist - Title";
      document.querySelectorAll(".textarea-songs")[2].innerText = "Artist - Title";
      document.querySelectorAll(".initial-button")[2].style.display="block";
      document.querySelectorAll(".textarea-songs")[1].style.display = "none";
      document.querySelectorAll(".textarea-songs")[2].style.display = "none";
      document.querySelectorAll(".initial-button")[5].style.display = "none";
      //document.querySelectorAll(".initial-button")[6].style.display = "none";
      j+=0.25;
      l.transform(scale, xThirdLeave, windowHeightMod*j, angle+70);
      l.plot();
    }

    t = new Trunk(0.3, 0, windowHeightMod, 180);
    let i = ceil(windowHeightMod/((920-196)*0.3));
    while(truckSuperposition*i>=0){             
      t.transform(truckScale, 0+13, truckSuperposition*i, 180 );
      t.plot();
      i--;
    } 
  }
  //The game started
  else if(game_state==1){
    keys_list.style.display = "none";
    document.querySelectorAll(".initial-button")[0].style.display = "none";
    document.querySelectorAll(".initial-button")[1].style.display = "none";
    document.querySelectorAll(".initial-button")[2].style.display = "none";
    document.querySelectorAll(".initial-button")[3].style.display = "none";
    document.querySelectorAll(".initial-button")[4].style.display = "none";
    document.querySelectorAll(".textarea-songs")[0].style.display = "none";
    document.querySelectorAll(".container-options")[0].style.display="flex";

    drawTrunkOnFloor();
    initializeVarToDrawLeaves();
    drawLeaves(0);  
    drawTrunkPlant(0);   
  }
  //Compare mode
  else if(game_state==2){
    document.querySelectorAll(".initial-button")[0].style.display = "none";
    document.querySelectorAll(".initial-button")[1].style.display = "none";
    document.querySelectorAll(".initial-button")[5].style.display = "none";
    document.querySelectorAll(".textarea-songs")[1].style.display = "none";
    document.querySelectorAll(".textarea-songs")[2].style.display = "none";
    
    drawTrunkOnFloor();
    for(let i=0;i<songs.length;i++){
      initializeVarToDrawLeaves();
      adjustBranchX(i);
      extractDataForComparing(i);
      drawLeaves(i); 
      drawTrunkPlant(i);
    }
  }
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

    //Draws the leaves
    for(let i=0;i<heightsForLeaves.length;i++){
      l3.transform(windowHeightMod/2500,widthsForLeaves[i],heightsForLeaves[i],anglesForLeaves[i]);
      l3.plot();
      l3.transform(windowHeightMod/2500,widthsForLeavesMirrored[i],heightsForLeaves[i],anglesForLeavesMirrored[i]);
      l3.plot();
    }
  }
}

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

//synth fra
var envCanvas = document.getElementById("envelopeCanvas");
var ctx  = envCanvas.getContext("2d");
var space = 5;

function envChange(Q){
    var envchange = Q*100;
    return envchange;
  }

  function drawLines(){ 
   /*ctx.lineWidth=  "0.5";
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
   ctx.stroke();*/
   

    ctx.lineWidth=  "1";
    ctx.strokeStyle = "rgb(115, 95, 68)";
    ctx.fillStyle = "rgb(115, 95, 68)";
    
    ctx.beginPath();
    ctx.moveTo(0,150);
    ctx.lineTo(envChange(A),0);
    ctx.lineTo(envChange(A),300);
    ctx.lineTo(300,150);
    ctx.fill();
    ctx.stroke();

    ctx.moveTo((envChange(A) + space),150);
    ctx.lineTo(envChange(A) + space,0);
    ctx.lineTo((envChange(D) + envChange(A)) + space ,(150 - 1.5 *envChange(S)));
    ctx.lineTo((space + envChange(D) + envChange(A)) , 300);
    ctx.lineTo(envChange(A) + space ,150);
    ctx.fill();
    ctx.stroke();

    ctx.moveTo(space + (envChange(D) + envChange(A)) + space , 150);
    ctx.lineTo(space + (envChange(D) + envChange(A)) + space , (150 - 1.5 *envChange(S)));
    ctx.lineTo(2*space + (envChange(D) + envChange(A) + envChange(R)) , 150);
    ctx.lineTo((envChange(D) + envChange(A)) , 300) ;
    ctx.lineTo(space + (envChange(D) + envChange(A)),150);
    ctx.fill();
    ctx.stroke();
 
}

/*function drawCircles(){  
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

drawCircles();*/
drawLines();

function clearCanvas(){
    ctx.clearRect(0, 0, 300, 150);
  }