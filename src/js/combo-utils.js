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
        if (previousAction.types.indexOf("lead") >= 0) {
          //A normal combo sometimes has defense in it but I'd say about 90% offense. Could eventually be slideable.
          returnCombo.push(getSkewedFromArrays(getActionsOfCombinedType(actionsArray, ["rear", "defense"]), getActionsOfAnyType(actionsArray, ["lead", "offense"]), 98))
        } else {
          returnCombo.push(getSkewedFromArrays(getActionsOfCombinedType(actionsArray, ["lead", "defense"]), getActionsOfAnyType(actionsArray, ["rear", "offense"]), 99))
        }

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
  //we have a limit of 4 actions per second. For a three minutes round, so should be a maximum of 720 actions, including pauses
  const actionLimit = duration * 4;
  const returnRound = []
  let combosArrayFiltered = []
  let combosUsed = []

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

  //We're gonna start with a 2 seconds padding.
  padSeconds(returnRound, 2)

  while(returnRound.length < actionLimit) {
    const nextCombo = getRandom(combosArrayFiltered);

    combosUsed.push(nextCombo)

    const nextComboArray = nextCombo.combo_string.split(",");

    returnRound.push(...padComboIncrements(nextComboArray, 4))
    padSeconds(returnRound, 4)
    returnRound.push(...padComboIncrements(nextComboArray, 4))
    padSeconds(returnRound, 4)
    returnRound.push(...padComboIncrements(nextComboArray, 2))
    padSeconds(returnRound, 4)
    returnRound.push(...padComboIncrements(nextComboArray, 2))
    padSeconds(returnRound, 4)
    returnRound.push(...padComboIncrements(nextComboArray, 1))
    padSeconds(returnRound, 4)
    returnRound.push(...nextComboArray)
    padSeconds(returnRound, 4)
    returnRound.push(...nextComboArray)
 
    padSeconds(returnRound, 4)
  }
  
  return returnRound.slice(0, actionLimit);
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

//will pad the combo according to speed (slow, medium, fast, extreme), also taking into account that slips and pulls are faster than ducks, for example.
function smartPadCombo(speed) {

}