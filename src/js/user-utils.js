
const cryptoJS = require("crypto-js")
const secret = process.env.REACT_APP_SECRET_KEY;

exports.scramblePassword = (password) => {
  return cryptoJS.HmacMD5(password, secret).toString();
}  

exports.getSessionSettings = () => {
  let userSettings = {}

  userSettings.stance = sessionStorage.getItem("abc_stance");
  userSettings.sounds = sessionStorage.getItem("abc_sounds") === "true"
  userSettings.workoutDuration = sessionStorage.getItem("abc_workout_duration")
  userSettings.roundDuration = sessionStorage.getItem("abc_round_duration")

  const combos = sessionStorage.getItem("abc_combos")

  if(combos) {
    userSettings.combos = sessionStorage.getItem("abc_combos").split(",")
  } else {
    userSettings.combos = []
  }

  userSettings.combosAll = sessionStorage.getItem("abc_combos_all")
  

  return userSettings;
}

exports.setSessionSettings = (userSettings) => {
  sessionStorage.setItem("abc_stance", userSettings.stance)
  sessionStorage.setItem("abc_sounds", userSettings.sounds)
  sessionStorage.setItem("abc_workout_duration", userSettings.workoutDuration)
  sessionStorage.setItem("abc_round_duration", userSettings.roundDuration)
  sessionStorage.setItem("abc_combos", userSettings.combos)
  sessionStorage.setItem("abc_combos_all", userSettings.combosAll)
}

exports.verifySignUpForm = (signUpForm) => {
  if (signUpForm.handle.value.trim() === "") {
    return "Oops! You must choose a handle!"
  }
    
  if (signUpForm.email.value.trim() === "") {
    return "Oops! You must provide a valid email!"
  }

  if (signUpForm.password.value !== signUpForm["confirm-password"].value) {
    return "Oops! Passwords don't match."
  }
  
  return "OK";
}
