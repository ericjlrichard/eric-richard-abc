import {getRandom, getRandomFromRange, getSkewedFromArrays} from "./math-utils";

const defaultRoundDuration = process.env.REACT_APP_DEFAULT_ROUND_DURATION || 180;

//returns an array of actions from ** any of the types ** included in arrayTypes
export function getActionsOfAnyType(arrayActions, arrayTypes) {
  const returnArray = []

  arrayActions.forEach(action => {
    action.types.forEach(type => {
      if ((arrayTypes.indexOf(type) >= 0) && (returnArray.indexOf(action) < 0)) {
        returnArray.push(action)
      }
    })
  })

  return returnArray;
}

//the action returned must contain all types passed. May return an empty array but not when called correctly.
export function getActionsOfCombinedType(arrayActions, arrayTypes) {
  const returnArray = []

  arrayActions.forEach(action => {
    let found = true;
    let i = 0;

    while((found) && (i<arrayTypes.length)) {
      found = action.types.indexOf(arrayTypes[i]) >= 0;
      i++
    }

    if(found) {
      returnArray.push(action)
    }
  })

  return returnArray;
}

//
function getNextActionSide(action) {

  //If it's a Slip or Duck, we should return a same side action: Slip to the right, punch with the right
  //If it's a block however, makes sense to block with the left and strike with the right
  if ((action.types.indexOf("defense") >= 0) && ((action.code[0] !== "B"))) {
    
    return action.types.indexOf("rear") >= 0 ? "rear" : "lead"
  } else {
    return action.types.indexOf("rear") >= 0 ? "lead" : "rear"
  }
  
}

//creates a combo of min to max actions, using the included actions.
//alternateSide makes sure that after say an action on the left, an action on the right happens most times (say 95% of the time)
export function createRandomCombo(actionsArray, min, max, alternateSide = true) {
  const returnCombo = []
  const actionsNb = getRandomFromRange(min, max)

  for (let i = 0; i < actionsNb; i++) {
    let nextAction = getRandom(actionsArray)

    //if it's the first action, nothing to check, just add it, becoming the basis or our combo
    if (i===0) {
      returnCombo.push(nextAction)
    } else {
      if (alternateSide) {
        //first getting the previous action and checking on which side it is

        const previousAction = returnCombo[i-1]

        const nextActionSide = getNextActionSide(previousAction);

        const previousActionSide = previousAction.types.indexOf("lead") >= 0 ? "lead" : "rear";

        //Eight times out of ten (80%), if the previous action was an attack or a block, we will chain an attack from the other side. If it was a slip or duck, we will chain an attack from the same side.
        returnCombo.push(getSkewedFromArrays(getActionsOfAnyType(actionsArray, [previousActionSide, "defense"]), getActionsOfCombinedType(actionsArray, [nextActionSide, "offense"]), 80))
        

      } else {
        //completely random combo
        returnCombo.push(nextAction)
      }
    }
  }

  return returnCombo;
}

//type: warmup, regular, cooldown, punchout (say, 1-2-1-2-1-2-3-4 in rapid succession)
//duration: in seconds, defaulted in .env to 180 = 3 minutes
export function createRandomRound(combosArray, type = "regular", duration = defaultRoundDuration ) {
  //we have a limit of 4 actions per second. For a three minutes round, that should be a maximum of 720 actions, including pauses
  const actionLimit = duration * 4;
  const returnObj = {}

  //we will store the used combos ID in combos, and the round instructions themselves in round
  returnObj.combos = []
  returnObj.round = []

  let combosArrayFiltered = []

  switch(type) {
    case "warmup":
      //warmup code: filter combos to 1, 2, 3, slips
      break;
    case "cooldown":
      //cooldown code: filter combos to warmup settings for now
      break;
    case "punchout":
      //hmm. Will probably construct and return the round right here.
      break;
    default:
      combosArrayFiltered = combosArray;
  }

  //2 seconds padding at round start
  
  padSeconds(returnObj.round, 2)

  while(returnObj.round.length < actionLimit) {
    const nextCombo = getRandom(combosArrayFiltered);

    returnObj.combos.push(nextCombo.id)

    const nextComboArray = nextCombo.combo_string.split(",");

    //switch combo indicator
    returnObj.round.push("!")

    //TD This should be a function...
    returnObj.round.push(...padComboIncrements(nextComboArray, 4))
    padSeconds(returnObj.round, 4)
    returnObj.round.push(...padComboIncrements(nextComboArray, 4))
    padSeconds(returnObj.round, 4)
    returnObj.round.push(...padComboIncrements(nextComboArray, 2))
    padSeconds(returnObj.round, 4)
    returnObj.round.push(...padComboIncrements(nextComboArray, 2))
    padSeconds(returnObj.round, 4)
    returnObj.round.push(...padComboIncrements(nextComboArray, 1))
    padSeconds(returnObj.round, 4)
    returnObj.round.push(...nextComboArray)
    padSeconds(returnObj.round, 4)
    returnObj.round.push(...nextComboArray)
 
    padSeconds(returnObj.round, 4)
  }
  
  returnObj.round = returnObj.round.slice(0, actionLimit)
  return returnObj;
}

//adds pauses of "seconds" seconds. Doesn't take fractions into account.
function padSeconds(combo, seconds) {
  for(let i = 0; i < seconds; i++) {
    combo.push(".", ".", ".", ".")
  }
}

//pad combo with simple, automatic increment number of 250ms
function padComboIncrements(comboArray, increment) {
  const returnArray = []
  comboArray.forEach(item => {
    returnArray.push(item)
    for(let i=0; i<increment; i++) {
      returnArray.push(".")
    }
  })

  return returnArray;
}

//Pad the combo according to speed (slow, medium, fast, extreme), also taking into account that slips and pulls are faster than ducks, for example.
function smartPadCombo(speed) {

}

export function createWorkout (combosArray, workoutDuration, roundDuration, breakDuration) {

  //determine how many seconds a round + break will last
  const realRoundDuration = roundDuration + breakDuration;

  const workoutArray = []

  //determine number of rounds inside workoutDuration
  const numberOfRounds = Math.floor((workoutDuration * 60) / realRoundDuration)

  for(let i = 0; i< numberOfRounds; i++) {
    workoutArray.push(createRandomRound(combosArray, "regular", roundDuration))
  }

  return workoutArray;
}

//translates a combo string (ex: 1,2,SL) into a more readable format (ex: jab, cross, Slip Lead)
export function translateComboString(comboString, actionsArray) {
  let returnString = "";
  const comboArray = comboString.split(",")

  comboArray.forEach(code => {
    returnString += actionsArray.find(item => item.code === code).name + ` (${code}), `
  })

  return returnString.slice(0, returnString.length-2);
}

//if the action is a pad action, return the pad number. Otherwise, return nothing for now
export function determinePad(action) {
  if (action === "1o" || action === "2o") {
    return action[0]
  } else if(!isNaN(action)) {
    return action
  } else {
    return undefined
  }
  
}