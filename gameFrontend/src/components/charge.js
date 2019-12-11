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
    ellipse(this.x, this.y, 520, 400);
  }
}
