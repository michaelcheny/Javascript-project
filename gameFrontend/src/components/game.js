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

    this.gameState = GAMESTATE.MENU;

    // if (this.gameState !== GAMESTATE.PAUSED) {
    this.head = new Harden(this);
    if (this.gameState !== GAMESTATE.MENU || this.gameState !== GAMESTATE.PAUSED) {
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
    // }
    this.inputHandler = new InputHandler(this.head, this);
  }

  start() {
    // this.gameState = GAMESTATE.MENU;

    // if (this.gameState !== GAMESTATE.PAUSED) {
    //   this.head = new Harden(this);
    //   setInterval(() => {
    //     const rand = Math.floor(Math.random() * 5);
    //     if (rand < 3) {
    //       this.defence = new Defence(this);
    //       this.defenders.push(this.defence);
    //     }
    //     if (rand < 1) {
    //       this.avoidCharge = new Charge(this);
    //       this.allCharge.push(this.avoidCharge);
    //     }
    //   }, 500);
    // }

    console.log(this.gameState);
    this.gameObjects = [this.defenders, this.allCharge];

    this.gameState = GAMESTATE.RUNNING;

    // this.defenders.forEach(defender => {
    //   const col = new Collision(defender, this.head);
    // });

    // const col = new Collision(this.game.head, this.head);

    // this.inputHandler = new InputHandler(this.head, this);
  }

  update(changeInTime) {
    // if (this.gameState == GAMESTATE.PAUSED) return;
    if (this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU) return;
    this.head.update(changeInTime);
    this.gameObjects.forEach(opponents => {
      for (let opponent of opponents) {
        opponent.update(changeInTime);
        // const col = new Collision(opponent, this.head);
        // console.log(opponent);
        const outOfBound = opponents.filter(o => {
          if (o.location !== undefined) o.location.y > 900;
        });
      }
    });

    this.defenders.forEach(defender => {
      if (defender.position.y < 900) {
        const col = new Collision(defender, this.head);
      }
      // if (col) {
      // add point
      // }
    });
    // this.allCharge.forEach(defender => {
    //   const col = new Collision(this.head, defender);
    // });
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
  }

  togglePause() {
    if (this.gameState == GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }
}
