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

    this.inputForm_div = document.getElementById("new-name-form");
    this.nameInput = document.getElementById("player-name");
  }

  async fetchAndLoadGameStats() {
    try {
      let games = await this.adapter.getGames();
      for (let game of games.games) {
        this.renderRecentScores(game);
      }
      for (let game of games.top_5) {
        this.renderTop5(game);
      }
      for (let game of games.top_5_today) {
        this.renderTop5Today(game);
      }
      // console.log(games.average_rating);
      this.renderAverageRating(games.average_rating);
    } catch (error) {
      console.log(error.message);
      return "Check to see if your server is up and running.";
    }
  }

  // saveGame() {
  //   this.inputForm_div.addEventListener("submit", e => {
  //     e.preventDefault();
  //     // console.log(e);
  //     this.adapter.saveGame(game);
  //     // ("addfunctiontoallowposttobackend");
  //   });
  // }

  renderRecentScores(game) {
    this.recentScores_div.innerHTML += `
      <ul class="score-for-user">
        <li><span class="hug-left">${game.player.name}</span> <span class="hug-right">${game.score}</span></li>
      </ul>
      `;
  }

  renderTop5(game) {
    this.top5AllTime_div.innerHTML += `
    <div class="score-for-user">
      <p><span class="hug-left">${game.player.name}</span> <span class="hug-right">${game.score}</span></p>
    </div>
    `;
  }

  renderTop5Today(game) {
    this.top5Today_div.innerHTML += `
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
