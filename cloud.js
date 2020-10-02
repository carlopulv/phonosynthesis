/**
 * This class draws a cloud starting from the parameters.
 * @param {Integer} size Defines the size of the leaf.
 * @param {Integer} startPointX Represent the X coordinate of the point where to start drawing.
 * @param {Integer} startPointY Represent the Y coordinate of the point where to start drawing.
 * @param {Integer} angle Defines the rotation to apply with respect to the vertical(default) leaf. The value has to be written in degrees.
 */
class Cloud{
    constructor(size, startPointX, startPointY){
        this.size=size;
        this.startPointX=startPointX;
        this.startPointY=startPointY;
    }

    plot(){
        let width=130*this.size;
        let height=112*this.size;
        let c1 = color(217,217,217);
        let c2 = color(242,242,242);
        let c3 = color(255,255,255);

        let x1=this.startPointX;
        let y1=this.startPointY;
        let x2=x1+width*Math.cos(Math.PI/3);
        let y2=y1-height;
        let x3=x1+width;
        let y3=y1;

        let x4=x1+width+1;
        let y4=y1;
        let x5=x2+1;
        let y5=y2;
        let x6=x5+width;
        let y6=y5;

        let x7=x4+1
        let y7=y4;
        let x8=x6+1;
        let y8=y6;
        let x9=x7+width;
        let y9=y7;

        let x10=x9+1;
        let y10=y9;
        let x11=x8+1;
        let y11=y8;
        let x12=x11+width;
        let y12=y11;

        let x13=x10+1;
        let y13=y10;
        let x14=x13+width/2;
        let y14=y13-height;
        let x15=x14;
        let y15=y13;

        let x16=x15+1;
        let y16=y13;
        let x17=x16;
        let y17=y16-height;
        let x18=x16+width/2;
        let y18=y17;

        let height2=height/3;
        let x19=x16;
        let y19=y17-1;
        let x20=x19;
        let y20=y19-height2;
        let x21=x19+width/2;
        let y21=y19;

        let x22=x19-1;
        let y22=y19;
        let x23=x22-width/2;
        let y23=y20;
        let x24=x22;
        let y24=y23;

        let height3=height2*2;
        let x25=x22-width-1;
        let y25=y22;
        let x26=x25;
        let y26=y25-height3;
        let x27=x22-1;
        let y27=y25;

        let x28=x25-1;
        let y28=y25;
        let x29=x28-width/1.74;
        let y29=y26;
        let x30=x28;
        let y30=y29;

        let x31=x28-width-1;
        let y31=y25;
        let x32=x31;
        let y32=y31-width;
        let x33=x28-1;
        let y33=y31;

        let x34=x31-1;
        let y34=y31;
        let x35=x34-width*Math.cos(Math.PI/10);
        let y35=y34-width*Math.sin(Math.PI/10);
        let x36=x34;
        let y36=y32;

        let x37=x1-1;
        let y37=y1;
        let x38=x35;
        let y38=y35+1;
        let x39=x34-1
        let y39=y34+1;


        noStroke();
        fill(c1);
        triangle(x1,y1,x2,y2,x3,y3);
        
        fill(c2);
        triangle(x4,y4,x5,y5,x6,y6);
        triangle(x13,y13,x14,y14,x15,y15);
        triangle(x22,y22,x23,y23,x24,y24);
        triangle(x28,y28,x29,y29,x30,y30);
        triangle(x37,y37,x38,y38,x39,y39);

        fill(c3);
        triangle(x7,y7,x8,y8,x9,y9);
        triangle(x10,y10,x11,y11,x12,y12);
        triangle(x16,y16,x17,y17,x18,y18);
        triangle(x19,y19,x20,y20,x21,y21);
        triangle(x25,y25,x26,y26,x27,y27);
        triangle(x31,y31,x32,y32,x33,y33);
        triangle(x34,y34,x35,y35,x36,y36);
    }
    transform(size,startPointX,startPointY){
        this.size=size;
        this.startPointX=startPointX;
        this.startPointY=startPointY;
    }
}