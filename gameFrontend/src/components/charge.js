class Charge {
  // constructor(image, startingLoc = { x: 400, y: 400 }, velocity = { x: 10, y: 10 }, size = { x: 100, y: 100 }) {
  constructor(gameWidth, gameHeight) {
    const randomSpawnPosition = Math.floor(Math.random() * (gameWidth - 130));

    this.gameHeight = gameHeight / 10;
    // this.speed = 100;
    this.speed = Math.random() * (130 - 90) + 90;
    this.position = {
      x: randomSpawnPosition,
      y: this.gameHeight - 200
    };
  }

  draw(ctx) {
    this.img = document.getElementById("steven-adams-charge");
    // console.log(this.img);
    ctx.drawImage(this.img, this.position.x, this.position.y, 101, 151);
  }

  update(changeInTime) {
    if (!changeInTime) return;
    this.position.y += this.speed / changeInTime;
  }
}
