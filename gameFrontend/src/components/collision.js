class Collision {
  constructor(rect1, rect2) {
    this.o = rect2;
    this.aLeft = rect1.position.x;
    this.aTop = rect1.position.y;
    this.aRight = rect1.position.x + rect1.size.x;
    this.aBottom = rect1.position.y + rect1.size.y;

    this.bLeft = rect2.position.x;
    this.bTop = rect2.position.y;
    this.bRight = rect2.position.x + rect2.size.x;
    this.bBottom = rect2.position.y + rect2.size.y;
    this.overlapped();
  }

  overlapped() {
    if (this.aLeft > this.bRight || this.bLeft > this.aRight) return false;
    if (this.aTop > this.bBottom || this.bTop > this.aBottom) return false;
    return true;
  }
}
