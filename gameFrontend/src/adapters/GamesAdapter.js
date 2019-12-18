class GamesAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000//api/v1/games";
  }

  async getGames() {
    try {
      const res = await fetch(this.baseUrl);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
      return "Check if your is running.";
    }
  }
}
