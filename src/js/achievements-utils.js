const lang = require("./lang-utils");

//TD this needs to not be hard-coded but tonight is not good.
const breakDuration = 30;
const classicLastName = "Caufield"
const randomLastName = "Rendell"
const minWorkoutDuration = 20;

const tiers = ["bronze", "silver", "gold", "platinum"]

exports.returnAchievementDescription = (achievementObj, userStats) => {
  const nextTier = this.determineNextTier(achievementObj, userStats)
  const tier = nextTier - 1;

  if (tier === 3) {
    return "Platinum achievement completed: " + achievementObj.description.replace("%next-tier%", achievementObj.tiers[3]) + "! Amazing job!"
  }

  if (nextTier === 0) {
    return "No achievement yet. Next tier (" + tiers[nextTier] + "): " + achievementObj.description.replace("%next-tier%", achievementObj.tiers[nextTier])
  }

  return lang.capitalize(tiers[tier]) + " achievement completed: " + achievementObj.description.replace("%next-tier%", achievementObj.tiers[tier]) +  " Next tier ("+ tiers[nextTier] + "): " + achievementObj.description.replace("%next-tier%", achievementObj.tiers[nextTier])
}

exports.determineNextTier = (achievementObj, userStats) => {
  
  const achievementVariables = achievementObj.variables;
  const achievementTiers = achievementObj.tiers;

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

const typeOfCombo = (last_name) => {
  if (last_name === classicLastName) {
    return "classic"
  } else {
    if (last_name === randomLastName) {
      return "random"
    } else {
      return "signature"
    }
  }
}

//determines the stats of any given workout
exports.determineStats = (workout, combosArray, userSettings) => {
  let statsObj = {
    workout_of_type: {},
    round_of_type: {}

  }

  console.log("workout", workout)
  console.log("combos", combosArray)
  console.log("user settings", userSettings)

  let workoutComboConstant = "";
  let roundComboConstant = "";
  let workoutDuration = 0;
  let roundsOfSameTypeAchieved = []
  let roundComboIsSame = true;
  let workoutComboIsSame = true;

  workoutComboConstant = typeOfCombo(combosArray.find(item => item.id === workout[0].combos[0]).last_name)


  workout.forEach(round => {
    //rounds actions are in quarters of seconds, dividing by 4 to give us seconds.
    workoutDuration += ((round.round.length / 4) + (breakDuration));

    console.log("first combo of round", round)
    roundComboConstant = typeOfCombo(combosArray.find(item => item.id === round.combos[0]).last_name)
    console.log("first combo of round", roundComboConstant)

      //for each round, check if all combos are of same type.
      round.combos.forEach(comboId => {
        const nextComboType = typeOfCombo(combosArray.find(item => item.id === comboId).last_name)
        console.log(roundComboConstant, nextComboType)
        if (nextComboType !== roundComboConstant) {
          roundComboIsSame = false;
          workoutComboIsSame = false;
        }
      
      })
      if (roundComboIsSame) {
        roundsOfSameTypeAchieved.push(roundComboConstant)
      }
      
  })

  const workoutDurationInMinutes = workoutDuration / 60

  //If workout was of or above the minimum duration required for achievements, add up.
  if (workoutDuration > minWorkoutDuration) {
    statsObj.workouts = 1;

    if (userSettings.stance === "orthodox") {
      statsObj.orthodox_workouts = 1;
    } else {
      statsObj.southpaw_workouts = 1;
    }

    if (workoutComboIsSame) {
      statsObj.workout_of_type[workoutComboConstant] = 1
    }

    roundsOfSameTypeAchieved.forEach(round_type => {
      if (statsObj.round_of_type[round_type]) {
        statsObj.round_of_type[round_type] += 1;
      } else {
        statsObj.round_of_type[round_type] = 1;
      }
      
    })
  }

  //workout minutes should be counted no matter.
  statsObj.workout_minutes = workoutDurationInMinutes;

  return statsObj;
   
} 