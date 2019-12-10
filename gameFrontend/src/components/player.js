class Player {
  constructor() {
    this.x = width / 2 - 60;
    this.y = height - 120;
    this.vx = 0;
  }

  goLeft() {
    this.vx = -5;
    // if (this.x < 0) this.x = 0;
  }

  goRight() {
    this.vx = +5;
  }

  move() {
    this.x += this.vx;
  }

  // stayStill() {
  //   this.vx = 0;
  //   this.x = 0;
  // }

  show() {
    image(playerImg, this.x, this.y, 120, 120);
  }
}
