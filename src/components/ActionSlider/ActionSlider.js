import "./ActionSlider.scss"

import { useEffect, useState } from "react";

import { setActionAnimWithReset } from "../../js/time-anim-utils";

import { determineSide, renderAction } from "../../js/slider_utils";

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

    console.log(determineSide("BR", "southpaw"))

    //set action map for sliding actions
    round.forEach(action => {
      time += 250
      if (action === ".") {
        
      } else {

        //if the first character is not-not a number :P
        let actionIndex = -1
        let actionClass = "";


        if (determineSide(action, userSettings.stance) === "left") {
          actionIndex = actionLeft
          actionLeft = actionLeft === 3 ? 0 : actionLeft+ 1
          actionClass = "slide-right"
        } else {
          actionIndex = actionRight
          actionRight = actionRight === 7 ? 4 : actionRight+ 1
          actionClass = "slide-left"          
        }

        setActionAnimWithReset(actions[actionIndex], renderAction(action), actionClass, time, "rest")
      }
    } )

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