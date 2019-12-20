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
    this.refs = [];
    this.fouls = 6;
    this.score = 0;

    this.gameState = GAMESTATE.MENU;
    // let lives = new Lives(this);
    // this.lives = [];

    // this.lives = new Lives(this);
    // console.log(this.lives);
    this.head = new Harden(this);
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
    this.inputHandler = new InputHandler(this.head, this);
  }

  start() {
    this.gameObjects = [this.defenders, this.allCharge];
    this.gameState = GAMESTATE.RUNNING;
  }

  update(changeInTime) {
    this.defenders = this.defenders.filter(o => o.position.y < 900);
    this.allCharge = this.allCharge.filter(o => o.position.y < 900);
    this.refs = this.refs.filter(o => o.position.y < 900);

    this.defenders = this.defenders.filter(d => !d.collided);
    this.allCharge = this.allCharge.filter(d => !d.collided);
    this.refs = this.refs.filter(d => !d.collided);

    this.gameObjects = [this.defenders, this.allCharge, this.refs];

    if (this.fouls === 0) this.gameState = GAMESTATE.GAMEOVER;
    if (this.gameState === GAMESTATE.PAUSED || this.gameState === GAMESTATE.MENU || this.gameState === GAMESTATE.GAMEOVER)
      return;

    this.head.update(changeInTime);

    for (let defender of this.defenders) {
      defender.update(changeInTime);
      const collision = new Collision(defender, this.head);
      if (collision.checkOverlap()) {
        this.score += 100;
        defender.collided = true;
      }
    }

    for (let charge of this.allCharge) {
      charge.update(changeInTime);
      const collision = new Collision(charge, this.head);
      if (collision.checkOverlap()) {
        this.fouls--;
        charge.collided = true;
      }
    }

    for (let ref of this.refs) {
      ref.update(changeInTime);
      const collision = new Collision(ref, this.head);
      if (collision.checkOverlap()) {
        this.fouls++;
        ref.collided = true;
        if (this.fouls > 6) this.fouls = 6;
      }
    }
  }

  draw(ctx) {
    // this.lives.draw(ctx);
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
      this.showScoreAndFouls(ctx);
    }
  }

  togglePause() {
    if (this.gameState == GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }

  showScoreAndFouls(ctx) {
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    // ctx.fillStyle = "yellow";
    ctx.fillText("Score: " + this.score, 100, 40);
    ctx.fillText("Fouls Remaining: " + this.fouls, this.gameWidth - 140, 40);
    // const lives = document.getElementById("lives");
    // let live1 = ctx.drawImage(lives, this.gameWidth - 50, 30, 30, 57);
    // let live2 = ctx.drawImage(lives, this.gameWidth - 80, 30, 30, 57);
    // let live3 = ctx.drawImage(lives, this.gameWidth - 110, 30, 30, 57);
    // let live4 = ctx.drawImage(lives, this.gameWidth - 140, 30, 30, 57);
    // let live5 = ctx.drawImage(lives, this.gameWidth - 170, 30, 30, 57);
    // let live6 = ctx.drawImage(lives, this.gameWidth - 200, 30, 30, 57);
    // this.lives.push(live1, live2, live3, live4, live5, live6);
    // console.log(this.lives);
    // console.log(this.lives);
  }
}
