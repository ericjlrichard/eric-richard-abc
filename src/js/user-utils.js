


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


//copied straight from math-utils and I'm not even sorry.
 function getRandom (array) {
  return !!array && array[Math.floor(Math.random() * array.length)]
}

 function getRandomPercentage() {
  return Math.floor(Math.random()*101)
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
  if (getRandomPercentage() >=50) {
    return getRandom(adjectives) + getRandom(names)
  } else {
    return getRandom(names) + "The" + getRandom(nouns)
  }

}


//achievements utils

exports.returnAchievementDescription = (achievementObj, userStats) => {
  const tier = this.determineNextTier(achievementObj, userStats)

  if (tier === 4) {
    return "Achievement completed! " + achievementObj.description.replace("%next-tier%", achievementObj.tiers[3])
  }
  
  return achievementObj.description.replace("%next-tier%", achievementObj.tiers[tier])
}

exports.determineNextTier = (achievementObj, userStats) => {
  
  const achievementVariables = achievementObj.variables;
  const achievementTiers = achievementObj.tiers;
  let tierIndex = 0;

  const resultsArray = []

  achievementVariables.forEach(achievementVar => {

    let i = 0

    while((i < achievementTiers.length) && (Number(userStats[achievementVar]) >= Number(achievementTiers[i]))) {
      i++;
    }
    resultsArray.push(i)
  })

  return Math.min(...resultsArray)
}