// Grabs the users from the API from our backend
class PlayersAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000//api/v1/players";
  }

  async getPlayers() {
    try {
      let res = await fetch(this.baseUrl);
      let playerJson = res.json();
      // console.log(userJson);
      return playerJson;
    } catch (error) {
      document.getElementById("highscores-list").innerHTML += "<h2>Check to see if your server is running.<h2>";
      console.log(error.message);
    }
  }
}
