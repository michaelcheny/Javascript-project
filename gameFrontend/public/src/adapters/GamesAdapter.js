class GamesAdapter {
  constructor() {
    this.baseUrl = "https://floppy-drop-api.herokuapp.com/api/v1/games";
  }

  async getGames() {
    try {
      const res = await fetch(this.baseUrl);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return "Check if your server is running.";
    }
  }

  async saveGame(name, score) {
    const filteredName = name.replace(/[^a-z0-9\ ]/gi, "");
    // console.log(filteredName);
    const game = {
      name: filteredName,
      score: score,
    };
    try {
      let res = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });
      let data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveRating(stars, gameId) {
    const ratings = {
      rating: stars,
    };
    try {
      return await fetch(this.baseUrl + `/${gameId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratings),
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
