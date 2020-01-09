// class Defence {
//   constructor(game) {
//     this.size = {
//       x: this.height,
//       y: this.width
//     };
//     const randomSpawnPosition = Math.floor(
//       Math.random() * (game.gameWidth - this.size.x)
//     );
//     // sets this.speed to a random number between 500 and 700.
//     this.speed = Math.random() * (700 - 500) + 500;
//     this.position = {
//       x: randomSpawnPosition,
//       y: -200
//     };
//     this.collided = false;
//   }

//   update(changeInTime) {
//     if (!changeInTime) return;
//     this.position.y += (this.speed * changeInTime) / 1000;
//   }

//   draw(ctx) {
//     this.img = document.getElementById("draymond-defence");
//     ctx.drawImage(this.img, this.position.x, this.position.y, this.size.x, this.size.y);
//   }
// }

class Defence extends FallingObject {
  constructor(game) {
    super(game);
    this.img = document.getElementById("draymond-defence");
    this.size = {
      x: 140,
      y: 140
    };
    const randomSpawnPosition = Math.floor(
      Math.random() * (game.gameWidth - this.size.x)
    );
    // sets this.speed to a random number between 500 and 700.
    this.speed = Math.random() * (700 - 500) + 500;
    this.position = {
      x: randomSpawnPosition,
      y: -200
    };
  }
}
