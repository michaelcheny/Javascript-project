class Charge {
  // constructor(image, startingLoc = { x: 400, y: 400 }, velocity = { x: 10, y: 10 }, size = { x: 100, y: 100 }) {
  constructor(game) {
    // constructor(gameWidth, gameHeight) {
    const randomSpawnPosition = Math.floor(Math.random() * (game.gameWidth - 130));

    this.gameHeight = game.gameHeight / 10;
    this.size = {
      x: 100,
      y: 150
    };
    this.speed = Math.random() * (170 - 110) + 110;
    this.position = {
      x: randomSpawnPosition,
      y: this.gameHeight - 200
    };
  }

  draw(ctx) {
    this.img = document.getElementById("steven-adams-charge");
    ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }

  update(changeInTime) {
    if (!changeInTime) return;
    this.position.y += this.speed / changeInTime;
  }
}
