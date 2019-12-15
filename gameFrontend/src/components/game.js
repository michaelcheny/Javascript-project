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

    // this.gameStates = {
    //   paused: 0,
    //   running: 1,
    //   menu: 2,
    //   gameOver: 3
    // };
  }

  start() {
    this.gameState = GAMESTATE.MENU;

    if (this.gameState !== GAMESTATE.PAUSED) {
      this.head = new Harden(this);
      setInterval(() => {
        const rand = Math.floor(Math.random() * 5);
        if (rand < 3) {
          this.defence = new Defence(this);
          this.defenders.push(this.defence);
        }
        if (rand < 1) {
          this.avoidCharge = new Charge(this);
          this.allCharge.push(this.avoidCharge);
        }
      }, 500);
    }

    this.gameObjects = [this.defenders, this.allCharge];
    this.inputHandler = new InputHandler(this.head, this);
  }

  update(changeInTime) {
    // if (this.gameState == GAMESTATE.PAUSED) return;
    if (this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU) return;
    this.head.update(changeInTime);
    this.gameObjects.forEach(opponents => {
      for (let opponent of opponents) {
        opponent.update(changeInTime);
        const outOfBound = opponents.filter(o => {
          if (o.location !== undefined) o.location.y > 900;
        });
        // const lostOpponents = opponents.length - outOfBound.length;
        // this.opponents = lostOpponents;
        // delete outOfBound
      }
    });
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
  }

  togglePause() {
    if (this.gameState == GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }
}
