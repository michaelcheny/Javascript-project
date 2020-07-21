class Referee extends FallingObject {
  constructor(game) {
    super(game);
    this.img = document.getElementById("ref");
    this.size = {
      x: 106,
      y: 144
    };
    const randomSpawnPosition = Math.floor(
      Math.random() * (game.gameWidth - this.size.x)
    );
    this.speed = Math.random() * (600 - 400) + 400;
    this.position = {
      x: randomSpawnPosition,
      y: -200
    };
  }
}
