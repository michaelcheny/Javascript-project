class Player {
  constructor() {
    // console.log(playerJson);
    this.players = [];
    this.bindEventListeners();
    this.adapter = new PlayersAdapter();
    // console.log(this.adapter.getPlayers());
    this.fetchAndLoadPlayers();
    console.log(this.players);

    // this.id = playerJson.id;
    // this.name = playerJson.name;
    // this.highscore = playerJson.highscore;
    // this.date = playerJson.created_at;
  }

  bindEventListeners() {
    this.highscoresContainer = document.getElementById("highscores-list");
  }

  async fetchAndLoadPlayers() {
    try {
      let players = await this.adapter.getPlayers();
      // console.log(players);
      players.forEach(player => {
        // console.log(this.getInfoFromPlayer(player));
        // this.players.push(this.getInfoFromPlayer(player));
        // console.log(this.players);
        this.render(player);
      });
      // this.players.forEach(player => {
      //   this.render(player);
      // });
    } catch (error) {
      console.log(error.message);
    }
  }
  getInfoFromPlayer(player) {
    // console.log(player.id);
    this.id = player.id;
    // console.log(this.id);
    this.name = player.name;
    this.highscore = player.highscore;
    this.date = player.created_at;
  }

  render(player) {
    // const highscoresContainer = document.getElementById("highscores-list");
    this.highscoresContainer.innerHTML += `
        <div class="score-for-user">
          <p>${player.name}</p>
          <p>${player.highscore}</p>
          <p>${player.created_at}</p>
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
