import "./Timer.scss"

import { timerFromSeconds } from "../../js/date-time-utils"

export default function Timer({seconds, cutMinutes}) {

  const className = seconds <= 10 ? "timer timer--warning" : "timer"
  

  //if cutMinutes, we simply display the remaining seconds. EZ.
  return (
    <div className={className}>
      {cutMinutes? seconds : timerFromSeconds(seconds)}
    </div>
  )
}