class GamesAdapter {
  constructor() {
    this.baseUrl = "https://floppy-drop-api.herokuapp.com/api/v1/games";
    // this.baseUrl = "http://localhost:3000/api/v1/games";
  }

  async getGames() {
    try {
      const res = await fetch(this.baseUrl);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error.message);
      alert(
        "If you are seeing this alert, it means the Heroku server is napping. Give it few seconds and refresh the page. :)"
      );
      console.log("Check if your server is running.");
    }
  }

  async saveGame(name, score) {
    const filteredName = name.replace(/[^a-z0-9\ ]/gi, "");
    // console.log(`${filteredName}: ${score}`);
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
}
