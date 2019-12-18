class App {
  constructor() {
    this.playerScores = new Player();
    this.initBindingsAndEventListeners();
    this.gameloop();
  }

  initBindingsAndEventListeners() {
    this.canvas = document.getElementById("game-container");
    this.ctx = this.canvas.getContext("2d");
    this.gameHeight = this.canvas.height;
    this.gameWidth = this.canvas.width;

    this.game = new Game(this.gameWidth, this.gameHeight);
    // this.game.start();
  }

  gameloop(timestamp) {
    this.changeInTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

    this.game.update(this.changeInTime);
    this.game.draw(this.ctx);
    // if (this.game.gameState === GAMESTATE.GAMEOVER) return;
    if (this.game.gameState === GAMESTATE.GAMEOVER) {
      let input = document.getElementById("initial-input");
      // console.log(input);
      input.style.display = "inline";
    }
    // let input = document.getElementById("initial-input");
    // console.log(input);
    // input.style.display = "inline";

    requestAnimationFrame(this.gameloop.bind(this));
  }
}
