class User {
  constructor(userJson) {
    this.id = userJson.id;
    this.name = userJson.name;
    this.score = userJson.score;
    this.date = userJson.created_at;
  }
}
