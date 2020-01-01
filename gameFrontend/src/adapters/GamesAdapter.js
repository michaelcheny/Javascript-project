class GamesAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000//api/v1/games";
  }

  async getGames() {
    try {
      const res = await fetch(this.baseUrl);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return "Check if your is running.";
    }
  }

  async saveGame(name, score, rating) {
    const game = {
      name: name,
      score: score,
      rating: rating
    };
    try {
      let res = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
      });
      let data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
}
