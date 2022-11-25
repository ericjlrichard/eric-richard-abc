
const cryptoJS = require("crypto-js");

const secret = process.env.REACT_APP_SECRET_KEY;

const math = require("./math-utils")

exports.scramblePassword = (password) => {
  return cryptoJS.HmacMD5(password, secret).toString();
}  

exports.getSessionSettings = () => {
  let userSettings = {}

  userSettings.stance = sessionStorage.getItem("abc_stance") || "orthodox";
  userSettings.sounds = sessionStorage.getItem("abc_sounds") === "true"
  userSettings.workoutDuration = sessionStorage.getItem("abc_workout_duration")
  userSettings.roundDuration = sessionStorage.getItem("abc_round_duration")

  const combos = sessionStorage.getItem("abc_combos")

  if(combos) {
    userSettings.combos = sessionStorage.getItem("abc_combos").split(",")
  } else {
    userSettings.combos = []
  }

  userSettings.combosAll = sessionStorage.getItem("abc_combos_all") || "all"
  

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

exports.setSessionStats = (userStats) => {
  for (const property in userStats) {
    console.log(property, userStats[property])
  }
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

exports.generateRandomHandle = () => {
  const names= ["Steve", "Harry", "Mandy", "Theresa", "Ginette", "Bob", "Fernand", "Alan", "Vernon", "Yan"];
  const adjectives = ["Righteous",
  "Swift",
  "Slim",
  "Wild",
  "Moldy",
  "Chief",
  "Pretty",
  "Royal",
  "Preppy",
  "Rebel" ];
  const nouns = ["Destroyer", "Hammer", "Cheetah", "Snake", "Monster", "Power", "Fist", "Hunk", "Anvil", "Flash"]

  //half the time returns adjective+name, the other half name + "the" + noun
  if (math.getRandomPercentage() >=50) {
    return math.getRandom(adjectives) + math.getRandom(names)
  } else {
    return math.getRandom(names) + "The" + math.getRandom(nouns)
  }

}


