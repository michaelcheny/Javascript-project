class InputHandler {
  constructor(head, game) {
    document.addEventListener("keydown", e => {
      if (game.gameState == GAMESTATE.RUNNING || game.gameState == GAMESTATE.PAUSED) {
        if (e.keyCode === 37 || e.keyCode === 65) {
          head.dashLeft();
        } else if (e.keyCode === 39 || e.keyCode === 68) {
          head.dashRight();
        } else if (e.keyCode === 87) {
          console.log("x left: " + head.position.x);
          console.log("y top: " + head.position.y);
          console.log("x right: " + (head.position.x + 86.4));
          console.log("y bottom: " + (head.position.y + 164));
        } else if (e.keyCode === 83) {
          game.togglePause();
        }
      }
    });

    document.addEventListener("keyup", e => {
      if (game.gameState != GAMESTATE.RUNNING) return;
      if (e.keyCode === 37 || e.keyCode === 65) {
        if (head.speed < 0) head.stop();
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        if (head.speed > 0) head.stop();
      }
    });

    document.getElementById("game-container").addEventListener("click", e => {
      if (game.gameState == GAMESTATE.MENU) game.start();
    });

    // press enter while in intro state to save name
    document.addEventListener("keydown", e => {
      // console.log(e.keyCode);
      if (game.gameState == GAMESTATE.INTRO && e.keyCode == 13) game.saveName();
    });
  }
}
