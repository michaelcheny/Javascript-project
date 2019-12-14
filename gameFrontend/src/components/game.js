class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.defenders = [];
    this.allCharge = [];
  }

  start() {
    this.head = new Harden(this);
    this.interval = setInterval(() => {
      const rand = Math.floor(Math.random() * 5);
      if (rand < 3) {
        this.defence = new Defence(this);
        this.defenders.push(this.defence);
      }
      if (rand < 1) {
        this.avoidCharge = new Charge(this);
        this.allCharge.push(this.avoidCharge);
      }
    }, 500);

    this.gameObjects = [this.defenders, this.allCharge];
    // console.log(this.gameObjects);
  }

  update(changeInTime) {
    this.head.update(changeInTime);

    this.gameObjects.forEach(opponents => {
      for (let opponent of opponents) {
        opponent.update(changeInTime);
        const outOfBound = opponents.filter(o => {
          if (o.location !== undefined) o.location.y > 900;
        });
      }
    });

    //   for (let d of this.defenders) {
    //     d.update(changeInTime);
    //     const outOfBound = this.defenders.filter(d => {
    //       if (d.location !== undefined) d.location.y > 900;
    //     });
    //   }
    //   for (let charge of this.allCharge) {
    //     charge.update(changeInTime);
    //     const out = this.allCharge.filter(c => {
    //       if (c.location !== undefined) c.location.y > 900;
    //     });
    //   }
  }

  draw(ctx) {
    this.head.draw(ctx);

    this.gameObjects.forEach(opponents => {
      for (let d of this.defenders) {
        d.draw(ctx);
      }
    });

    // for (let d of this.defenders) {
    //   d.draw(ctx);
    //   // const outOfBound = this.defenders.filter(d => {
    //   //   if (d.location !== undefined) d.location.y > 900;
    //   // });
    // }
    // for (let charge of this.allCharge) {
    //   charge.draw(ctx);
    //   // const out = this.allCharge.filter(c => {
    //   //   if (c.location !== undefined) c.location.y > 900;
    //   // });
    // }
  }
}
