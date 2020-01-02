const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

class Game {
  constructor() {
    this.gameState = GAMESTATE.MENU;
    this.gameStats = new GameStats();
    this.bindingsAndEventListener();
    this.text = new ScreenMessages();
    this.defenders = [];
    this.allCharge = [];
    this.gameObjects = [];
    this.refs = [];
    this.fouls = 2;
    this.score = 0;
    this.head = new Harden(this.gameWidth, this.gameHeight);
    this.inputHandler = new InputHandler(this.head, this);
    this.spawnFallingObjects();
    this.draw(this.ctx);
  }

  bindingsAndEventListener() {
    this.canvas = document.getElementById("game-container");
    this.ctx = this.canvas.getContext("2d");
    this.gameWidth = this.canvas.width;
    this.gameHeight = this.canvas.height;
    this.inputForm_div = document.getElementById("new-name-form");
    this.nameInput = document.getElementById("player-name");
    this.ratingInput = document.getElementById("game-rating");
    this.resetBtn = document.getElementById("reset-button");

    this.inputForm_div.addEventListener("submit", e => {
      e.preventDefault();
      this.saveGame();
    });
    this.resetBtn.addEventListener("click", this.resetGame.bind(this));
  }

  start() {
    this.gameObjects = [this.defenders, this.allCharge, this.ref];
    this.gameState = GAMESTATE.RUNNING;
    this.gameloop();
  }

  update(changeInTime) {
    this.defenders = this.defenders.filter(d => !d.collided);
    this.allCharge = this.allCharge.filter(d => !d.collided);
    this.refs = this.refs.filter(d => !d.collided);

    this.defenders = this.defenders.filter(o => o.position.y < 900);
    this.allCharge = this.allCharge.filter(o => o.position.y < 900);
    this.refs = this.refs.filter(o => o.position.y < 900);

    this.gameObjects = [this.defenders, this.allCharge, this.refs];

    if (this.fouls === 0) this.gameState = GAMESTATE.GAMEOVER;
    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER
    )
      return;

    this.head.update(changeInTime);

    for (let defender of this.defenders) {
      defender.update(changeInTime);
      const collision = new Collision(defender, this.head);
      if (collision.overlapped()) {
        this.score += 100;
        defender.collided = true;
      }
    }

    for (let charge of this.allCharge) {
      charge.update(changeInTime);
      const collision = new Collision(charge, this.head);
      if (collision.overlapped()) {
        this.fouls--;
        charge.collided = true;
      }
    }

    for (let ref of this.refs) {
      ref.update(changeInTime);
      const collision = new Collision(ref, this.head);
      if (collision.overlapped()) {
        this.fouls++;
        ref.collided = true;
        if (this.fouls > 2) this.fouls = 2;
      }
    }
  }

  draw(ctx) {
    this.head.draw(ctx);
    this.gameObjects.forEach(opponents => {
      for (let d of opponents) {
        d.draw(ctx);
      }
    });
    if (this.gameState === GAMESTATE.PAUSED) {
      this.text.showPausedMenu(ctx, this);
    }
    if (this.gameState === GAMESTATE.MENU) {
      this.text.showMainMenu(ctx, this);
    }
    if (this.gameState === GAMESTATE.GAMEOVER) {
      this.inputForm_div.style.display = "inline";
      this.resetBtn.style.display = "inline";
      this.text.showGameOver(ctx, this);
    } else {
      this.inputForm_div.style.display = "none";
      this.resetBtn.style.display = "none";
    }
    if (this.gameState !== GAMESTATE.MENU) {
      this.text.showScoreAndFouls(ctx, this, this.score, this.fouls);
    }
  }

  togglePause() {
    if (this.gameState === GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }

  async saveGame() {
    const name = this.nameInput.value;
    const score = this.score;
    const rating = this.ratingInput.value;
    await this.gameStats.adapter.saveGame(name, score, rating);
    this.gameStats.clearAllDivs();
    this.gameStats.fetchAndLoadGameStats();
  }

  resetGame() {
    this.head.position.x = this.gameWidth / 2 - this.head.size.x / 2;
    this.score = 0;
    this.fouls = 2;
    this.gameState = GAMESTATE.MENU;
    this.defenders = [];
    this.allCharge = [];
    this.refs = [];
  }

  spawnFallingObjects() {
    setInterval(() => {
      if (this.gameState === GAMESTATE.RUNNING) {
        const rand = Math.floor(Math.random() * 100);
        if (rand < 80) {
          const defence = new Defence(this);
          this.defenders.push(defence);
        }
        if (rand < 40) {
          const avoidCharge = new Charge(this);
          this.allCharge.push(avoidCharge);
        }
        if (rand < 2) {
          const ref = new Referee(this);
          this.refs.push(ref);
        }
      }
    }, 500);
  }

  gameloop(timestamp) {
    this.changeInTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

    this.update(this.changeInTime);
    this.draw(this.ctx);

    requestAnimationFrame(this.gameloop.bind(this));
  }
}
