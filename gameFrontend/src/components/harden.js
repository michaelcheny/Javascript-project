class Harden {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    // this.width = 130;
    this.width = gameWidth / 7.68;
    // console.log(gameWidth / 7.68);
    // this.height = 188;
    this.height = gameHeight / 4.78;
    // console.log(gameHeight / 4.78);
    this.maxSpeed = 10;
    this.speed = 0;

    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height - 5
    };
  }

  // setDirection(direction) {
  //   this.xdir = direction;
  // }

  dashLeft() {
    this.speed = -this.maxSpeed;
  }

  dashRight() {
    this.speed = +this.maxSpeed;
  }
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
    let img = document.getElementById("harden-face");
    ctx.drawImage(img, this.position.x, this.position.y, this.width, this.height);
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(changeInTime) {
    if (!changeInTime) return;
    this.position.x += this.speed;
    if (this.position.x < 0) {
      this.position.x = 0;
    } else if (this.position.x + this.width > this.gameWidth) {
      this.position.x = this.gameWidth - this.width;
    }
  }
}
