import "./Timer.scss"

import { timerFromSeconds } from "../../js/date-time-utils"

export default function Timer({seconds, cutMinutes}) {

  //if cutMinutes, we simply display the remaining seconds. EZ.
  return (
    <div>
      {cutMinutes? seconds : timerFromSeconds(seconds)}
    </div>
  )
}