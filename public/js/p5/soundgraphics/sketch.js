var song;
var button;
var amp;
var fft;
var volHistory = [];
var w;


function preload(){
    song = loadSound('/sounds/Brian_Eno_An_Ending.mp3');
    console.log('loaded');
}

function setup(){
    button = createButton('toggle');
    button.parent('showCanvas')
    var canvas = createCanvas(512, 512);
    canvas.parent('showCanvas')
    angleMode(DEGREES);
    colorMode(HSB);

    // song = loadSong('Brian_Eno_An_Ending.mp3', () => {
    //     console.log('loaded');
    // });
    
    button.id = "btn btn-default";
    button.mousePressed(()=>{
        if (song.isPlaying()){
            song.pause();
        } else {
            song.loop();
        }
    });
    song.play();
    song.setVolume(1);
    amp = new p5.Amplitude();
    fft = new p5.FFT(0.9, 256);
    w = width / 128;
    
}

function draw(){
    background(0);
    // var vol = song.getLevel();
    // push();
    // var vol = amp.getLevel();
    var spectrum = fft.analyze();
    //console.log(spectrum.length)
    // volHistory.push(vol);
    stroke(255);
    //Graphic Equaliser
    for (var i = 0; i < spectrum.length; i++){
        var amp = spectrum[i];
        var y = map(amp, 0, 256, height, 0);
        fill(i, 255, 255);
        rect(i*w, y, w - 2, height - y);
    }
    
    noFill();
    // fill(vol, vol, vol);
    // // var currentY = map(vol, 0, 1, height, 0);
    // // translate(0, height/2 - currentY);
    // beginShape();
    // Line Grapth 
    // // for (var i = 0; i < volHistory.length; i++){
    // //     var y = map(volHistory[i], 0, 1, height/2, 0);
    // //     vertex(i, y);
    // // }
    // translate(width/2, height/2);
    // Spherical Grapth
    // for (var i = 0; i < 360; i++){
    //     var r = map(volHistory[i], 0, 1, 50, 500);
    //     var x = r * cos(i);
    //     var y = r * sin(i);
    //     vertex(x, y);
    // }
    // endShape();
    // //ellipse(width/2, height/2, width, vol*200);

    // // pop();
    // // if (volHistory.length > width - 25){
    // //     volHistory.splice(0, 1);
    // // }
    // if (volHistory.length > 360){
    //     volHistory.splice(0, 1);
    // }

    // stroke(255, 0, 0);
    // line(volHistory.length, 0, volHistory.length, height);
}