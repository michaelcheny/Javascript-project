class InputHandler {
  constructor(head, game) {
    document.addEventListener("keydown", e => {
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

    // press enter while in intro state to save name / press escape to reset game at gameover screen
    document.addEventListener("keydown", e => {
      if (game.gameState == GAMESTATE.INTRO && e.keyCode == 13) game.saveName();
      if (game.gameState == GAMESTATE.GAMEOVER && e.keyCode == 27) game.resetGame();
      if (game.gameState == GAMESTATE.MENU && e.keyCode == 13) {
        game.draw(game.ctx);
        game.start();
      }
    });

    this.bindingsAndEventListeners();
    this.changeFont();
    this.changeBackgroundColor();
    this.hoverClickables();
    this.toggleMute();
  }

  bindingsAndEventListeners() {
    this.font = document.body.style.fontFamily;
    this.title = document.getElementById("title");
    this.sounds = document.querySelectorAll("audio");
    this.lightToggle = document.getElementById("light-toggle");
    this.muteToggle = document.getElementById("mute-toggle");
  }

  changeFont() {
    console.log(this.font);

    this.title.addEventListener("click", () => {
      if (this.font === "Arcade") {
        document.body.style.fontFamily = "Roboto";
        this.font = "Roboto";
      } else {
        document.body.style.fontFamily = "Arcade";
        this.font = "Arcade";
      }
    });
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
    let clickables = [this.title, this.lightToggle, this.muteToggle];
    for (let thing of clickables) {
      thing.addEventListener("mouseover", () => {
        document.body.style.cursor = "pointer";
        if (
          thing.innerText == "💡" ||
          thing.innerText == "🙈" ||
          thing.innerText == "🔊" ||
          thing.innerText == "🔇"
        ) {
          thing.style.fontSize = "30px";
          thing.style.top = "72%";
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
      document.addEventListener("keydown", e => {
        if (e.keyCode === 77 && sound.volume != 0) {
          sound.volume = 0;
          this.muteToggle.innerText = "🔇";
          // console.log(sound.volume);
        } else if (e.keyCode === 77) {
          sound.volume = 0.5;
          this.muteToggle.innerText = "🔊";
          // console.log(sound.volume);
        }
      });
    }
  }
}
