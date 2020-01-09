class FallingObject {
  constructor(game) {
    this.collided = false;
  }

  update(changeInTime) {
    if (!changeInTime) return;
    this.position.y += (this.speed * changeInTime) / 1000;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
  }
}
