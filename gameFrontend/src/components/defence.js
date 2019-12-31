class Defence {
  constructor(game) {
    this.game = game;
    this.size = {
      x: 120,
      y: 120
    };
    const randomSpawnPosition = Math.floor(Math.random() * (game.gameWidth - this.size.x));
    // this.speed = Math.random() * 40 + 90;
    this.speed = Math.random() * (700 - 500) + 500;
    this.position = {
      x: randomSpawnPosition,
      y: -200
    };
    this.collided = false;
  }

  update(changeInTime) {
    if (!changeInTime) return;
    this.position.y += (this.speed * changeInTime) / 1000;
    console.log(changeInTime);
  }

  draw(ctx) {
    this.img = document.getElementById("draymond-defence");
    ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }
}
