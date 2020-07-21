const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  GAMEOVER: 2,
  INTRO: 3,
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
    this.flopMode = true;
    this.refs = [];
    this.fouls = 2;
    this.score = 0;
    this.changeInstruction();
    this.spawnFallingObjects();
    this.draw(this.ctx);
  }

  bindingsAndEventListener() {
    this.canvas = document.getElementById("game-container");
    this.ctx = this.canvas.getContext("2d");
    this.gameWidth = this.canvas.width;
    this.gameHeight = this.canvas.height;
    this.resetBtn = document.getElementById("reset-button");
    this.introDiv = document.getElementById("greeting-form");
    this.nameInput = document.getElementById("player-name");
    this.playerDog = document.getElementById("dog");
    this.playerHardem = document.getElementById("harden");
    this.gameoverDiv = document.getElementById("gameover");
    this.gameoverScore = document.getElementById("end-score");
    this.nameForm = document.getElementById("name-form");
    this.resetDiv = document.getElementById("thanks-div");
    this.instructions = document.getElementById("instructions");
    this.gainPointSound = new Sound("./assets/sounds/points-gained-sound.wav");
    this.refWhistleSound = new Sound("./assets/sounds/referee-whistle.wav");
    this.impactGruntSound = new Sound("./assets/sounds/impact-grunt.wav");

    // this.gameMusic = new Sound("./assets/sounds/solvethepuzzle.ogg");
    // this.gameMusic.sound.loop = true;
    // this.gameMusic.sound.volume = 0.05;

    this.playerDog.addEventListener("click", () => {
      this.flopMode = false;
      this.head = new Harden(this.gameWidth, this.gameHeight, this.flopMode);
      this.inputHandler = new InputHandler(this.head, this);
      this.selectCharacter();
    });

    this.playerHardem.addEventListener("click", () => {
      this.flopMode = true;
      this.head = new Harden(this.gameWidth, this.gameHeight, this.flopMode);
      this.inputHandler = new InputHandler(this.head, this);
      this.selectCharacter();
    });
  }

  // Changes the intro message
  changeInstruction() {
    const instructions = [
      "Choose wisely who you come in contact with!",
      "Players playing actual defence = EASY FLOP!",
      "Players taking charges = HARD TO FLOP!",
      "Take advantage of referees!",
      "They help you the most!",
      "Flopping is an art!",
    ];
    let instructionIndex = -1;
    function changeMsg() {
      ++instructionIndex;
      if (instructionIndex >= instructions.length) {
        instructionIndex = 0;
      }
      this.instructions.innerText = instructions[instructionIndex];
    }
    setInterval(changeMsg, 2000);
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
    this.defenders = this.defenders.filter((d) => !d.collided);
    this.allCharge = this.allCharge.filter((d) => !d.collided);
    this.refs = this.refs.filter((d) => !d.collided);

    // updates the falling objects, filters out of screen objects
    this.defenders = this.defenders.filter((o) => o.position.y < 900);
    this.allCharge = this.allCharge.filter((o) => o.position.y < 900);
    this.refs = this.refs.filter((o) => o.position.y < 900);

    this.gameObjects = [this.defenders, this.allCharge, this.refs];

    if (this.fouls === 0) this.gameState = GAMESTATE.GAMEOVER;
    if (
      this.gameState === GAMESTATE.PAUSED ||
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
    if (this.head) this.head.draw(ctx, this.playerDog);
    this.gameObjects.forEach((opponents) => {
      for (let d of opponents) {
        d.draw(ctx);
      }
    });
    if (this.gameState === GAMESTATE.PAUSED) {
      this.text.showPausedMenu(ctx, this);
    }

    if (this.gameState === GAMESTATE.GAMEOVER) {
      this.gameoverDiv.style.display = "flex";
      // this.nameForm.style.visibility = "visible";
      this.gameoverScore.innerText = this.score;
      this.text.showGameOver(ctx, this);
    } else {
      this.gameoverDiv.style.display = "none";
    }
    if (this.gameState !== GAMESTATE.INTRO) {
      this.text.showScoreAndFouls(ctx, this, this.score, this.fouls);
    }
    if (this.gameState === GAMESTATE.INTRO) {
      this.introDiv.style.display = "inline";
      this.text.showIntro(ctx, this);
    } else {
      this.introDiv.style.display = "none";
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
    // const name = this.nameInput.value;
    // console.log(name);
    // this.player = this.nameInput.value
    const score = this.score;
    this.game = await this.gameStats.adapter.saveGame(this.nameInput.value, score);
    this.gameStats.fetchAndLoadGameStats();
  }

  // saves the player and changes gameState to menu
  selectCharacter() {
    this.gameState = GAMESTATE.RUNNING;
    this.draw(this.ctx);
    this.start();
  }

  // resets the score and fouls and clears object off game canvas when player clicks "Play Again button"
  resetGame() {
    this.head.position.x = this.gameWidth / 2 - this.head.size.x / 2;
    this.head.speed = 0;
    this.score = 0;
    this.fouls = 2;
    this.gameState = GAMESTATE.INTRO;
    this.defenders = [];
    this.allCharge = [];
    this.refs = [];
    this.nameForm.style.visibility = "visible";
    this.resetDiv.style.display = "none";
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
    }, 400);
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
