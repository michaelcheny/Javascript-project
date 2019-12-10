class Charge {
  constructor() {
    this.r = 160;
    this.x = width;
    this.y = height - this.r;
  }

  move() {
    this.y -= 10;
  }

  show() {
    ellipse(240, 240, 80, 80);
  }
}
