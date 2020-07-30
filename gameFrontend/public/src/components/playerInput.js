class PlayerInputHandler {
  constructor(head, game) {
    document.addEventListener("keydown", (e) => {
      if (game.gameState == GAMESTATE.RUNNING || game.gameState == GAMESTATE.PAUSED) {
        if (e.keyCode === 37 || e.keyCode === 65) {
          head.dashLeft();
        } else if (e.keyCode === 39 || e.keyCode === 68) {
          head.dashRight();
        } else if (e.keyCode === 87) {
          console.log("x position: " + (head.position.x - head.size.x / 2));
        } else if (e.keyCode === 83) {
          game.togglePause();
        }
      }
    });

    document.addEventListener("keyup", (e) => {
      if (game.gameState != GAMESTATE.RUNNING) return;
      if (e.keyCode === 37 || e.keyCode === 65) {
        if (head.speed < 0) head.stop();
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        if (head.speed > 0) head.stop();
      }
    });
  }
}
