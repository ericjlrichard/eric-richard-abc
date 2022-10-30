import PadBox from "../../components/PadBox/PadBox"

import "./Train.scss"

import {setIntervalWithStop} from "../../js/time-anim-utils"

export default function Train() {

  return (
    <div className="train-page">
      <h1>Training Page</h1>

      <div className="pads-container">
        <PadBox />
      </div>
      

    </div>
    
  )
}