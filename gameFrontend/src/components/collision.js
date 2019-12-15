class Collision {
  constructor(harden, opponent) {
    this.o = opponent;
    this.aLeft = harden.position.x;
    this.aTop = harden.position.y;
    this.aRight = harden.position.x + harden.size;
    this.aBottom = harden.position.y + harden.size;

    this.bLeft = opponent.position.x;
    this.bTop = opponent.position.y;
    this.bRight = opponent.position.x + opponent.size.x;
    this.bBottom = opponent.position.y + opponent.size.y;

    this.checkOverlap();
  }

  checkOverlap() {
    // if (this.bBottom >= this.aTop && this.bLeft >= this.aLeft && this.bRight <= this.aRight) {
    if (this.aLeft > this.bRight || this.bLeft > this.aRight) return false;
    if (this.aTop < this.bBottom || this.bTop < this.aBottom) return false;
    // this.o.speed = -this.o.speed;
    // this.o.position.y - +this.o.speed;
    // console.log("overlapped");
    return true;
    // }
  }
}
