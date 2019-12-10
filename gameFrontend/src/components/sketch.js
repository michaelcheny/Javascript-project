let player;
let backgroundImg;
let playerImg;
let inner = edge + radius;

let leftWall = 0;
let rightWall = 900;

// let xc = constrain(player, leftWall, rightWall);

// a = 65
// d = 68
// left arrow = 37
// right arrow = 39

function preload() {
  backgroundImg = loadImage("src/images/court-background.jpg");
  playerImg = loadImage("src/images/james-harden-face.gif");
}

function setup() {
  let myCanvas = createCanvas(1000, 900);
  myCanvas.parent("game-container");
  player = new Player();
  // let constrainedPlayer = constrain(player, leftWall, rightWall);
}

function keyReleased() {
  if (key !== " ") {
    player.setDirection(0);
  }
}

function keyPressed() {
  if (keyCode === 65 || keyCode === 37) {
    player.setDirection(-1);
  } else if (keyCode === 68 || keyCode === 39) {
    player.setDirection(+1);
  }
}

function draw() {
  background(backgroundImg);

  player.show();
  player.move();
}
