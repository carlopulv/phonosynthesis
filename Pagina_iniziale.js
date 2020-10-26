//CANCELLARE

function setup() {
    createCanvas(windowWidth, windowHeight);
  }
  
  function draw() {
    background(100, 100, 100);
    t = new Trunk(0.3, 0, windowHeight, 0);
    let i=0;
    do{
      t.transform(0.3, windowHeight-13, (920-196)*0.3*i, 0 );
      t.plot();

    }while((920-196)*0.3*i<windowWidth);
  }
    
  
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }