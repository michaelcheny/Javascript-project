class Defence {
  constructor(game) {
    this.game = game;
    this.size = {
      x: 130,
      y: 130
    };
    const randomSpawnPosition = Math.floor(Math.random() * (game.gameWidth - this.size.x));
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
    if (!changeInTime) return;
    this.position.y += this.speed / changeInTime;
  }
}
