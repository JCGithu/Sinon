var clip;
var recorder;
var y;
const samples = 128;
const cHeight = 400;
const cWidth = 1000;
const opacity = 100;
var range = 1;
var style = 1;

const { Buffer } = require('buffer');

console.log(effectFile)


function toggleSong() {
  if (clip.isPlaying()) {
    clip.pause();
  } else {
    clip.play();
    recorder.start();
  }
}
function toggleStyle() {
  if (style == 2){
    style = 1;
  } else {
    style = 2;
  }
}
function toggleRange() {
  if (range == 2){
    range = 1;
  } else {
    range = 2;
  }
}
function audioPlayed(){
  console.log('audio finished');
  recorder.stop();
  recorder.save('waveform.webm');
}

function preload(){
  clip = loadSound(data.filePaths);
}

function setup() {
  let p5canvas = createCanvas(cWidth, cHeight);
  canvas = p5canvas.canvas;

  start = createButton('Hello');
  styleButt = createButton('Style');
  rangeButt = createButton('Range');

  start.mousePressed(toggleSong);
  styleButt.mousePressed(toggleStyle);
  rangeButt.mousePressed(toggleRange);

  clip.onended(audioPlayed);
  fft = new p5.FFT(0.85,samples);
  recorder = new CanvasRecorder(canvas);
  return recorder;
}

function yRound(y){
  if (y < 100){
    y = Math.round(y - ((100 - y)*(y/100)));
  }
  y = y - 10;
  if (y < 0) {
    y = 0;
  }
};
  
function draw() {
  blendMode(BLEND);
  background(1);
  blendMode(ADD);

  var spectrum = fft.analyze();

  if (style == 1){
    waves = [
      color(256, 256, 256),
    ];
    bars = [1,70];
    ratios =[1.2];
  } else if (style == 2){
    waves = [
      color(255, 37, 37, waveOpacity),
      color(37, 37, 255, waveOpacity),
      color(37, 255, 37, waveOpacity),
    ];
    if (range == 1){
      bars = [5,8,21,25,30,33]
      ratios = [1.7,1.4,1.4];
    } else if (range == 2){
      bars = [1,1.5,3,4,6,8]
      ratios = [1.7,1.3,1.2];
    }
  }
  
  waveOpacity = Math.round(2.56*opacity);
  halfHeight = cHeight/2;
  waveOneStart = Math.round((samples/100)*bars[0]);
  waveOneEnd = Math.round((samples/100)*(100-bars[1]));
  waveTwoStart = Math.round((samples/100)*bars[2]);
  waveTwoEnd = Math.round((samples/100)*(100-bars[3]));
  waveThreeStart = Math.round((samples/100)*bars[4]);
  waveThreeEnd = Math.round((samples/100)*(100-bars[5]));

  strokeWeight(0);

  for (wave in waves){
    for (let i = 0; i < waves.length; i++) {
      if (i == 0){
        waveStart = waveOneStart;
        waveEnd = waveOneEnd;
        ratio = ratios[0];
        waveNumber = 1;
        nudge = 0;
      }
      if (i == 1){
        waveStart = waveTwoStart;
        waveEnd = waveTwoEnd;
        ratio = ratios[1];
        waveNumber = 2;
        nudge = 0;
      }
      if (i == 2){
        waveStart = waveThreeStart;
        waveEnd = waveThreeEnd;
        ratio = ratios[2];
        waveNumber = 3;
        nudge = 55;
      }
      beginShape();
      fill(waves[i]);
      curveVertex(0, halfHeight);
      curveVertex(0, halfHeight);
      for (let k = 0; k < spectrum.length-waveEnd; k++) {
        if (k < waveStart){
          continue;
        }
        var amp = spectrum[k];
        var y = map (amp, 0, 256, 0, halfHeight-20, true);
        yRound(y);
        if (style == 2){ 
          if (waveNumber !== 1){
            if (k % 3 == 0){
              y = y*1.25;
            }
          }
          if (k % 2 == 0){
            y = y/3;
          } 
        } else {
          if (k % 2 == 0){
            continue;
          }
          if (k < 40) {
            y = map (y/(200*(Math.pow((k*10), -1))), 0, cHeight, 0, halfHeight-10, true);
            if (k < 12 && k > 2){
              y = y*3;
            }
          }
        }
        curveVertex(Math.round((cWidth/(spectrum.length-waveEnd-waveStart+1))*(k+1-waveStart)-nudge), Math.round(halfHeight - (y/ratio)));
      }
      curveVertex(cWidth, halfHeight);

      if (style == 2){
        for (let j = 0; j < spectrum.length-waveEnd; j++) {
          if (j > spectrum.length - waveStart - waveEnd){
            continue;
          }
          var amp = spectrum[spectrum.length-waveEnd-j];
          var y = map (amp, 0, 256, 0, halfHeight-20, true);
          yRound(y);
          if (waveNumber !== 1){
            if (j % 3 == 0){
              y = y*1.1;
            }
          }
          if (j % 2 == 0){
            y = y/2;
          }
          if (j == 0){
            y = 0;
          }
          curveVertex(Math.round((cWidth/(spectrum.length-waveEnd-waveStart+1))*((spectrum.length-waveEnd-waveStart+1)-j)-nudge), Math.round(halfHeight + (y/ratio)));
        }
        curveVertex(0, halfHeight);
        curveVertex(0, halfHeight);
      } else {
        curveVertex(cWidth, halfHeight);
      }
    endShape();
    }
  }
}