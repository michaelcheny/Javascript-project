class ScreenMessages {
  constructor() {}

  showIntro(ctx, game) {
    ctx.rect(0, 0, game.gameWidth, game.gameHeight);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();
    ctx.font = "60px Yoster Island";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Enter Your Name", game.gameWidth / 2, game.gameHeight / 2);
  }

  showMainMenu(ctx, game) {
    ctx.rect(0, 0, game.gameWidth, game.gameHeight);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();
    ctx.font = "30px Yoster Island";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`Hi, ${game.player}`, game.gameWidth / 2, 0 + 150);

    const defender = document.getElementById("draymond-defence");
    ctx.drawImage(defender, game.gameWidth / 2 - 75, game.gameHeight / 2, 150, 150);
    ctx.fillText("+100 points", game.gameWidth / 2, game.gameHeight / 2 - 20);

    const charge = document.getElementById("steven-adams-charge");
    ctx.drawImage(charge, game.gameWidth * 0.23 - 75, game.gameHeight / 2, 150, 150);
    ctx.fillText("-1 foul", game.gameWidth * 0.23, game.gameHeight / 2 - 20);

    const ref = document.getElementById("ref");
    ctx.drawImage(ref, game.gameWidth / 1.3 - 75, game.gameHeight / 2, 150, 150);
    ctx.fillText("+1 foul", game.gameWidth / 1.3, game.gameHeight / 2 - 50);
    ctx.fillText("+500 points", game.gameWidth / 1.3, game.gameHeight / 2 - 20);

    ctx.font = "20px Yoster Island";
    ctx.fillText(
      "This is not a knock on Harden, press `enter` or `click` on screen to play",
      game.gameWidth / 2,
      0 + 750
    );
  }

  showPausedMenu(ctx, game) {
    ctx.rect(0, 0, game.gameWidth, game.gameHeight);
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fill();
    ctx.font = "100px Yoster Island";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "center";
    ctx.fillText("Time Out", game.gameWidth / 2, game.gameHeight / 2);
  }

  showGameOver(ctx, game) {
    // ctx.rect(0, 0, game.gameWidth, game.gameHeight);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fill();
    ctx.font = "100px Yoster Island";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", game.gameWidth / 2, game.gameHeight / 2);
  }

  showScoreAndFouls(ctx, game, score, fouls) {
    ctx.font = "20px Yoster Island";
    ctx.textAlign = "center";
    ctx.fillText("Score: " + score, 100, 40);
    ctx.fillText("Fouls Remaining: " + fouls, game.gameWidth - 140, 40);
  }
}
