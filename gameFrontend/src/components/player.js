class Player {
  constructor() {
    this.x = 50;
    this.y = height - 50;
  }

  show() {
    image(playerImg, this.x, this.y, 50, 50);
  }
}
