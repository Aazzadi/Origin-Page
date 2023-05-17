class Wave {
    constructor(x, y, r,angle,log) {
      this.x = x;
      this.y = y;
      this.pos = createVector(x,y);
      this.vel = createVector(0,0);
      this.acc = createVector(0,0);
      this.r = r;
      this.angle = angle;
      this.imgi = log;
      this.stopped =false;
      this.timer =0;
    }

    update(){
      this.timer +=0.1;
    }
  
    show() {
       if(!this.stopped){ 

       stroke(255);
       strokeWeight(1);
       push();
       translate(this.pos.x, this.pos.y);
    //noStroke();
      //fill(252, 238, 33);
     
      //ellipse(this.x, this.y, this.r * 2);
     // this.angle = map(this.y, height-60,height-175,-1,1);
      rotate(this.angle *random(2.5));//

      let r = map(sin(this.angle),-1,1,1.2,0.8)

       imageMode(CENTER);
      image(this.imgi,0,0,this.imgi.width*r, this.imgi.height*r);
      
      pop();
       }
    }
  
    move() {
      //if(this.timer >10){ 
      this.pos.y = map(sin(this.angle), -1, 1, height-60, height-70);
      this.angle += 0.03;
      //}

    //   let target = createVector(width / 2, height / 2-75);
    // this.acc = p5.Vector.sub(target, this.pos);
    // this.acc.setMag(0.1);

    // this.vel.add(this.acc);
    // this.vel.limit(8);
    // this.pos.add(this.vel);

    // this.angle += 0.03;

      
    }
    stop(){
        
        
            this.stopped = true;
            //console.log("Stopped");
      
    }

    hoverOver(){
        push();
        //this.alpha =0;  
           
        let rectW =600;
        let rectH =200;
        if ( mouseX > width / 2 - rectW / 2 &&
             mouseY > (height-100) - rectH / 2 && 
             mouseX < width / 2 + rectW / 2 &&
             mouseY < (height-100) + rectH / 2 ) {  
           //console.log("hovering");
          
           this.stop();
           for(let i =0 ; i < bio.length ;i++){
            bio[i].showText();
            bio[i].update();
           }
          //clicked =!clicked;
     
            }
           else{
            
            this.stopped = false;
           }
           pop();
      }


      isDead() {
        return this.timer >20;
      }
  }

  









