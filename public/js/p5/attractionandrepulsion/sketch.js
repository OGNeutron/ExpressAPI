function Particle(x, y) {
    this.pos = createVector(x, y);
    this.prev = createVector(x, y)
    //this.vel = createVector(); 
    this.vel = p5.Vector.random2D()
    this.acc = createVector();
    // this.vel.setMag(random(2, 5));

    this.update = function () {
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.show = function () {
        stroke(255, 80);
        strokeWeight(4);
        line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

        this.prev.x = this.pos.x;
        this.prev.y = this.pos.y;
    }

    this.attracted = function (target) {
        var force = p5.Vector.sub(target, this.pos);
        var d = force.mag();
        d = constrain(d, 1, 25);
        var G = 100 // 6.67408 // -> universal constant of gravity;
        var strength = G / (d * d);
        force.setMag(strength);
        if (d < 20) {
            force.mult(-10);
        }
        this.acc.add(force);
    }

}

var attractors = [];
var particles = [];
var counter = 0;
var h1;

function setup() {

    let p = createP("Click on the canvas to create an attractor which also repulses as-well")
    p.parent('showCanvas');
    let canvas = createCanvas(600, 600);
    canvas.parent('showCanvas')

    // for (var i = 0; i < 1; i++) {
    //     particles.push(new Particle(200, 200))
    //     //particles.push(new Particle(random(width), random(height)))
    // }
    // for (var i = 0; i < 500; i++) {
    //     particles.push(new Particle(200, 200))
    //     //particles.push(new Particle(random(width), random(height)))
    // }

    // for (var i = 0; i < 10; i++) {
    //     attractors.push(createVector(random(width), random(height)));
    // }
}


function mousePressed() {
    attractors.push(createVector(mouseX, mouseY));
}

function draw() {
    background(51);
    stroke(255);
    strokeWeight(4);

    if (particles.length <= 300) {
        for (var i = 0; i < 1; i++) {
            console.log(counter++);
            particles.push(new Particle(random(width), random(height)))
            //particles.push(new Particle(random(width), random(height)))
        }
    }


    // particles.push(new Particle(random(width), random(height)));

    // if(particles.length > 100){
    //     particles.slice(0, 1);
    // }

    for (var i = 0; i < attractors.length; i++) {
        stroke(0, 255, 0);
        point(attractors[i].x, attractors[i].y);
    }
    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        for (var j = 0; j < attractors.length; j++) {
            particle.attracted(attractors[j]);
        }
        particle.update();
        particle.show();
    }
}

