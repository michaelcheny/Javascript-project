class Defence {
  // constructor(image, startingLoc = { x: 400, y: 400 }, velocity = { x: 10, y: 10 }, size = { x: 100, y: 100 }) {
  constructor(game) {
    // constructor(gameWidth, gameHeight) {
    this.game = game;
    const randomSpawnPosition = Math.floor(Math.random() * (game.gameWidth - 130));
    this.size = 130;
    // this.gameHeight = game.gameHeight / 10;
    this.speed = Math.random() * (130 - 90) + 90;
    this.position = {
      x: randomSpawnPosition,
      y: -200
    };
  }

  draw(ctx) {
    this.img = document.getElementById("draymond-defence");
    ctx.drawImage(this.img, this.position.x, this.position.y, this.size, this.size);
  }

  update(changeInTime) {
    // console.log(this.game.head.position.x);
    if (!changeInTime) return;
    this.position.y += this.speed / changeInTime;
    // console.log(this.game.defenders); i should filter the array if they past game height over here
    const col = new Collision(this.game.head, this);
    // console.log(col);

    let bottomOfDefence = this.position.y + this.size;
    let topOfHarden = this.game.head.position.y;
    let leftOfHarden = this.game.head.position.x;
    let rightOfHarden = this.game.head.position.x + this.game.head.size.x;
    let bottomOfHarden = this.game.head.position.y + this.game.head.size.y;

    if (
      bottomOfDefence >= topOfHarden &&
      this.position.x >= leftOfHarden &&
      this.position.x + this.size <= rightOfHarden &&
      this.position.y + this.size <= bottomOfHarden
    )
      console.log("boomed");
  }
}
