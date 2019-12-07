class Users {
  constructor() {
    this.users = [];
    this.adapter = new UsersAdapter();
    // this.bindEventListeners()
    this.fetchAndLoadUsers();
  }

  async fetchAndLoadUsers() {
    let users = await this.adapter.getUsers();
    // console.log(users);
    users.forEach(user => {
      this.users.push(new User(user));
    });
    this.render();
  }

  render() {
    const highscoresContainer = document.getElementById("highscores-list");
    highscoresContainer.innerHTML = "hjkwuiqeyrusfhasjkdfhasdkjfiakseruaklsudf";
    console.log(this.users);
    // this.users.
  }
}
