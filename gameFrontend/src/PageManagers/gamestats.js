class GameStats {
  constructor() {
    this.adapter = new GamesAdapter();
    this.bindingsAndEventListeners();
    this.fetchAndLoadGameStats();
  }

  bindingsAndEventListeners() {
    this.recentScores_div = document.getElementById("recent-scores");
    this.top5AllTime_div = document.getElementById("top-5-all-time");
    this.top5Today_div = document.getElementById("top-5-today");
    this.averageRating_div = document.getElementById("average-rating");
  }

  async fetchAndLoadGameStats() {
    try {
      let games = await this.adapter.getGames();
      for (let game of games.games) {
        this.renderScores(game, this.recentScores_div);
      }
      for (let game of games.top_5) {
        this.renderScores(game, this.top5AllTime_div);
      }
      for (let game of games.top_5_today) {
        this.renderScores(game, this.top5Today_div);
      }
      this.renderAverageRating(games.average_rating);
    } catch (error) {
      console.log(error.message);
      return "Check to see if your server is up and running.";
    }
  }

  clearAllDivs() {
    this.recentScores_div.innerHTML = `<h2>Highscores List</h2>`;
    this.top5AllTime_div.innerHTML = `<h2>Top 5 Scores All Time</h2>`;
    this.top5Today_div.innerHTML = `<h2>Top 5 Scores Today</h2>`;
    this.averageRating_div.innerHTML = `<h2>Average Rating</h2>`;
  }

  renderScores(game, container) {
    container.innerHTML += `
    <div class="score-for-user">
      <p><span class="hug-left">${game.player.name}</span> <span class="hug-right">${game.score}</span></p>
    </div>
    `;
  }

  renderAverageRating(gameRating) {
    this.averageRating_div.innerHTML += `
      <div class="score-for-user">
        <p>${parseFloat(gameRating).toFixed(2)} / 5</p>
      </div>
    `;
  }
}
