class Collision {
  constructor(harden, opponent) {
    this.firstRectXLeft = harden.position.x;
    this.firstRectYTop = harden.position.y;
    this.firstRectXRight = harden.position.x + 86.4;
    this.firstRectYBottom = harden.position.y + 164;

    this.secondRectXLeft = opponent.position.x;
    this.secondRectXTop = opponent.position.y;
    this.secondRectXRight = opponent.position.x + 130;
    this.secondRectXBottom = opponent.position.y + 130;

    console.log("x left: " + head.position.x);
    console.log("y top: " + head.position.y);
    console.log("x right: " + (head.position.x + 86.4));
    console.log("y bottom: " + (head.position.y + 164));
    if (harden.position.x > opponent.position.x) {
    }
  }
}
