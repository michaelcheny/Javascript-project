class App {
  constructor() {
    this.playerScores = new Player();
    // this.players = new Player(this.playerScoresAdapter);
    this.initBindingsAndEventListeners();
    this.gameloop();
  }

  initBindingsAndEventListeners() {
    this.canvas = document.getElementById("game-container");
    this.ctx = this.canvas.getContext("2d");
    this.gameHeight = this.canvas.height;
    this.gameWidth = this.canvas.width;
    // console.log(this.gameHeight);
    this.head = new Harden(this.gameWidth, this.gameHeight);
    this.head.draw(this.ctx);
  }

  gameloop(timestamp) {
    this.changeInTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

    this.head.update(this.changeInTime);
    this.head.draw(this.ctx);
    // console.log(this.ctx);
    // this.ctx.clearRect(0, 0, 1000, 900);
    requestAnimationFrame(this.gameloop.bind(this));
  }
}
