
exports.playSound = () => {
  const audio = new Audio("http://localhost:8080/sounds/hit1.wav");
  audio.play();
}