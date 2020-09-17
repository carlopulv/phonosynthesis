function setup() {
    createCanvas(windowWidth, windowHeight);
  }
  
  function draw() {
    background(100, 100, 100);
  //position of leaves: position([x],[y],relative);??
   /* s = 1 fattore di scala della foglia
    triangle(50*s, 1*s, 15*s, 50*s, 50*s, 50*s);
    triangle(51*s, 1*s, 51*s, 50*s, 90*s, 5*s);
    triangle(52*s, 50*s, 91*s, 6*s, 160*s, 50*s);*/  //metà foglia, come flipparla??
    /*tronco a lato del menù*/
    beginShape();
    vertex(0, 0);
    vertex(0, 50);
    vertex(15, 150);
    vertex(30, 0);
    endShape(CLOSE);
    triangle(0, 50, 0, 250, 20, 150);
    beginShape();
    vertex(0, 250);
    vertex(11, 200);
    vertex(30, 320);
    vertex(0, 320);
    endShape(CLOSE);
    beginShape();
    vertex(0, 320);
    vertex(0, 430);
    vertex(10, 480);
    vertex(30, 320);
    endShape(CLOSE);
    triangle(0, 380, 0, 575, 20, 475);
    beginShape();
    vertex(0, 575);
    vertex(12, 520);
    vertex(35, 600);
    vertex(0, 600);
    endShape(CLOSE);
    }
  
  
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }