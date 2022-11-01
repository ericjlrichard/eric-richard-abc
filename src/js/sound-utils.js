
exports.playSound = () => {
  const audio = new Audio("http://localhost:8080/sounds/hit3.wav");
  audio.play();
}

exports.setSoundTimer = (ms) => {
  setTimeout(() => {
    const audio = new Audio("http://localhost:8080/sounds/hit3.wav");
    audio.play()
  }, ms + 1000)
}