class Player {
  constructor() {
    this.x = width / 2 - 60;
    this.y = height - 120;
    // this.vx = 0;
    this.xdir = 0;
  }

  // goLeft() {
  //   this.vx = -5;
  // }

  // goRight() {
  //   this.vx = +5;
  // }

  setDirection(direction) {
    this.xdir = direction;
  }

  move() {
    this.x += this.xdir * 10;
  }

  show() {
    let leftWall = -10;
    let rightWall = 890;

    let xc = constrain(this.x, leftWall, rightWall);

    // image(playerImg, this.x, this.y, 120, 120);
    image(playerImg, xc, this.y, 120, 120);
  }
}
