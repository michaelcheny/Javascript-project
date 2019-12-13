class Defence {
  // constructor(image, startingLoc = { x: 400, y: 400 }, velocity = { x: 10, y: 10 }, size = { x: 100, y: 100 }) {
  constructor(gameWidth, gameHeight) {
    // this.size = size;
    // this.location = startingLoc;
    // this.velocity = velocity;
    // this.img = image;
    this.gameWidth = gameWidth;
    this.gameWidth = gameWidth / 10;
    this.gameHeight = gameHeight / 10;
    this.speed = 100;
    this.position = {
      // x: gameWidth / 2 - this.width / 2,
      x: 400,
      // y: gameHeight - this.height - 5
      y: this.gameHeight - 200
    };
  }

  fall() {}

  draw(ctx) {
    this.img = document.getElementById("draymond-defence");
    ctx.drawImage(this.img, this.position.x, this.position.y, 130, 130);
  }

  update(changeInTime) {
    if (!changeInTime) return;
    this.position.y += this.speed / changeInTime;
  }
}
