class Users {
  constructor() {
    this.users = [];
    this.adapter = new UsersAdapter();
    this.bindEventListeners();
    this.fetchAndLoadUsers();
  }

  bindEventListeners() {
    this.highscoresContainer = document.getElementById("highscores-list");
  }

  async fetchAndLoadUsers() {
    try {
      let users = await this.adapter.getUsers();
      users.forEach(user => {
        this.users.push(new User(user));
      });
      this.users.forEach(user => {
        this.render(user);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  render(user) {
    // pick up at 19 mins second vid
    // const highscoresContainer = document.getElementById("highscores-list");
    this.highscoresContainer.innerHTML += `
      <div class="score-for-user">
        <p>${user.name}</p>
        <p>${user.score}</p>
        <p>${user.date}</p>
      </div>
    `;
  }
}
