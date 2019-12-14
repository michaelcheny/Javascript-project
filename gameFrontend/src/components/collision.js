class Collision {
  constructor(harden, opponent) {
    this.firstRectXLeft = harden.position.x;
    this.firstRectYTop = harden.position.y;
    this.firstRectXRight = harden.position.x + 86.4;
    this.firstRectYBottom = harden.position.y + 164;

    this.secondRectXLeft = opponent.position.x;
    this.secondRectYTop = opponent.position.y;
    this.secondRectXRight = opponent.position.x + 130;
    this.secondRectYBottom = opponent.position.y + 130;

    // console.log(opponent.position.x);

    this.checkOverlap();
  }

  checkOverlap() {
    if (this.firstRectXLeft > this.secondRectXRight || this.secondRectXLeft > this.firstRectXRight) {
      // console.log("huh");
      return false;
    }
    if (this.firstRectYTop < this.secondRectYBottom || this.secondRectYTop < this.firstRectYBottom) {
      // console.log("whaaaa");
      return false;
    }
    console.log("overlapped");
    return true;
  }
}
