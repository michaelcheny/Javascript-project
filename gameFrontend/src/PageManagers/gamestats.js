class GameStats {
  constructor() {
    this.bindingsAndEventListeners();
    this.adapter = new GamesAdapter();
    this.fetchAndLoadGameStats();
    // this.renderTop5();
  }

  bindingsAndEventListeners() {
    this.top5AllTime_div = document.getElementById("top-5-all-time");
    this.top5Today_div = document.getElementById("top-5-today");
  }

  async fetchAndLoadGameStats() {
    try {
      let games = await this.adapter.getGames();
      for (let game of games.games) {
        this.renderTop5(game);
      }
      console.log(games.games);
    } catch (error) {
      console.log(error.message);
      return "there was an issue";
    }
  }

  renderTop5(game) {
    // try {
    console.log(this.top5AllTime_div);
    console.log(this.top5Today_div);
    this.top5AllTime_div.innerHTML += `
      <div>
        <p>${game.player.name}</p>
      </div>`;
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
