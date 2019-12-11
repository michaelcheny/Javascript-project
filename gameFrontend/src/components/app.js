class App {
  constructor() {
    this.users = new Users();
    this.initBindingsAndEventListeners();
  }

  initBindingsAndEventListeners() {
    const gameWidth = 1000;
    const gameHeight = 900;

    let canvas = document.getElementById("game-container");
    let ctx = canvas.getContext("2d");
    console.log(ctx);

    // ctx.clearRect(0, 0, 700, 388);

    let player = new Player(gameWidth, gameHeight);
    player.draw(ctx);
  }
}
