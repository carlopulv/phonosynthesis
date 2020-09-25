/**
 * This class draws a leaf starting from the parameters.
 * @param {Integer} size Defines the size of the leaf.
 * @param {Integer} startPointX Represent the X coordinate of the point where to start drawing.
 * @param {Integer} startPointY Represent the Y coordinate of the point where to start drawing.
 * @param {Integer} angle Defines the rotation to apply with respect to the vertical(default) leaf. The value has to be written in degrees.
 */
class Leaf{
    constructor(size, startPointX, startPointY, angle){
        this.size=size;
        this.startPointX=startPointX;
        this.startPointY=startPointY;
        this.angle=angle/180*Math.PI;
    }

    plot(){
        //triangle1
        let c3 = color(56,87,35);
        let height=36;
        let width=51;
        let hypotenuse=Math.pow(Math.pow(height,2)+Math.pow(width,2),1/2);
        let alpha=Math.PI/2-this.angle;
        let beta=Math.PI-Math.acos(width/hypotenuse)-this.angle;
        let beta2=Math.acos(width/hypotenuse)-this.angle;

        let x1=this.startPointX;
        let y1=this.startPointY;
        let x2=x1+hypotenuse*Math.cos(beta);
        let y2=y1-hypotenuse*Math.sin(beta);
        let x3=x1+height*Math.cos(alpha);
        let y3=y1-height*Math.sin(alpha);

        let x11=x1+Math.cos(this.angle);
        let y11=y1+Math.sin(this.angle);
        let x22=x11+height*Math.cos(alpha);
        let y22=y11-height*Math.sin(alpha);
        let x33=x11+hypotenuse*Math.cos(beta2);
        let y33=y11-hypotenuse*Math.sin(beta2);

        //triangle2
        let c2 = color(84,130,53);
        let height2=43;
        let width2=height2;
        let hypotenuse2=height2*Math.pow(2,1/2);
        let beta22=Math.PI-Math.acos(width2/hypotenuse2)-this.angle;
        let beta222=Math.acos(width2/hypotenuse2)-this.angle;

        let x4=x3+Math.cos(alpha);
        let y4=y3-Math.sin(alpha);
        let x5=x2+Math.cos(alpha);
        let y5=y2-Math.sin(alpha);
        let x6=x3+hypotenuse2*Math.cos(beta22);
        let y6=y3-hypotenuse2*Math.sin(beta22);


        let x44=x4+Math.cos(this.angle);
        let y44=y4+Math.sin(this.angle);
        let x55=x44+hypotenuse2*Math.cos(beta222)+Math.cos(alpha);
        let y55=y44-hypotenuse2*Math.sin(beta222)+Math.sin(alpha);
        let x66=x33+Math.cos(alpha);
        let y66=y33-Math.sin(alpha);

        //triangle3
        let c1 = color(124,162,62);
        let height3=119;

        let x7=x4+Math.cos(alpha);
        let y7=y4-Math.sin(alpha);
        let x8=x6+Math.cos(alpha);
        let y8=y6-Math.sin(alpha);
        let x9=x7+height3*Math.cos(alpha);
        let y9=y7-height3*Math.sin(alpha);
 
        let x77=x44+Math.cos(alpha);
        let y77=y44-Math.sin(alpha);
        let x88=x9+Math.cos(this.angle);
        let y88=y9+Math.sin(this.angle);
        let x99=x55+Math.cos(alpha);
        let y99=y55-Math.sin(alpha);

        noStroke();
        fill(c3);
        triangle(x1,y1,x2,y2,x3,y3);
        triangle(x11,y11,x22,y22,x33,y33);
        fill(c2);
        triangle(x4,y4,x5,y5,x6,y6);
        triangle(x44,y44,x55,y55,x66,y66);
        fill(c1);
        triangle(x7,y7,x8,y8,x9,y9);
        triangle(x77,y77,x88,y88,x99,y99);
    }
}