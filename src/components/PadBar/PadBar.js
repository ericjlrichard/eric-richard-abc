
import Timer from "../Timer/Timer"
import "./PadBar.scss"
import { useState, useEffect } from "react"

import { translateComboString } from "../../js/combo-utils"

export default function PadBar({roundNumber, currentCombo, actionsArray, roundTime}) {
  const [roundTimeLeft, setRoundTimeLeft] = useState(undefined)

  useEffect(() => {
    setRoundTimeLeft(roundTime)
  }, [])

  useEffect(() => {
    if (roundTimeLeft > 0) {
      setTimeout(() => {
        setRoundTimeLeft(roundTimeLeft - 1)
      }, 1000)
    }
  })

  return !!currentCombo && (
    <div className="pad-bar">
      <div className="pad-bar__round-number">
        Round {roundNumber}
      </div>

      <div className="pad-bar__combo">
        {currentCombo.last_name + "'s " + translateComboString(currentCombo.combo_string, actionsArray)}
      </div>

      <div className="pad-bar__timer">
        <Timer seconds={roundTimeLeft} />
      </div>
      
    </div>
  )
    
}