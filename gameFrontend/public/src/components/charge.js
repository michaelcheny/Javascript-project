class Charge extends FallingObject {
  constructor(game) {
    super(game);
    this.img = document.getElementById("steven-adams-charge");
    this.size = {
      x: 100,
      y: 150
    };
    const randomSpawnPosition = Math.floor(
      Math.random() * (game.gameWidth - this.size.x)
    );
    this.speed = Math.random() * (900 - 700) + 700;
    this.position = {
      x: randomSpawnPosition,
      y: -200
    };
  }
}
