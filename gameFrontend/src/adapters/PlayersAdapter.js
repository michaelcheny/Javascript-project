// Grabs the users from the API from our backend
class PlayersAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000/api/v1/players";
  }

  async savePlayer(name) {
    const player = { name: name };
    try {
      let res = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(player)
      });
      let data = await res.json();
      return data;
    } catch (error) {
      // document.getElementById("highscores-list").innerHTML +=
      //   "<h2>Check to see if your server is running.<h2>";
      console.log(error.message);
    }
  }
}
