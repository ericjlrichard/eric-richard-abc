import "./Timer.scss"

import { timerFromSeconds } from "../../js/date-time-utils"

export default function Timer({seconds}) {


  return (
    <div>
      {timerFromSeconds(seconds)}
    </div>
  )
}