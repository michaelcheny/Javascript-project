class InputHandler {
  constructor(head) {
    document.addEventListener("keydown", e => {
      if (e.keyCode === 37 || e.keyCode === 65) {
        head.dashLeft();
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        head.dashRight();
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
