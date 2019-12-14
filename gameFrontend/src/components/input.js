class InputHandler {
  constructor(head) {
    document.addEventListener("keydown", e => {
      if (e.keyCode === 37 || e.keyCode === 65) {
        head.dashLeft();
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        head.dashRight();
      } else if (e.keyCode === 87) {
        console.log("x left: " + head.position.x);
        console.log("y top: " + head.position.y);
        console.log("x right: " + (head.position.x + 86.4));
        console.log("y bottom: " + (head.position.y + 164));
      }
    });

    document.addEventListener("keyup", e => {
      if (e.keyCode === 37 || e.keyCode === 65) {
        if (head.speed < 0) head.stop();
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        if (head.speed > 0) head.stop();
      }
    });
  }
}
