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
    this.x += this.xdir * 8;
  }

  show() {
    image(playerImg, this.x, this.y, 120, 120);
  }
}
