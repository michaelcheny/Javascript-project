class ScreenMessages {
  constructor() {}

  showMainMenu(ctx, game) {
    ctx.rect(0, 0, game.gameWidth, game.gameHeight);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();
    ctx.font = "60px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Click Screen to Start", game.gameWidth / 2, game.gameHeight / 2);
  }

  showPausedMenu(ctx, game) {
    ctx.rect(0, 0, game.gameWidth, game.gameHeight);
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fill();
    ctx.font = "100px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Time Out", game.gameWidth / 2, game.gameHeight / 2);
  }

  showGameOver(ctx, game) {
    ctx.rect(0, 0, game.gameWidth, game.gameHeight);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();
    ctx.font = "100px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", game.gameWidth / 2, game.gameHeight / 2);
  }

  showScoreAndFouls(ctx, game, score, fouls) {
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Score: " + score, 100, 40);
    ctx.fillText("Fouls Remaining: " + fouls, game.gameWidth - 140, 40);
  }
}
