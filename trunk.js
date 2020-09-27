/**
 * This class draws a piece of a trunk starting from the parameters.
 * @param {Integer} size Defines the size of the trunk.
 * @param {Integer} startPointX Represent the X coordinate of the point where to start drawing.
 * @param {Integer} startPointY Represent the Y coordinate of the point where to start drawing.
 * @param {Integer} angle Defines the rotation to apply with respect to the vertical(default) trunk. The value has to be written in degrees.
 */
class Trunk{
    constructor(size, startPointX, startPointY, angle){
        this.size=size;
        this.startPointX=startPointX;
        this.startPointY=startPointY;
        this.angle=angle/180*Math.PI;
    }

    plot(){
        //trunk 1
        let c3 = color(56,87,35);
        let height=279*this.size;
        let width=79*this.size;
        let hypotenuse1=Math.pow(Math.pow(height,2)+Math.pow(width/3,2),1/2);
        let alpha=Math.PI/2-this.angle;

        let x1=this.startPointX;
        let y1=this.startPointY;
        let x2=x1+width/3*Math.cos(this.angle)+hypotenuse1*Math.cos(alpha);
        let y2=y1+width/3*Math.sin(this.angle)-hypotenuse1*Math.sin(alpha);
        let x3=x1+width*Math.cos(this.angle);
        let y3=y1+width*Math.sin(this.angle);
        let x4=x1+width/3*Math.cos(this.angle)-hypotenuse1*Math.cos(alpha);
        let y4=y1+width/3*Math.sin(this.angle)+hypotenuse1*Math.sin(alpha);

        //trunk 2
        let c2 = color(84,130,53);
        let hypotenuse2=Math.pow(Math.pow(height,2)+Math.pow(width/3*2,2),1/2);
        let elevation=362*this.size;
        let shift=10*this.size;

        let x11=x1+shift*Math.cos(this.angle)+elevation*Math.cos(alpha);
        let y11=y1+shift*Math.sin(this.angle)-elevation*Math.sin(alpha);
        let x22=x11+width/3*2*Math.cos(this.angle)+hypotenuse2*Math.cos(alpha);
        let y22=y11+width/3*2*Math.sin(this.angle)-hypotenuse2*Math.sin(alpha);
        let x33=x11+width*Math.cos(this.angle);
        let y33=y11+width*Math.sin(this.angle);
        let x44=x11+width/3*2*Math.cos(this.angle)-hypotenuse2*Math.cos(alpha);
        let y44=y11+width/3*2*Math.sin(this.angle)+hypotenuse2*Math.sin(alpha);

        noStroke();
        fill(c3);
        quad(x1,y1,x2,y2,x3,y3,x4,y4);
        fill(c2);
        quad(x11,y11,x22,y22,x33,y33,x44,y44);
    }
    transform(size,startPointX,startPointY,angle){
        this.size=size;
        this.startPointX=startPointX;
        this.startPointY=startPointY;
        this.angle=angle/180*Math.PI;
    }
}