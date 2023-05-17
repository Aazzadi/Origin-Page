class Blob{


  constructor(x,y,r){
    this.pos =createVector(x,y);
    this.r=r;
    this.vel = p5.Vector.random2D();
    this.vel.mult(0.2);
    this.noiseMax =0;
    this.total =(random(-TWO_PI,TWO_PI));
    this.yoff=0;
    this.phase =0;
    this.lifespan =255;

    this.offset =[]; //offset r by random values
    for(var i =0; i<this.total;i++){
        this.offset[i]= random(-15,5);
    }
    this.history =[];

  }



update(){
    this.pos.add(this.vel);
    


  }


render(){
  
   noStroke();
   
   push();
   translate(this.pos.x,this.pos.y);
   var xoff=0;
   beginShape();
   for(let a =0 ; a< this.total; a+=0.1){ //asteroid
       
    //Get an angle
       var angle= map(a,0,this.total,0,TWO_PI);
       
       let xoff =map(cos(a + this.phase),-1,1,0,this.noiseMax);
       this.yoff = map(sin(a),-1,1,0,this.noiseMax);
       for(var i=0;i<this.total;i++){
           this.offset[i]= map(noise(xoff+this.yoff),0,1,-25,25);
        }
        let ar = this.r + this.offset[int(a)];
        //polar to cartesian co-ordinate
       let x= ar* cos(angle);
       let y= ar* sin(angle);

       var v = createVector(x,y);
       this.history.push(v);
       vertex(x,y);

       
       blendMode(HARD_LIGHT);
       fill(200,0,200,95);
   }
   
   endShape(CLOSE);
   
   pop();

   
   //phase +=0.1;
   this.noiseMax +=0.01;
   //this.noiseMax = (random(1)>0.5)? +0.1: -0.1;

   if(this.noiseMax>=10){
       //noiseMax ==2;
       this.noiseMax*=-0.01
       this.r*=-0.0001;
      }
   }


show(){
  topLayer.push()
  topLayer.translate(this.pos.x, this.pos.y);
  //topLayer.stroke(255);
  topLayer.noStroke();
    this.noiseMax= map(sin((frameCount* this.total)/500),-1,1,0.5,5);

    topLayer.beginShape();
    for(let a=0; a<TWO_PI;a+=0.01){
        //rotate(this.noiseMax/1000);
        let xoff= map(cos(a + this.phase),-1,1,0,this.noiseMax);
        let yoff= map(sin(a),-1,1,0,this.noiseMax);

        let r = map(noise(xoff,yoff), 0,1,this.r,100);
        let x = r *cos(a);
        let y = r *sin(a);

        topLayer.vertex(x,y);
    }
    topLayer.endShape(CLOSE);




    topLayer.pop();
    this.phase +=0.001;
}



   grow(){
      
       this.r+=0.1;
       this.r =constrain(this.r,0,50);
      
       }

   edges() {
           if (this.pos.x > width - this.r) {
             this.vel.x *= -1;
           } else if (this.pos.x < this.r) {
             this.vel.x *= -1;
           }
           if (this.pos.y > height - this.r) {
             this.vel.y *= -1;
           } else if (this.pos.y < this.r) {
             this.vel.y *= -1;
           }
     } 

     seek(target){

       //var desired=p5.Vector.sub(this.poz,this.mouse);
       
       var desired= p5.Vector.sub(target,this.poz);
     
       desired.setMag(this.maxSpeed);
       var steer =p5.Vector.sub(desired,this.veloz);
       steer.limit(this.maxForce);
       
       this.applyForce(steer);
        
   }

   checkEdges() {
    if (this.pos.x + this.r*5 > 600 || this.pos.x - this.r/2 < 0) {
      this.vel.x *= -1;
    }
    if (this.pos.y + this.r*5 > 600 || this.pos.y - this.r/2 < 0) {
      this.vel.y *= -1;
    }

    let distToCenter = dist(this.pos.x, this.pos.y, width/2, height/2);
  let maxDist = 350 - this.r;
  
  // if (distToCenter > maxDist) {
  //   // calculate angle from center to blob
  //   let angle = atan2(this.pos.y - height/2, this.pos.x - width/2);
  //   // move blob to edge of circle
  //   this.pos.x = width/2 + cos(angle) * maxDist;
  //   this.pos.y = height/2 + sin(angle) * maxDist;
  //   // reflect velocity across tangent to circle
  //   let tangent = createVector(cos(angle + HALF_PI), sin(angle + HALF_PI));
  //   let dot = this.vel.dot(tangent);
  //   this.vel = p5.Vector.sub(this.vel, p5.Vector.mult(tangent, 2*dot));
  // }

  //Pending
  }

}

