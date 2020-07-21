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
      // press enter while in intro state to save name / press escape to reset game at gameover screen
      // if (game.gameState == GAMESTATE.INTRO && e.keyCode == 13) {
      // game.gameMusic.play();
      //   game.saveName();
      // }
      if (game.gameState == GAMESTATE.GAMEOVER && e.keyCode == 27) {
        if (game.nameInput.value !== "") game.resetGame();
        game.saveGame();
      }
      if (game.gameState == GAMESTATE.GAMEOVER && e.keyCode == 13) {
        if (game.nameInput.value !== "") game.saveGame();
        game.nameForm.style.display = "none";
        game.resetDiv.style.display = "flex";
      }
      if (game.gameState == GAMESTATE.MENU && e.keyCode == 13) {
        game.draw(game.ctx);
        game.start();
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

    document.getElementById("game-container").addEventListener("click", () => {
      if (game.gameState == GAMESTATE.MENU) game.start();
    });

    this.bindingsAndEventListeners();
  }

  bindingsAndEventListeners() {
    this.light = "off";
    // this.title = document.getElementById("title");
    this.sounds = document.querySelectorAll("audio");
    this.lightToggle = document.getElementById("light-toggle");
    this.muteToggle = document.getElementById("mute-toggle");
    this.hoverClickables();
    this.toggleMute();
    this.changeBackgroundColor();
  }

  changeBackgroundColor() {
    this.lightToggle.addEventListener("click", () => {
      if (this.light === "off") {
        document.body.style.backgroundColor = "rgba(140, 140, 140, 0)";
        document.body.style.color = "black";
        this.lightToggle.innerText = "🙈";
        this.light = "on";
      } else {
        document.body.style.backgroundColor = "rgb(33, 33, 33)";
        document.body.style.color = "#bdbdbd";
        this.lightToggle.innerText = "💡";
        this.light = "off";
      }
    });
  }

  hoverClickables() {
    let clickables = [this.lightToggle, this.muteToggle];

    for (let thing of clickables) {
      thing.addEventListener("mouseover", () => {
        document.body.style.cursor = "pointer";
        if (
          thing.innerText == "💡" ||
          thing.innerText == "🙈" ||
          thing.innerText == "🔊" ||
          thing.innerText == "🔇"
        ) {
          // thing.style.fontSize = "30px";
          // thing.style.top = "72%";
        } else {
          thing.style.fontSize = "35px";
        }
      });
      thing.addEventListener("mouseout", () => {
        document.body.style.cursor = "";
        thing.style.top = "";
        thing.style.fontSize = "";
      });
    }
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
