function setup() {  
  l3=new Leaf(1,windowWidth/2,500,50);
  frameRate(15);
  colorBranch=color(56,87,35);
}

function draw() {  
  createCanvas(windowWidth, windowHeight);
  clear();
  scalePlantTrunk=truckScale/2*windowHeight/900;
  truckPlantSuperposition=truckSuperposition/2*windowHeight/900;

  //Home page
  if(game_state==0){
    t = new Trunk(0.3, 0, windowHeight, 180);
    let i = ceil(windowHeight/((920-196)*0.3));
    while(truckSuperposition*i>=0){             
      t.transform(truckScale, 0+13, truckSuperposition*i, 180 );
      t.plot();
      i--;
    } 
    l = new Leaf(1, 400, 400, angle);
    scale = windowHeight/900; 
    let j=0.3;

    if (keysshown==false){
      l.transform(scale, 12, windowHeight*j, angle+70);
      l.plot();

      document.querySelectorAll(".initial-button")[3].style.display="none";
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
        vertex(windowWidth*position_x[a], windowHeight*position_y[a]);
        a++;
      }
      endShape();
      //foglie con le keys
      a=1;
      while(a<13){  
        l.transform(scale*0.7, windowWidth*position_x[a], windowHeight*position_y[a], pos_angle[a-1]);
        l.plot();
        a++;
      }
      l.transform(scale, windowWidth*position_x[position_x.length-1] , windowHeight*position_y[position_y.length-1], angle+70);
      l.plot();
    }

    j+=0.25;
    l.transform(scale, 12, windowHeight*j, angle+70);
    l.plot();
    j+=0.25;
    l.transform(scale, 12, windowHeight*j, angle+70);
    l.plot();
  }
  //The game started
  else if(game_state==1){
    document.querySelectorAll(".button-synth")[0].style.display="block";
    t = new Trunk(truckScale, 0, windowHeight, 90);
    let i = ceil(windowWidth/truckSuperposition);
    while(truckSuperposition*i>=0){             
      t.transform(truckScale, truckSuperposition*i,windowHeight-13, 90);
      t.plot();
      i--;
    }

    initializeVarToDrawLeaves();

    for(let i=1;i<=7;i++){
      branchX.push(windowWidth/2+i*windowHeight/20); 
      branchXMirrored.push(windowWidth/2-i*windowHeight/20+5); 
    }
    for(let i=0;i<12;i++){
      branchYy=[];
      for(let j=0;j<7;j++){
        branchYy.push(windowHeight-i*windowHeight/15-branchYyAdj[j]);
      }
      branchY.push(branchYy);
    }

    //draw the leaves using the chords in ChordsPlayed
    if(chordsPlayed.length>0){
      mapChordsToLeaves();
      stroke(colorBranch);
      let initialAdj=5;
      let maxForBranchKey=maxtonal;
      let maxForBranchMode;
      if(maxForBranchKey<12) maxForBranchKey+=1;
      if(maxForBranchKey==0) maxForBranchKey=1;
      for(let i=0;i<maxForBranchKey;i++){
        if(i%2==0) initialAdj=5;
        else initialAdj=-5;
        let x=windowWidth/2+3;
        let y=branchY[i][0]+initialAdj;
        k=0;
        maxForBranchMode=maxmode[i];
        for(let j=0;j<maxForBranchMode;j++){
          line(x,y,branchX[j],branchY[i][k]);
          x=branchX[j];
          y=branchY[i][k];
          k++;
        }
        x=windowWidth/2+2;
        y=branchY[i][0]+initialAdj;
        k=0;
        for(let j=0;j<maxForBranchMode;j++){
          line(x,y,branchXMirrored[j],branchY[i][k]);
          x=branchXMirrored[j];
          y=branchY[i][k];
          k++;
        }
      }

      //Draws the leaves
      for(let i=0;i<heightsForLeaves.length;i++){
        l3.transform(windowHeight/2500,widthsForLeaves[i],heightsForLeaves[i],anglesForLeaves[i]);
        l3.plot();
        l3.transform(windowHeight/2500,widthsForLeavesMirrored[i],heightsForLeaves[i],anglesForLeavesMirrored[i]);
        l3.plot();
      }
    }

    // Draws the central trunk of the plant.
    i=0;
    t1= new Trunk(scalePlantTrunk,windowWidth/2,windowHeight,0);
    if(maxtonal==0) truckLength=0;
    if(maxtonal>=4) truckLength=maxtonal-1;
    if(maxtonal>5) truckLength=6;
    if(maxtonal==11) truckLength=7;
    while(i<=truckLength){
      t1.transform(scalePlantTrunk,windowWidth/2,windowHeight-truckPlantSuperposition*i,0);
      t1.plot();
      i++;
    }
  }
}