import "./ActionSlider.scss"

import { useEffect, useState } from "react";

import { setActionAnimWithReset } from "../../js/time-anim-utils";

import BoxAction from "../BoxAction/BoxAction"

const actions = [];

export default function ActionSlider({round, userSettings}) {
  const [l1, setL1] = useState({action: "", anim: "rest"})
  const [l2, setL2] = useState({action: "", anim: "rest"})
  const [l3, setL3] = useState({action: "", anim: "rest"})
  const [l4, setL4] = useState({action: "", anim: "rest"})

  const [r1, setR1] = useState({action: "", anim: "rest"})
  const [r2, setR2] = useState({action: "", anim: "rest"})
  const [r3, setR3] = useState({action: "", anim: "rest"})
  const [r4, setR4] = useState({action: "", anim: "rest"})

  useEffect(() => {
    
    actions.push(setL1, setL2, setL3, setL4);
    actions.push(setR1, setR2, setR3, setR4);

    let time = 0;
    let actionLeft = 0;
    let actionRight = 4;

    //set action map for sliding actions
    round.forEach(action => {
      time += 250
      if (action === ".") {
        
      } else {

        //if the first character is not-not a number :P
        let actionIndex = -1
        let actionClass = "";

        if (action % 2) {
          if (userSettings.stance === "orthodox") {
            actionIndex = actionLeft
            actionLeft = actionLeft === 3 ? 0 : actionLeft+ 1
            actionClass = "slide-rear"
          } else {
            actionIndex = actionRight
            actionRight = actionRight === 7 ? 4 : actionRight+ 1
            actionClass = "slide-lead"
          }
          
        } else {
          if (userSettings.stance === "orthodox") {
            actionIndex = actionRight
            actionRight = actionRight === 7 ? 4 : actionRight+ 1
            actionClass = "slide-lead"
          } else {
            actionIndex = actionLeft
            actionLeft = actionLeft === 3 ? 0 : actionLeft+ 1
            actionClass = "slide-rear"            
          }
        }

        console.log(actionIndex, action)

        setActionAnimWithReset(actions[actionIndex], action, actionClass, time, "rest")
      }
    } )

    // setActionAnimWithReset(setL1, "2", "slide-right", 5000, "rest", 6000);
    // setActionAnimWithReset(setR1, "3", "slide-left", 5500, "rest", 6500);
    // setActionAnimWithReset(setL2, "4", "slide-right", 6000, "rest", 7000)
    // setActionAnimWithReset(setL3, "6", "slide-right", 8000, "rest", 9000)
    // setActionAnimWithReset(setL4, "12", "slide-right", 9000, "rest", 10000)
    // setActionAnimWithReset(setL2, "7", "slide-right", 10000, "rest", 11000)
  }, [])
  

  return (
    <div className="slider">
      <BoxAction  side="lead" state={l1}/>
      <BoxAction  side="lead" state={l2}/>
      <BoxAction  side="lead" state={l3} />
      <BoxAction  side="lead" state={l4} />

      <BoxAction action="R1" side="rear" state={r1}/>
      <BoxAction action="R2" side="rear" state={r2}/>
      <BoxAction action="R3" side="rear" state={r3} />
      <BoxAction action="R3" side="rear" state={r4} />
    </div>
  )
}