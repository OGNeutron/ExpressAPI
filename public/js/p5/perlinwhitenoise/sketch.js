//var xoff1 = 0;
//var xoff2 = 10000;

function Particle(){
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 4;

    this.prevPos = this.pos.copy();

    this.update = function(){
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);

        this.acc.mult(0);

    }

    this.applyForce = function(force){
        this.acc.add(force);
    }

    this.show = function(){
        stroke(0, 5);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        //point(this.pos.x, this.pos.y);
        this.updatePrev();
    }

    this.updatePrev = function(){
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    this.edges = function(){
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();     
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();  
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();  
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();  
        }
    }

    this.follow = function(vectors){
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);

        var index = x + y * cols;
        var force = vectors[index];
        this.applyForce(force);
    }
}

var inc = 0.1;
var scl = 10;
var cols, rows
// var start = 0;
var fr;

var zoff = 0;

var particles = [];
var flowfield;

function setup() {
  var canvas = createCanvas(640, 320);
  canvas.parent('showCanvas')
  cols = floor(width/scl);
  rows = floor(height/scl);

  fr = createP();

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 1000; i++){
      particles[i] = new Particle;
  }
  background(255)
}

function draw() {
    var yoff = 0;

    for (var y = 0; y < rows; y++){
        var xoff = 0;
        for (var x = 0; x < cols; x++){
            var index = x + y * cols;
            var angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowfield[index] = v;
            xoff += inc;

            stroke(0, 50);
            // push();
            // translate(x * scl, y * scl);
            // rotate(v.heading());
            // strokeWeight(1);
            // line(0, 0, scl, 0);

            // pop();
            //rect(x * scl, y * scl, scl, scl);

        }
        yoff += inc;

        zoff += 0.0005;
    }

    for (var i = 0; i < particles.length; i++){
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].show();
        particles[i].edges();
    }
    
    fr.html(floor(frameRate()));

}

//  loadPixels()
//     for (var y = 0; y < width; y++){
//         var xoff = 0;
//         for (var x = 0; x < height; x++){
//             var index = (x + y * width) * 4;
//             var r = random(255);
//             pixels[index+0] = r;
//             pixels[index+1] = r;
//             pixels[index+2] = r;
//             pixels[index+3] = 255;

//             xoff += inc;

//         }
//         yoff += inc;
//     }
//     updatePixels();

// var yoff = 0;

// for (var y = 0; y < rows; y++){
//     var xoff = 0;
//     for (var x = 0; x < cols; x++){
//         var index = (x + y * width) * 4;
//         var r = noise(xoff, yoff) * 255;

//         xoff += inc;

//         fill(random(255))
//         rect(x * scl, y * scl, scl, scl);

//     }
//     yoff += inc;
// }