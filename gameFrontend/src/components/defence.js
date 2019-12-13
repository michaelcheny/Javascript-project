class Defence {
  constructor(image, startingLoc = { x: 400, y: 400 }, velocity = { x: 10, y: 10 }, size = { x: 100, y: 100 }) {
    this.size = size;
    this.location = startingLoc;
    this.velocity = velocity;
    this.img = image;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.location.x, this.location.y, this.size.x, this.size.y);
  }
}
