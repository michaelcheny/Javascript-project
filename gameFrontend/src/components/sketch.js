// class Player {
//   constructor() {
//     this.x = 50;
//     this.y = height - 50;
//   }

//   show() {
//     rect(this.x, this.y, 50, 50);
//   }
// }
let player;
function setup() {
  let myCanvas = createCanvas(1000, 900);
  myCanvas.parent("game-container");
  player = new Player();
}

function draw() {
  background(220);
  player.show();
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
