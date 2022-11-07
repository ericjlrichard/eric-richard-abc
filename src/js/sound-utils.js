
//returns the timeout id

const API_URL = process.env.REACT_APP_SERVER_URL;

exports.setSoundTimer = (ms, action) => {

  return setTimeout(() => {

    let soundToUse = action

    if ((action % 2) === 0) {
      soundToUse = action - 1;
    }

    if (action > 9) {
      soundToUse = 9;
    }

    const audio = new Audio(`${API_URL}/sounds/hit${soundToUse}.wav`);
    audio.play()
  }, ms + 1000)
}

exports.setBellTimer = (ms, rings) => {
  return setTimeout(() => {
    const audio = new Audio(`${API_URL}/sounds/bell${rings}.wav`)
    audio.play()
  }, ms)
}

exports.setClickerTimer = (ms, clicker = 1) => {
  return setTimeout(() => {
    const audio = new Audio(`${API_URL}/sounds/clicker${clicker}.wav`)
    audio.play()
  }, ms)
}