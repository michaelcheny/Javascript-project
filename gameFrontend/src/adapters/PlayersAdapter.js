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
    } catch (error) {
      console.log(error.message);
    }
  }
}
