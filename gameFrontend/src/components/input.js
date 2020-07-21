class InputHandler {
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
      if (game.gameState == GAMESTATE.GAMEOVER && e.keyCode == 27) {
        if (game.nameInput.value !== "") game.resetGame();
        game.saveGame();
      }
      if (game.gameState == GAMESTATE.GAMEOVER && e.keyCode == 13) {
        if (game.nameInput.value !== "") game.saveGame();
        game.nameForm.style.display = "none";
        game.resetDiv.style.display = "flex";
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

    this.bindingsAndEventListeners();
  }

  bindingsAndEventListeners() {
    this.sounds = document.querySelectorAll("audio");
    this.muteToggle = document.getElementById("mute-toggle");
    this.toggleMute();
  }

  toggleMute() {
    for (const sound of this.sounds) {
      this.muteToggle.addEventListener("click", () => {
        if (sound.volume != 0) {
          sound.volume = 0;
          this.muteToggle.innerText = "🔇";
        } else if (sound.src.includes("solvethepuzzle")) {
          sound.volume = 0.05;
          this.muteToggle.innerText = "🔊";
        } else {
          sound.volume = 0.5;
          this.muteToggle.innerText = "🔊";
        }
      });
    }
  }
}
