let img1,stamp,logo;
let asteroids = [];
var numBlobs =10;
let blobs;
let topLayer;
let textLayer;
let scl=0.8;



let bio =[];
let bt;
let em;

let particles = [];
let clicked = false;

let images = []; 
let motifs =[];

let table;
let data;
let linkStore=[];
let firstColumnData = [];

let canvas;
let timer =0;

let circles =[];
let numCircles =6;
let total = 6;
let xSpacing =60;

let totalParticles =6;


//let lastTriggerTime = 0;
//let triggerInterval =8000; // 2 seconds in milliseconds

let message = `

Step into the lab, venture through its gate,
Where wonders lie, ready to captivate.
Explore the enchanted elements with care,
Connecting with the creator, beyond compare.`;



function preload(){
 img1 =loadImage("data/Logo-06.png");
 stamp =loadImage("data/Logo-07.png");
 //logo = loadImage("data/azlg.png")

 for (let i = 0; i <= 6; i++) {
  let imageName = "data/sml" + i + ".png"; // create image name string


  let img = loadImage(imageName); // load the image
  
  images.push(img); // add the loaded image to the array
  //console.log(images)
  }

  for (let j = 0; j <= 5; j++) {
    
    let motifName = 'data/mor' + j + '.png';
    let mot = loadImage(motifName);
  
    motifs.push(mot);
    //console.log(motifs.length);
   
    }

 

  table = loadTable('data/links.csv', 'csv');

}



function setup() {
  
  canvas =createCanvas(window.innerWidth, window.innerHeight);

 
  topLayer = createGraphics(800,800);
  
  topLayer.blendMode(REMOVE);

 
  for(let i = 0; i<=numBlobs; i++){
     asteroids.push
      (new Blob(topLayer.width/2+ random(-50,50),topLayer.height/2+random(-50,50),random(5,10)));
      }

for (let i = 0; i < table.getRowCount(); i++) {
    let row = table.getRow(i);
    let rowData = row.arr;
    let firstColumnValue = rowData[0]; // get data from first column
  firstColumnData.push(firstColumnValue); // store data in firstColumnData array
    data = row.arr.slice(1); // ignore first column
    linkStore.push(data); 
    // use data for each row
     //console.log(firstColumnData);
    }

    bt = new Text(message,canvas.width *0.5,canvas.height-170,logo);
    
   //canvas.width *0.5,canvas.height-170,logo);
    
    bio.push(bt);
   //----------------------
  
   
   for (let i = 0; i < total ; i++) {
    let angle = map(i, 0, total, 1, 2 * TWO_PI);
     circles.push(new Wave((width/2-xSpacing*2.5) + i * xSpacing, height -60, 22,angle,motifs[i]));
   }

  //  for (let i = 0; i < total; i++) {
  //   let angle = random(0, TWO_PI);
  //   let radius = random(300, 250);
  //   let a = map(i, 0, total, 1, 2 * TWO_PI);

  //   let x = width / 2 + radius * cos(angle);
  //   let y = height / 2 + radius * sin(angle) -75;

  //   let point = new Wave(x,y,22,a,motifs[i]);
  //   circles.push(point);
  //  }
}

function draw() {
  background(0);

   //-----------------Fireworks Links----------
 for (let i = particles.length - 1; i >= 0; i--) {
  let p = particles[i];
  p.update();
  p.showblob();
  p.hoverOver();
  // if (p.isDead()) {
  //   particles.splice(i, 1);
  // }
 }
 timer+=0.1;
 //console.log(timer);
  if(timer>10 && !clicked){
  clicked =true;
   triggerParticles();
  
  }
  //if(timer>10){
    //triggerBlobs();
  //}
  imageMode(CENTER);

  //imp-------------------------
  push();
  image(img1,width/2,height/2-75,500,500);
  textSize(5)
  stroke(255);

  

  pop();


    topLayer.imageMode(CENTER)
    topLayer.blendMode(BLEND);
    
   
    
    //imp--------------------------------
    topLayer.image(stamp, topLayer.width/2, topLayer.height/2-60, stamp.width*scl, stamp.height*scl);

    topLayer.blendMode(REMOVE);
    if(mouseIsPressed){
      // push();
      // //translate(width/2,height/2);
      // // topLayer.line(pmouseX, pmouseY, mouseX+50, mouseY);
      // topLayer.ellipseMode(CENTER)
      // topLayer.ellipse(pmouseX-500, pmouseY,150);
      // pop();
    }
  
  
 push();
  noFill();
  stroke(255,80);
  ellipse(width/2,height/2 -75,420);
  
  rectMode(CENTER);
  

  isMouseInsideCircle();
  
  
  for(let i =0 ; i < asteroids.length ;i++){
    asteroids[i].show();
    ////asteroids[i].grow();
    asteroids[i].update();
    asteroids[i].checkEdges();
  
}
  
  
  
  //imp
  image(topLayer,width/2,height/2,stamp.width*2,stamp.height*2)

 

  //---------------About me text-----------------------

  if(clicked){
    for(let i =0 ; i < bio.length ;i++){
      bio[i].showText();
      
      bio[i].update();
      
     }
    
  }else{

for (let i = 0; i < circles.length; i++) {
  let c = circles[i];
  c.show();
  //if(timer>7){
  c.move();
  c.hoverOver();
  //}

   if (c.isDead()) {
      circles.splice(i, 1);
      

   }
}

  }


 

}


function isMouseInsideCircle(){

  push();
     
      //topLayer.ellipseMode(CENTER)
      topLayer.ellipse(mouseX-500, mouseY,150);
      pop();
  if (dist(mouseX, mouseY, width / 2, height / 2-75) < 525/2  && !clicked ) {// 
    for (let i = 0; i < totalParticles; i++) {

      let p = new Particle(width / 2, height / 2-75,images[i % images.length],linkStore[i],firstColumnData[i]);
     
      particles.push(p);
    }

  
  
  
    clicked =true;
  }
}
function mousePressed(){
 
  for (var i=0;i<particles.length;i++){
   
    var particle=particles[i];
    particle.clicked(mouseX, mouseY);
  }

 

}

function triggerBlobs(){
  
}

function triggerParticles(){
  for (let i = 0; i < totalParticles; i++) {

    let p = new Particle(width / 2, height / 2-75,images[i % images.length],linkStore[i],firstColumnData[i]);
    clicked= true;
    particles.push(p);
  }
  
  


}



function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  
  bt.setPosition(canvas.width * 0.5, canvas.height - 170);

  // let xSpacing = 100;
  // for (let i = 0; i < total; i++) {
  //   circles[i].x = (width/2-xSpacing*2.5) + i * xSpacing;
  // }
}