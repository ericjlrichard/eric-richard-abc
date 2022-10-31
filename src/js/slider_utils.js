//All actions pertaining to ActionSlider.js, for example what action should go on which side depending on the stance.


//determine on which side an action should be on the slider
exports.determineSide = (action, stance) => {
  
  if(!isNaN(action[0])) {
    //if it's a number, deal with overhands: 1o and 2o
    if (action[1] === "o") {
      if (action[0] === "1") {
        return stance === "orthodox" ? "left" : "right"
      } else {
        return stance === "orthodox" ? "right" : "left"
      }
    } else {
      //it's just a regular number, we'll check if it's odd or even
      if (action % 2) {
        return stance === "orthodox" ? "left" : "right"
      } else {
        return stance === "orthodox" ? "right" : "left"
      }
    }
  } else {
    //if it's not a number, check if it's Pull
    if (action === "P") {
      //by convention, Pulls are always going to come from the lead side.
      return stance === "orthodox" ? "left" : "right"
    } else {
      //if it's not a pull it's either a duck, slip or block and they all tell us whether it's executed on the rear or lead side
      if (action[1] === "R") {
        return stance === "orthodox" ? "right" : "left"
      } else {
        return stance === "orthodox" ? "left" : "right"
      }
    }
  }
}

//a fancy term for saying we remove the R or L from blocks, slips and ducks, as to not confuse our poor southpaws. Any necessary adjustment to an action code can be made here too.
exports.renderAction = (action) => {
  const actionsToChange = ["B", "S", "D"]

  if (actionsToChange.indexOf(action[0]) >= 0) {
    return action[0]
  } else {
    return action
  }
}