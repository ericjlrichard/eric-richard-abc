//All the timimng and animation fonctions here
const ALL_PADS=[1,2,3,4,5,6,7,8,9,10,11,12]

export function setIntervalWithStop(func, interval, intervalDuration) {
  const intervalObject = setInterval(func, interval)

  setTimeout(() => {
    clearInterval(intervalObject)
  }, intervalDuration)
}

//changes padstates (specifically, the class used for animations). If someArray exists, it will only change the state of some pads.
export function changePadState(padArray, state, someArray) {
  if (!someArray) {
    someArray = ALL_PADS
  }

    //using i+1 because we want our pads to be counted from 1 to 12 not 0 to 11.
    for (let i = 0; i < 12; i++) {
      if (someArray.indexOf(i+1) >= 0) {
        padArray[i] = state;
      }
    }

    return padArray;
}