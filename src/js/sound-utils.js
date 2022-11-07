
//returns the timeout id
exports.setSoundTimer = (ms, action) => {

  return setTimeout(() => {

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

exports.setBellTimer = (ms, rings) => {
  return setTimeout(() => {
    const audio = new Audio(`http://localhost:8080/sounds/bell${rings}.wav`)
    audio.play()
  }, ms)
}

exports.setClickerTimer = (ms, clicker = 1) => {
  return setTimeout(() => {
    const audio = new Audio(`http://localhost:8080/sounds/clicker${clicker}.wav`)
    audio.play()
  }, ms)
}