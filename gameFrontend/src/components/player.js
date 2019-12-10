class Player {
  constructor() {
    this.x = 150;
    this.y = height - 120;
    this.vx = 0;
  }

  moveLeft() {
    this.vx = -5;
  }

  moveRight() {
    this.vx = +5;
  }

  move() {
    this.x += this.vx;
  }

  show() {
    image(playerImg, this.x, this.y, 120, 120);
  }
}
