var song;

function preload(){
  song = loadSound("audio.mp3");
}

function setup() {
  // put setup code here
  var canvas = document.getElementById("frame");
  var frameCtx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  frameCtx.fillStyle="#0f0f0f";
  frameCtx.fillRect(0,0,canvas.width,canvas.height);
  song.play();
  
}

function draw() {
  // put drawing code here
  //background(0);
}