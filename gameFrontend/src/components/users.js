class Users {
  constructor() {
    this.users = [];
    this.adapter = new UsersAdapter();
    // this.bindEventListeners()
    this.fetchAndLoadUsers();
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
    const highscoresContainer = document.getElementById("highscores-list");
    highscoresContainer.innerHTML += `
      <div class="score-for-user">
        <p>${user.name}</p>
        <p>${user.score}</p>
        <p>${user.date}</p>
      </div>
    `;
  }
}
