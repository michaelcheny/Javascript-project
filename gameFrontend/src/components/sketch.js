let player;
let backgroundImg;
let playerImg;

function preload() {
  backgroundImg = loadImage("src/images/court-background.jpg");
  playerImg = loadImage("src/images/james-harden-face.gif");
}

function setup() {
  let myCanvas = createCanvas(1000, 900);
  myCanvas.parent("game-container");
  player = new Player();
}

function keyPressed() {
  // if (key === "a") {
  if (keyIsDown(65)) {
    player.moveLeft();
    // } else if (key === "d") {
  } else if (keyIsDown(68)) {
    player.moveRight();
  }
  clear();
}

function draw() {
  background(backgroundImg);
  player.show();
  player.move();
}

// let model;
// function setup() {
//   createCanvas(800, 900);
//   model = new model();
// }

// function draw() {
//   background(300);
//   model.show();
// }
