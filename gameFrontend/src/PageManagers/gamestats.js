class GameStats {
  constructor() {
    this.adapter = new GamesAdapter();
    this.fetchAndLoadGameStats();
  }

  bindingsAndEventListeners() {
    this.top5AllTime_div = document.getElementById("top-5-all-time");
    this.top5Today_div = document.getElementById("top-5-today");
  }

  async fetchAndLoadGameStats() {
    try {
      let games = await this.adapter.getGames();
      console.log(games);
    } catch (error) {
      console.log(error.message);
      return "there was an issue";
    }
  }
}
