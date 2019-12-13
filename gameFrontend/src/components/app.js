class App {
  constructor() {
    this.playerScores = new Player();
    this.initBindingsAndEventListeners();
    this.gameloop();
    this.allDrawCharge = [];
  }
  // make array to hold
  // this.allPlayer = []
  // iterate over them and checkCol check for 2 player collide
  // check harden bounds and players bounds and check if they overlap
  // find right and left most sides,
  // randomly add new instances of defence and charge to all player after random time, so they all can fall down
  // have this.allDefenders = []
  // for each player in all defenders, harden will have to hit or flop
  // this.allDrawCharge = []
  // for each player in draw charge, harden must avoid
  initBindingsAndEventListeners() {
    this.canvas = document.getElementById("game-container");
    this.ctx = this.canvas.getContext("2d");
    this.gameHeight = this.canvas.height;
    this.gameWidth = this.canvas.width;
    this.defenders = [];

    this.head = new Harden(this.gameWidth, this.gameHeight);
    this.head.draw(this.ctx);

    // if (Math.random() < 0.01) {
    //   this.defenders.push(new Harden(this.gameWidth, this.gameHeight));
    // }
    console.log(this.defenders);

    this.interval = setInterval(() => {
      const rand = Math.floor(Math.random() * 10);
      if (rand === 4) {
        this.defenders.push(new Defence(this.gameWidth, this.gameHeight));
      }
    }, 500);

    // this.inputHandler = new InputHandler(this.head);

    // working
    this.defence = new Defence(this.gameWidth, this.gameHeight);
    this.defence.draw(this.ctx);
  }

  gameloop(timestamp) {
    this.changeInTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);

    this.head.update(this.changeInTime);
    this.head.draw(this.ctx);

    for (let d of this.defenders) {
      console.log(d);
      d.update(this.changeInTime);
      d.draw(this.ctx);
    }

    // this.defence.update(this.changeInTime);
    // this.defence.draw(this.ctx);

    requestAnimationFrame(this.gameloop.bind(this));
  }
}
