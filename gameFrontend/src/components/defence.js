class Defence {
  // constructor(image, startingLoc = { x: 400, y: 400 }, velocity = { x: 10, y: 10 }, size = { x: 100, y: 100 }) {
  constructor(game) {
    // constructor(gameWidth, gameHeight) {
    this.game = game;
    this.size = {
      x: 130,
      y: 130
    };
    const randomSpawnPosition = Math.floor(Math.random() * (game.gameWidth - this.size.x));
    // console.log(game.gameWidth);
    // console.log(randomSpawnPosition);
    // this.gameHeight = game.gameHeight / 10;
    this.speed = Math.random() * 40 + 90;
    this.position = {
      x: randomSpawnPosition,
      y: -200
    };
  }

  draw(ctx) {
    this.img = document.getElementById("draymond-defence");
    ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }

  update(changeInTime) {
    // console.log(this.speed);
    if (!changeInTime) return;
    this.position.y += this.speed / changeInTime;
  }
}
