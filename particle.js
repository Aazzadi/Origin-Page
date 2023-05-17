class Particle {
    constructor(x, y,img,link,word) {
      this.pos = createVector(x, y);
   
    let isPositive = random(1) > 0.5;
    //code generates a random angle between -45 and 45 degrees, with an equal probability of positive and negative angles.
    let angle = random(45) * (isPositive ? 1 : -1);
    if (isPositive) {
      angle += 200-45; // angle range is now 0-90 or 90-180 degrees
    } else {
      angle -= 380-45; // angle range is now -90-0 or -180--90 degrees
    }
      //this.angle = random(-135,135);
      this.vel = p5.Vector.fromAngle(radians(angle), random(3, 5));
      
      this.acc = createVector(0, 0);
      this.size = 50;
      this.lifespan = 255;
      this.img = img;
      this.link =link;

      this.total =(random(-TWO_PI,TWO_PI));
      this.noiseMax =0;
      this.yoff=0;
      this.phase =random(0,PI);
      this.r = random(5,10);

      this.txt = word;
    }
  
    update() {
        if (this.lifespan > 0) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.lifespan -=2;
    } else {
        // set velocity to 0 when lifespan reaches 0
        this.vel.mult(0);
      }
    }
    
  
    applyForce(force) {
      this.acc.add(force);
    }
  
    show() {
      noStroke();
      fill(255);
      //ellipse(this.pos.x, this.pos.y, this.size);
      imageMode(CENTER);
      this.size= map(this.lifespan,255,0,0,50);
      image(this.img,this.pos.x,this.pos.y,this.size,this.size);
    }
  
    isDead() {
      return this.lifespan <= 0;
    }

    clicked(px,py){
        push();
       
       
       let d = dist(px ,py,this.pos.x,this.pos.y);
       //console.log(this.img.x);
       if( d < (this.size*2)){  //!this.intersects
       console.log("Clicked");
       window.open(this.link);
       //ellipse(this.pos.x,this.pos.y,this.r*4);
       }
       pop();
   }

  

  showblob(){
    // Define the word to be displayed
     
     let word = this.txt;
    push();
    translate(this.pos.x, this.pos.y);
    stroke(255);
    noFill();
    strokeWeight(1);
    this.noiseMax = map(sin((frameCount * this.total) / 500), -1, 1, 0.5, 5);
  
    //beginShape();
    let vertices = [];
    for (let a = 0; a < TWO_PI; a += 0.01) {
      let xoff = map(cos(a + this.phase), -1, 1, 0, this.noiseMax);
      let yoff = map(sin(a), -1, 1, 0, this.noiseMax);
  
      let r = map(noise(xoff, yoff), 0, 1, this.r, 100);
      let x = r * cos(a);
      let y = r * sin(a);
  
      vertex(x, y);
      vertices.push(createVector(x, y));
    }
    //endShape(CLOSE);
  
    // calculate the spacing between letters
    let spacing = this.total / word.length;
    
    // draw the letters on the vertices
    textSize(18);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < word.length; i++) {
     
      let index = floor(map(i, 0, word.length, 0, vertices.length));
       let pos = vertices[index];
  

  
      text(word.charAt(i), pos.x, pos.y);
    }
  
    pop();
    this.phase += 0.001;
  }

  hoverOver(){
      push();
       
       
       let d = dist(mouseX ,mouseY,this.pos.x,this.pos.y);
       
       if( d < (this.size*1.5)){  
       image(this.img,this.pos.x,this.pos.y,this.size,this.size);
       }
       pop();
  }
  
  
  
  }
