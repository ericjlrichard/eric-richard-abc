//All the timimng and animation fonctions here
const ALL_PADS=[1,2,3,4,5,6,7,8,9,10,11,12]

export function setIntervalWithStop(func, interval, intervalDuration) {
  const intervalObject = setInterval(func, interval)

  setTimeout(() => {
    clearInterval(intervalObject)
  }, intervalDuration)
}

//starts anim with text "action" and "setAnimState" function after "delay", resets to "restClass", after "delayRest"
export function setActionAnimWithReset(setAnimState, action, animClass, delay, restClass) {

  setTimeout(() => {
    setAnimState({action: action, anim:animClass})
  }, delay)

  setTimeout(() => {
    setAnimState({action: action, anim: restClass})
  }, delay+1000)
}

export function setPadAnimWithReset (setAnimState, animClass, delay, restClass) {
  setTimeout(() => {
    setAnimState(animClass)
  }, delay+1000)

  setTimeout(() => {
    setAnimState(restClass)
  }, delay+1200)

}