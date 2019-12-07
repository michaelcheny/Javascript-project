class Users {
  constructor() {
    this.users = [];
    this.adapter = new UsersAdapter();
    // this.bindEventListeners()
    this.fetchAndLoadUsers();
  }

  async fetchAndLoadUsers() {
    let users = await this.adapter.getUsers();
    console.log(users);
  }
}
