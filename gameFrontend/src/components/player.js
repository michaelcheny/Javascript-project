class Player {
  constructor() {
    this.bindEventListeners();
    this.adapter = new PlayersAdapter();
    this.fetchAndLoadPlayers();
  }

  bindEventListeners() {
    this.highscoresContainer = document.getElementById("highscores-list");
  }

  async fetchAndLoadPlayers() {
    try {
      let players = await this.adapter.getPlayers();
      players.forEach(player => {
        this.render(player);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  render(player) {
    this.highscoresContainer.innerHTML += `
        <div class="score-for-user">
          <p>${player.name}</p>
          <p>${player.highscore}</p>
          <p>${player.created_at}</p>
        </div>
      `;
  }
}
