class Referee {
  constructor(game) {
    this.size = {
      x: 106,
      y: 144
    };
    const randomSpawnPosition = Math.floor(Math.random() * (game.gameWidth - this.size.x));
    this.speed = Math.random() * (600 - 500) + 500;
    this.position = {
      x: randomSpawnPosition,
      y: -200
    };
    this.collided = false;
  }

  draw(ctx) {
    this.img = document.getElementById("ref");
    ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }

  update(changeInTime) {
    if (!changeInTime) return;
    this.position.y += this.speed * changeInTime / 1000;
  }
}
