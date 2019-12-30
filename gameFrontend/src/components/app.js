class App {
  constructor() {
    // this.playerScores = new Player();
    this.gameStats = new GameStats();
    this.initBindingsAndEventListeners();
    this.gameloop();
  }

  initBindingsAndEventListeners() {
    this.canvas = document.getElementById("game-container");
    this.ctx = this.canvas.getContext("2d");
    this.gameHeight = this.canvas.height;
    this.gameWidth = this.canvas.width;

    // this.nameInput_div = document.getElementById("initial-input");
    this.inputForm_div = document.getElementById("new-name-form");

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
      // this.nameInput_div.style.display = "inline";
      this.inputForm_div.style.display = "inline";
      this.inputForm_div.addEventListener("submit", e => {
        e.preventDefault();
        // ("addfunctiontoallowposttobackend");
      });
    }
    // let input = document.getElementById("initial-input");
    // console.log(input);
    // input.style.display = "inline";

    requestAnimationFrame(this.gameloop.bind(this));
  }
}
