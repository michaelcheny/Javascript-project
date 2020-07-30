class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", (e) => {
      if (game.gameState == GAMESTATE.GAMEOVER && e.keyCode == 27) game.resetGame();
      if (game.gameState == GAMESTATE.GAMEOVER && e.keyCode == 13) {
        if (game.nameInput.value !== "") game.saveGame();
        game.nameForm.style.visibility = "hidden";
        // game.nameForm.style.display = "none";
        game.resetDiv.style.display = "flex";
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
