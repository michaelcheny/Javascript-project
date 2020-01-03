class Sound {
  constructor(source) {
    this.sound = document.createElement("audio");
    this.sound.src = source;
    this.sound.volume = 0.5;
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
  }
  play() {
    this.sound.play();
    // to allow the same sound to play multiple times in quick succession
    this.sound.currentTime = 0;
  }
}
