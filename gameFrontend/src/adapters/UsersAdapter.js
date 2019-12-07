// Grabs the users from the API from our backend
class UsersAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000//api/v1/users";
  }

  async getUsers() {
    try {
      let res = await fetch(this.baseUrl);
      let userJson = res.json();
      // console.log(userJson);
      return userJson;
    } catch (error) {
      document.getElementById("highscores-list").innerHTML += "<h2>Check to see if your server is running.<h2>";
      console.log(error.message);
    }
  }
}
