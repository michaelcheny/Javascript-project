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

    this.gameState = GAMESTATE.MENU;

    this.head = new Harden(this);
    // if (this.gameState !== GAMESTATE.MENU || this.gameState !== GAMESTATE.PAUSED) {
    setInterval(() => {
      if (this.gameState == GAMESTATE.RUNNING) {
        const rand = Math.floor(Math.random() * 5);
        if (rand < 3) {
          const defence = new Defence(this);
          this.defenders.push(defence);
        }
        if (rand < 1) {
          const avoidCharge = new Charge(this);
          this.allCharge.push(avoidCharge);
        }
        // console.log(this.defenders);
      }
    }, 500);
    // }
    this.inputHandler = new InputHandler(this.head, this);
  }

  start() {
    // console.log(this.gameState);
    this.gameObjects = [this.defenders, this.allCharge];
    this.gameState = GAMESTATE.RUNNING;
  }

  update(changeInTime) {
    this.defenders = this.defenders.filter(o => {
      // console.log(o);
      return o.position.y < 900;
    });

    this.allCharge = this.allCharge.filter(o => {
      return o.position.y < 900;
    });
    this.gameObjects = [this.defenders, this.allCharge];

    if (this.fouls === 0) this.gameState = GAMESTATE.GAMEOVER;
    if (this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU || this.gameState === GAMESTATE.GAMEOVER)
      return;
    this.head.update(changeInTime);
    this.gameObjects.forEach(opponents => {
      for (let opponent of opponents) {
        opponent.update(changeInTime);

        const col = new Collision(opponent, this.head);

        // if (col) console.log(opponent);
        if (col.checkOverlap()) {
          this.fouls--;
          console.log(this.fouls);
        }

        // const outOfBound = opponents.filter(o => {
        //   if (o.location !== undefined) o.location.y > 900;
        // });
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
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 2);
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
