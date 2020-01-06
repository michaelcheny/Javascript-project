const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  INTRO: 4
};

class Game {
  constructor() {
    this.gameState = GAMESTATE.INTRO;
    this.gameStats = new GameStats();
    this.playerAdapter = new PlayersAdapter();
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
    this.ratingInput = document.getElementById("game-rating");
    this.resetBtn = document.getElementById("reset-button");
    this.nameForm = document.getElementById("greeting-form");
    this.nameInput = document.getElementById("player-name");
    this.ratings_Div = document.getElementById("ratings");
    this.ratings = document.getElementsByClassName("stars");
    this.gainPointSound = new Sound("./assets/sounds/points-gained-sound.wav");
    this.refWhistleSound = new Sound("./assets/sounds/referee-whistle.wav");
    this.impactGruntSound = new Sound("./assets/sounds/impact-grunt.wav");

    for (let rating of this.ratings) {
      rating.addEventListener("click", event => {
        this.saveRating(event, this.ratings);
      });
    }
    // have to use observer to set eventlistener for saving game because draw() and update() gets called every frame
    const observer = new MutationObserver(() => {
      if (this.ratings_Div.style.display == "inline") {
        this.saveGame();
      }
    });
    observer.observe(this.ratings_Div, { attributes: true });
  }

  // for use in input class, called by clicking with the game screen event listener
  start() {
    this.gameObjects = [this.defenders, this.allCharge, this.ref];
    this.gameState = GAMESTATE.RUNNING;
    this.gameloop();
  }

  // used in gameloop to update each object
  update(changeInTime) {
    // filters out the objects that collides with player
    this.defenders = this.defenders.filter(d => !d.collided);
    this.allCharge = this.allCharge.filter(d => !d.collided);
    this.refs = this.refs.filter(d => !d.collided);

    // updates the falling objects, filters out of screen objects
    this.defenders = this.defenders.filter(o => o.position.y < 900);
    this.allCharge = this.allCharge.filter(o => o.position.y < 900);
    this.refs = this.refs.filter(o => o.position.y < 900);

    this.gameObjects = [this.defenders, this.allCharge, this.refs];

    if (this.fouls === 0) this.gameState = GAMESTATE.GAMEOVER;
    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER ||
      this.gameState === GAMESTATE.INTRO
    )
      return;

    this.head.update(changeInTime);

    for (let defender of this.defenders) {
      defender.update(changeInTime);
      const collision = new Collision(defender, this.head);
      if (collision.overlapped()) {
        this.score += 100;
        this.gainPointSound.play();
        defender.collided = true;
      }
    }

    for (let charge of this.allCharge) {
      charge.update(changeInTime);
      const collision = new Collision(charge, this.head);
      if (collision.overlapped()) {
        this.fouls--;
        this.impactGruntSound.play();
        charge.collided = true;
      }
    }

    for (let ref of this.refs) {
      ref.update(changeInTime);
      const collision = new Collision(ref, this.head);
      if (collision.overlapped()) {
        this.fouls++;
        this.score += 500;
        this.refWhistleSound.play();
        ref.collided = true;
        if (this.fouls > 2) this.fouls = 2;
      }
    }
  }

  // draws each object on the game canvas
  draw(ctx) {
    // console.log(this.gameState);
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
      this.ratings_Div.style.display = "inline";
      this.text.showGameOver(ctx, this);
    } else {
      this.ratings_Div.style.display = "none";
    }
    if (this.gameState !== GAMESTATE.MENU || this.gameState !== GAMESTATE.INTRO) {
      this.text.showScoreAndFouls(ctx, this, this.score, this.fouls);
    }
    if (this.gameState === GAMESTATE.INTRO) {
      this.nameForm.style.display = "inline";
      this.text.showIntro(ctx, this);
    } else {
      this.nameForm.style.display = "none";
    }
  }

  togglePause() {
    if (this.gameState === GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }

  // saves the game when user hits submit button
  async saveGame() {
    const name = this.nameInput.value;
    const score = this.score;
    this.game = await this.gameStats.adapter.saveGame(name, score);
    this.gameStats.fetchAndLoadGameStats();
  }

  // saves the player and changes gameState to menu
  async saveName() {
    this.player = this.nameInput.value;
    await this.playerAdapter.savePlayer(this.player);
    this.gameState = GAMESTATE.MENU;
    this.draw(this.ctx);
  }

  // patch request to the game controller to update rating when clicked on star
  async saveRating(event, ratings) {
    const rating = event.target.dataset.id;
    const id = this.game.id;
    await this.gameStats.adapter.saveRating(rating, id);
    this.gameStats.renderAverageRating();
    this.stars = document.getElementById("rating-text");
    this.stars.innerText = "Thanks, press ESCAPE to retry.";
    for (const r of ratings) {
      r.dataset.id <= event.target.dataset.id
        ? (r.style.color = "rgba(255, 255, 255, 0.75)")
        : (r.style.color = "rgba(255, 255, 255, 0.5)");
    }
  }

  // resets the score and fouls and clears object off game canvas when player clicks "Play Again button"
  resetGame() {
    this.head.position.x = this.gameWidth / 2 - this.head.size.x / 2;
    this.score = 0;
    this.fouls = 2;
    this.gameState = GAMESTATE.MENU;
    this.defenders = [];
    this.allCharge = [];
    this.refs = [];
    this.stars.innerHTML = "Leave a rating:";
    for (const rating of this.ratings) {
      rating.style.color = "rgba(255, 255, 255, 0.5)";
    }
  }

  // chance of spawning object falling down every 500 Millisecond
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

  // uses requestAnimationFrame to get changeInTime
  gameloop(timestamp) {
    this.changeInTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    this.update(this.changeInTime);
    this.draw(this.ctx);
    requestAnimationFrame(this.gameloop.bind(this));
  }
}
