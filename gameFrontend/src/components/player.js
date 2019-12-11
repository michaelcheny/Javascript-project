class Player {
  constructor(playerJson) {
    this.id = playerJson.id;
    this.name = playerJson.name;
    this.highscore = playerJson.highscore;
    this.date = playerJson.created_at;
    this.players = [];
  }

  bindEventListeners() {
    this.highscoresContainer = document.getElementById("highscores-list");
  }

  async fetchAndLoadPlayers() {
    try {
      let players = await this.adapter.getPLayers();
      players.forEach(player => {
        this.players.push(new Player(player));
      });
      this.players.forEach(player => {
        this.render(player);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  render(player) {
    // const highscoresContainer = document.getElementById("highscores-list");
    this.highscoresContainer.innerHTML += `
      <div class="score-for-user">
        <p>${player.name}</p>
        <p>${player.score}</p>
        <p>${player.date}</p>
      </div>
    `;
  }
}
