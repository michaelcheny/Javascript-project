class App {
  constructor() {
    this.initBindingsAndEventListeners();
    this.gameloop();
  }

  initBindingsAndEventListeners() {
    this.canvas = document.getElementById("game-container");
    this.ctx = this.canvas.getContext("2d");
    this.gameHeight = this.canvas.height;
    this.gameWidth = this.canvas.width;

    this.inputForm_div = document.getElementById("new-name-form");
    this.nameInput = document.getElementById("player-name");
    this.ratingInput = document.getElementById("game-rating");

    this.game = new Game(this.gameWidth, this.gameHeight);
  }

  gameloop(timestamp) {
    this.changeInTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

    this.game.update(this.changeInTime);
    this.game.draw(this.ctx);

    requestAnimationFrame(this.gameloop.bind(this));
  }
}
