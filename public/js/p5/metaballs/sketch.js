function blob() {
    var pos;
    var r;
    var vel;

    var blob = function (x, y) {
        this.pos = createVector(x, y);
        this.vel = random2D(2, 5);
        vel.mult(random(2, 5));
        r = random(120, 400);
    }

    var update = function () {
        this.pos.add(vel);
        if (this.pos.x > width || this.pos.x < 0) {
            this.vel.x *= -1;
        }
        if (this.pos.y > height || this.pos.y < 0) {
            this.vel.y *= -1;
        }
    }

    var show = function () {
        noFill();
        stroke(0);
        strokeWeight(4);
        ellipse(this.pos.x, this.pos.y, r * 2, r * 2);
    }

}

var blobs = [];

function setup() {
    var canvas = createCanvas(640, 320);
    canvas.parent('showCanvas')
    colorMode(HSB);
    for (var i = 0; i < blobs.length; i++) {
        blobs[i] = new Blob(random(width), random(height));
    }
}

function draw() {
    background(51);

    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var index = x + y * width;
            var sum = 0;
            for (var z = 0; z < blobs.length; z++) {
                let d = dist(x, y, blobs[z].pos.x, blobs[z].pos.y);
                sum += 10 * blobs[i].r / d;
            }
            pixels[index] = color(sum, 255, 255);
        }
    }

    updatePixels();

    for (var h = 0; h < blobs.length; h++) {
        blobs[h].update();
    }
}