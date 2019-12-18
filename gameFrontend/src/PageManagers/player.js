class Player {
  constructor() {
    this.bindEventListeners();
    this.adapter = new PlayersAdapter();
    this.fetchAndLoadPlayers();
  }

  bindEventListeners() {
    this.highscores_div = document.getElementById("highscores-list");
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
    this.highscores_div.innerHTML += `
        <div class="score-for-user">
          <p>${player.name}</p>
          <p>${player.highscore}</p>
          <p>${player.created_at}</p>
        </div>
      `;
  }
}
