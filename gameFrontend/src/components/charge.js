class Charge {
  constructor(game) {
    this.size = {
      x: 100,
      y: 150
    };
    const randomSpawnPosition = Math.floor(Math.random() * (game.gameWidth - this.size.x));
    this.speed = Math.random() * 60 + 110;
    this.position = {
      x: randomSpawnPosition,
      y: -200
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
