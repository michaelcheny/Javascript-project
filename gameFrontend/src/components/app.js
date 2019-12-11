class App {
  constructor() {
    this.users = new Users();
    this.initBindingsAndEventListeners();
    this.gameloop();
  }

  initBindingsAndEventListeners() {
    const gameWidth = 1000;
    const gameHeight = 900;

    this.canvas = document.getElementById("game-container");
    this.ctx = this.canvas.getContext("2d");
    console.log(this);

    // ctx.clearRect(0, 0, 700, 388);

    let player = new Player(gameWidth, gameHeight);
    player.draw(this.ctx);
  }

  // gameloop(timestamp) {
  //   let lastTime = 0;
  //   let changeInTime = timestamp - lastTime;
  //   lastTime = timestamp;
  //   console.log(this.ctx);
  //   this.ctx.clearRect(0, 0, 1000, 900);
  //   console.log(this.player);
  // }
}
