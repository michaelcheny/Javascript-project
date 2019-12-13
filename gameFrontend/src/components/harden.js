class Harden {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    // this.width = 130;
    this.width = gameWidth / 7.68;
    // console.log(gameWidth / 7.68);
    // this.height = 188;
    this.height = gameHeight / 4.78;
    // console.log(gameHeight / 4.78);
    this.maxSpeed = 15;
    this.speed = 0;

    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height - 5
    };
    this.inputHandler = new InputHandler(this);
  }

  dashLeft() {
    this.speed = -this.maxSpeed;
  }

  dashRight() {
    this.speed = +this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(ctx) {
    let img = document.getElementById("harden-face");
    ctx.drawImage(img, this.position.x, this.position.y, this.width, this.height);
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(changeInTime) {
    if (!changeInTime) return;
    this.position.x += this.speed;
    if (this.position.x < 0) this.position.x = 0;

    if (this.position.x + this.width > this.gameWidth) this.position.x = this.gameWidth - this.width;

    // if (this.position.x < this.gameWidth / 7) {
    // this.position.x = this.gameWidth / 7;
    // } else if (this.position.x + this.width > this.gameWidth * 0.85) {
    // this.position.x = this.gameWidth - this.width;
    // this.position.x = this.gameWidth * 0.85 - this.width;
    // } else if (this.position.x === this.gameWidth / 2 - this.width / 2 && this.speed > 0) {
    // alert("middle");
    // this.stop();
  }
}
