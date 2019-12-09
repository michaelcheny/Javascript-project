class Player {
  constructor() {
    this.x = 150;
    this.y = height - 120;
  }

  show() {
    image(playerImg, this.x, this.y, 120, 120);
  }
}
