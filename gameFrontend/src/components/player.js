class Player {
  constructor(playerJson) {
    this.adapter = new PlayersAdapter();
    this.id = playerJson.id;
    this.name = playerJson.name;
    this.highscore = playerJson.highscore;
    this.date = playerJson.created_at;
    this.players = [];
  }

  bindEventListeners() {
    this.highscoresContainer = document.getElementById("highscores-list");
  }

  async fetchAndLoadPlayers() {
    try {
      let players = await this.adapter.getPLayers();
      console.log(players);
      players.forEach(player => {
        this.players.push(new Player(player));
      });
      this.players.forEach(player => {
        this.render(player);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  render(player) {
    // const highscoresContainer = document.getElementById("highscores-list");
    this.highscoresContainer.innerHTML += `
        <div class="score-for-user">
          <p>${player.name}</p>
          <p>${player.score}</p>
          <p>${player.date}</p>
        </div>
      `;
  }
}

// class Users {
//   constructor() {
//     this.users = [];
//     this.adapter = new UsersAdapter();
//     this.bindEventListeners();
//     this.fetchAndLoadUsers();
//   }

//   bindEventListeners() {
//     this.highscoresContainer = document.getElementById("highscores-list");
//   }

//   async fetchAndLoadUsers() {
//     try {
//       let users = await this.adapter.getUsers();
//       users.forEach(user => {
//         this.users.push(new User(user));
//       });
//       this.users.forEach(user => {
//         this.render(user);
//       });
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

//   render(user) {
//     // const highscoresContainer = document.getElementById("highscores-list");
//     this.highscoresContainer.innerHTML += `
//       <div class="score-for-user">
//         <p>${user.name}</p>
//         <p>${user.score}</p>
//         <p>${user.date}</p>
//       </div>
//     `;
//   }
// }
