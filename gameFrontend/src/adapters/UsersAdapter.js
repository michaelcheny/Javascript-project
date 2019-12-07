// Grabs the users from the API from our backend
class UsersAdapter {
  constructor() {
    this.baseUrl = "http://localhost:3000//api/v1/users";
  }

  async getUsers() {
    let res = await fetch(this.baseUrl);
    let userJson = res.json();
    // console.log(userJson);
    return userJson;
  }
}