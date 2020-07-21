class ScreenMessages {
  constructor() {}

  showIntro(ctx, game) {
    ctx.rect(0, 0, game.gameWidth, game.gameHeight);
    ctx.fillStyle = "rgba(25,25,25,1)";
    ctx.fill();
    ctx.font = "30px";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
  }

  showPausedMenu(ctx, game) {
    ctx.rect(0, 0, game.gameWidth, game.gameHeight);
    ctx.fillStyle = "rgba(25,25,25,0.5)";
    ctx.fill();
    ctx.font = "100px";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Time Out", game.gameWidth / 2, game.gameHeight / 2);
  }

  showGameOver(ctx, game) {
    ctx.fillStyle = "rgba(25,25,25,1)";
    ctx.fill();
  }

  showScoreAndFouls(ctx, game, score, fouls) {
    ctx.font = "12px 'Press Start 2P'";
    ctx.fillText("Score: " + score, 100, 40);
    ctx.fillText("Fouls Remaining: " + fouls, game.gameWidth - 140, 40);
  }
}
