class InputHandler {
  constructor(head) {
    document.addEventListener("keydown", e => {
      if (e.keyCode === 37 || e.keyCode === 65) {
        // alert("left");
        head.dashLeft();
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        // alert("right");
        head.dashRight();
      }
    });
  }
}
