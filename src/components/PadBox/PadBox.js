import "./PadBox.scss"

import Pad from "../Pad/Pad"
import { useState, useEffect } from "react";
import {changePadState, setPadAnimWithReset} from "../../js/time-anim-utils";


import ActionSlider from "../ActionSlider/ActionSlider";

const restingPadStates = [];
for (let i = 0; i < 12; i++) {
  restingPadStates.push("rest")
}

const padStatesFunc = [];

const round = [".",".",".",".","P",".","1","2","3",".",".",".","DR",".",".","2",".","SL",".","3", ".", ".", ".", "1", ".", ".", ".", "2", ".", ".", "3", ".", "12", ".",".",".", "1",".",".", "9", ".", ".", "9", ".",".",".", "11", ".",".",".",".",".",".","1","2","3",".",".",".","DR",".",".","2",".","SL",".","3", ".", ".", ".", "1", ".", ".", ".", "2", ".", ".", "3", ".", "12", ".",".",".", "1",".",".", "9", ".", ".", "9", ".",".",".", "11", ".",".",".",".",".",".","1","2","3",".",".",".","DR",".",".","2",".","SL",".","3", ".", ".", ".", "1", ".", ".", ".", "2", ".", ".", "3", ".", "12", ".",".",".", "1",".",".", "9", ".", ".", "9", ".",".",".", "11", ".",".",".",".",".",".","1","2","3",".",".",".","DR",".",".","2",".","SL",".","3", ".", ".", ".", "1", ".", ".", ".", "2", ".", ".", "3", ".", "12", ".",".",".", "1",".",".", "9", ".", ".", "9", ".",".",".", "11"]

export default function PadBox({userSettings}) {

  const [padState1, setPadState1] = useState ("fadein")
  const [padState2, setPadState2] = useState ("fadein")
  const [padState3, setPadState3] = useState ("fadein")
  const [padState4, setPadState4] = useState ("fadein")
  const [padState5, setPadState5] = useState ("fadein")
  const [padState6, setPadState6] = useState ("fadein")
  const [padState7, setPadState7] = useState ("fadein")
  const [padState8, setPadState8] = useState ("fadein")
  const [padState9, setPadState9] = useState ("fadein")
  const [padState10, setPadState10] = useState ("fadein")
  const [padState11, setPadState11] = useState ("fadein")
  const [padState12, setPadState12] = useState ("fadein")

  useEffect(() => {

    console.log(userSettings.stance)

    padStatesFunc.push(setPadState1, setPadState2, setPadState3, setPadState4, setPadState5, setPadState6, setPadState7, setPadState8, setPadState9, setPadState10, setPadState11, setPadState12)

    let time = 0;

    //set action map for pad hits
    round.forEach(action => {
      time += 250
      if (action === ".") {
        //nothing
      } else {
        if (!isNaN(action[0])) {
          setPadAnimWithReset(padStatesFunc[action - 1], "hit", time, "rest")
        }
        
      }
    } )

  }, [])
  

  return (
    <div className="pad-box">
      <Pad userSettings={userSettings} orientation="vertical" number="1" padState={padState1} />
      <Pad userSettings={userSettings} orientation="vertical" number="2" padState={padState2}/>
      <Pad userSettings={userSettings} orientation="horizontal" number="3" padState={padState3}/>
      <Pad userSettings={userSettings} orientation="horizontal" number="4" padState={padState4}/>
      <Pad userSettings={userSettings} orientation="vertical" number="5" padState={padState5}/>
      <Pad userSettings={userSettings} orientation="vertical" number="6" padState={padState6}/>

      <ActionSlider round={round} userSettings={userSettings}/>
      <Pad userSettings={userSettings} orientation="vertical" number="7" padState={padState7}/>
      <Pad userSettings={userSettings} orientation="vertical" number="8" padState={padState8}/>
      <Pad userSettings={userSettings} orientation="horizontal" number="9" padState={padState9}/>
      <Pad userSettings={userSettings} orientation="horizontal" number="10" padState={padState10}/>
      <Pad userSettings={userSettings} orientation="vertical" number="11" padState={padState11}/>
      <Pad userSettings={userSettings} orientation="vertical" number="12" padState={padState12}/>

    </div>
  )
}