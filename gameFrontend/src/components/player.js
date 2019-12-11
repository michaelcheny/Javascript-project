class Player {
  constructor(gameWidth, gameHeight) {
    // this.x = width / 2 - 60;
    // this.y = height - 120;
    // this.xdir = 0;
    this.width = 150;
    this.height = 30;

    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height - 10
    };
  }

  // goLeft() {
  //   this.vx = -5;
  // }

  // goRight() {
  //   this.vx = +5;
  // }

  // setDirection(direction) {
  //   this.xdir = direction;
  // }

  // move() {
  //   this.x += this.xdir * 10;
  // }

  // show() {
  //   let leftWall = -10;
  //   let rightWall = 890;

  //   let xc = constrain(this.x, leftWall, rightWall);

  //   // image(playerImg, this.x, this.y, 120, 120);
  //   image(playerImg, xc, this.y, 120, 120);
  // }

  draw(ctx) {
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
