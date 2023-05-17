class Text{



constructor(aText, x, y,logo){
  
    this.textPosX =x;
    this.textPosY =y;

this.txt = aText;
this.timer =0;
this.txt= aText;
this.txtSz=15;
this.alpha=0;
this.img =logo;
}

setPosition(x,y){
  this.textPosX =x;
  this.textPosY =y;
}


update(){
   //this.textPosX+=5;
   this.alpha +=0.5;
 
   
}

showText(){
    //fill(255);
   // //fill(255);
     noStroke();
   //console.log("First Event triggered")
   //stroke(255)
   textFont('Georgia');
   textSize(16); // Set the text size
   textAlign(CENTER); // Center the text horizontally and vertically
   // let y=600;
   //console.log(this.textPos);
   // y--;
   fill(255, this.alpha);
   text(this.txt, this.textPosX,this.textPosY);
 

 


}

hoverOver(){
  push();

     
  let rectW =900;
  let rectH =380;
  if ( mouseX > width / 2 - rectW / 2 &&
       mouseY > (height-100) - rectH / 2 && 
       mouseX < width / 2 + rectW / 2 &&
       mouseY < (height-100) + rectH / 2 ) {  
     console.log("hovering");
     
     
     image(this.img,this.textPosX,this.textPosY+70,this.img.width*1.5,this.img.height*1.5);
     }
     else{
      this.showText();
      
     }
     pop();
}








}