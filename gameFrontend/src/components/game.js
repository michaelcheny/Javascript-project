const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.defenders = [];
    this.allCharge = [];
    this.gameObjects = [];
    this.fouls = 6;
    this.score = 0;

    this.gameState = GAMESTATE.MENU;

    this.head = new Harden(this);
    setInterval(() => {
      if (this.gameState === GAMESTATE.RUNNING) {
        const rand = Math.floor(Math.random() * 5);
        if (rand < 3) {
          const defence = new Defence(this);
          this.defenders.push(defence);
        }
        if (rand < 1) {
          const avoidCharge = new Charge(this);
          this.allCharge.push(avoidCharge);
        }
      }
    }, 500);
    this.inputHandler = new InputHandler(this.head, this);
  }

  start() {
    this.gameObjects = [this.defenders, this.allCharge];
    this.gameState = GAMESTATE.RUNNING;
  }

  update(changeInTime) {
    this.defenders = this.defenders.filter(o => o.position.y < 900);
    this.allCharge = this.allCharge.filter(o => o.position.y < 900);
    this.gameObjects = [this.defenders, this.allCharge];

    if (this.fouls === 0) this.gameState = GAMESTATE.GAMEOVER;
    if (this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU || this.gameState === GAMESTATE.GAMEOVER)
      return;

    this.head.update(changeInTime);

    for (let defender of this.defenders) {
      defender.update(changeInTime);
      const collision = new Collision(defender, this.head);
      if (collision.checkOverlap()) {
        this.score += 100;
        // console.log(this.score);
      }
    }

    for (let charge of this.allCharge) {
      charge.update(changeInTime);
      const collision = new Collision(charge, this.head);
      if (collision.checkOverlap()) {
        this.fouls--;
        // console.log(this.fouls);
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
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();
      ctx.font = "100px Arial";
      ctx.fillStyle = "yellow";
      ctx.textAlign = "center";
      ctx.fillText("Time Out", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gameState === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "60px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Click Screen to Start", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gameState === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();
      ctx.font = "100px Arial";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gameState !== GAMESTATE.MENU) {
      this.showScore(ctx);
    }
  }

  togglePause() {
    if (this.gameState == GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }

  showScore(ctx) {
    ctx.font = "20px Arial";
    // ctx.fillStyle = "yellow";
    ctx.fillText("Score: " + this.score, 75, 40);
  }
}
