import "./PadBox.scss"

import Pad from "../Pad/Pad"
import { useState, useEffect } from "react";
import {changePadState} from "../../js/time-anim-utils";

const startingPadStates = [];
for (let i = 0; i < 12; i++) {
  startingPadStates.push("fadein")
}

export default function PadBox() {
  const [padStates, setPadStates] = useState(startingPadStates)

  useEffect(() => {
    
  }, [])
  

  return (
    <div className="pad-box">
      <Pad orientation="vertical" number="1" padState={padStates[0]} />
      <Pad orientation="vertical" number="2" padState={padStates[1]}/>
      <Pad orientation="horizontal" number="3" padState={padStates[2]}/>
      <Pad orientation="horizontal" number="4" padState={padStates[3]}/>
      <Pad orientation="vertical" number="5" padState={padStates[4]}/>
      <Pad orientation="vertical" number="6" padState={padStates[5]}/>

      <Pad orientation="vertical" number="7" padState={padStates[6]}/>
      <Pad orientation="vertical" number="8" padState={padStates[7]}/>
      <Pad orientation="horizontal" number="9" padState={padStates[8]}/>
      <Pad orientation="horizontal" number="10" padState={padStates[9]}/>
      <Pad orientation="vertical" number="11" padState={padStates[10]}/>
      <Pad orientation="vertical" number="12" padState={padStates[11]}/>
    </div>
  )
}