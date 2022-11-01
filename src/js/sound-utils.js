

exports.setSoundTimer = (ms, action) => {
  console.log(action)
  setTimeout(() => {

    let soundToUse = action

    if ((action % 2) === 0) {
      soundToUse = action - 1;
    }

    if (action > 9) {
      soundToUse = 9;
    }

    const audio = new Audio(`http://localhost:8080/sounds/hit${soundToUse}.wav`);
    audio.play()
  }, ms + 1000)
}