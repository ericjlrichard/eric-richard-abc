import "./PadBox.scss"

import Pad from "../Pad/Pad"
import { useState, useEffect } from "react";
import {changePadState, setPadAnimWithReset} from "../../js/time-anim-utils";


import ActionSlider from "../ActionSlider/ActionSlider";

const startingPadStates = [];
for (let i = 0; i < 12; i++) {
  startingPadStates.push("fadein")
}
const restingPadStates = [];
for (let i = 0; i < 12; i++) {
  restingPadStates.push("rest")
}

let padStatesVar = [];
let padStatesFunc = [];

export default function PadBox() {
  const [padStates, setPadStates] = useState(restingPadStates)

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
    //lining up pad numbers with their index
    padStatesVar = []
    padStatesFunc = []

    padStatesVar.push(padState1, padState2, padState3, padState4, padState5, padState6, padState7, padState8, padState9, padState10, padState11, padState12)

    padStatesFunc.push(setPadState1, setPadState2, setPadState3, setPadState4, setPadState5, setPadState6, setPadState7, setPadState8, setPadState9, setPadState10, setPadState11, setPadState12)

    setPadStates(startingPadStates)

    setTimeout(() => {
      setPadStates(restingPadStates)
    }, 5000)

    setPadAnimWithReset(padStatesFunc[1], "hit", 5000, "rest")
    setPadAnimWithReset(padStatesFunc[2], "hit", 5500, "rest")
    setPadAnimWithReset(padStatesFunc[3], "hit", 6000, "rest")
  }, [])
  

  return (
    <div className="pad-box">
      <Pad orientation="vertical" number="1" padState={padState1} />
      <Pad orientation="vertical" number="2" padState={padState2}/>
      <Pad orientation="horizontal" number="3" padState={padState3}/>
      <Pad orientation="horizontal" number="4" padState={padState4}/>
      <Pad orientation="vertical" number="5" padState={padStates[4]}/>
      <Pad orientation="vertical" number="6" padState={padStates[5]}/>

      <ActionSlider />
      <Pad orientation="vertical" number="7" padState={padStates[6]}/>
      <Pad orientation="vertical" number="8" padState={padStates[7]}/>
      <Pad orientation="horizontal" number="9" padState={padStates[8]}/>
      <Pad orientation="horizontal" number="10" padState={padStates[9]}/>
      <Pad orientation="vertical" number="11" padState={padStates[10]}/>
      <Pad orientation="vertical" number="12" padState={padStates[11]}/>

    </div>
  )
}