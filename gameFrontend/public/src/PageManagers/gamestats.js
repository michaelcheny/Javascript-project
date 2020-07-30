class GameStats {
  constructor() {
    this.adapter = new GamesAdapter();
    this.bindingsAndEventListeners();
    this.fetchAndLoadGameStats();
  }

  bindingsAndEventListeners() {
    this.recentScores_ul = document.getElementById("recent-scores");
    this.top5AllTime_ul = document.getElementById("top-5-all-time");
    this.top5Today_ul = document.getElementById("top-5-today");
    // this.averageRating_ul = document.getElementById("average-rating");
  }

  async fetchAndLoadGameStats() {
    this.clearAllDivs();
    try {
      let games = await this.adapter.getGames();
      for (let game of games.games) {
        this.renderScores(game, this.recentScores_ul);
      }
      for (let game of games.top_5) {
        this.renderScores(game, this.top5AllTime_ul);
      }
      for (let game of games.top_5_today) {
        this.renderScores(game, this.top5Today_ul);
      }
      // this.renderAverageRating(games.average_rating);
    } catch (error) {
      console.log(error.message);
      return "Check to see if your server is up and running.";
    }
  }

  clearAllDivs() {
    this.recentScores_ul.innerHTML = "";
    this.top5AllTime_ul.innerHTML = "";
    this.top5Today_ul.innerHTML = "";
    // this.averageRating_ul.innerHTML = "";
  }

  renderScores(game, container) {
    container.innerHTML += `
    <li>
      <span class="hug-left">${game.player_name}</span> <span class="hug-right">${game.score}</span>
    </li>
    `;
  }

  // async renderAverageRating() {
  //   this.averageRating_ul.innerHTML = "";
  //   let games = await this.adapter.getGames();
  //   this.averageRating_ul.innerHTML += `
  //     <li>
  //       <p>${parseFloat(games.average_rating).toFixed(2)} / 5</p>
  //     </li>
  //   `;
  // }
}
