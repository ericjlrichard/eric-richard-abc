import "./RoundModal.scss";

import Timer from "../Timer/Timer";

import { useEffect, useState } from "react";

export default function RoundModal({showRoundModal, roundIndex, clickStartNow, breakTime}) {
  const [breakCount, setBreakCount] = useState(undefined)

  useEffect(() => {
    if (breakCount === 0) {
      clickStartNow()
    } else {
      setTimeout(() => setBreakCount(breakCount-1), 1000)
    }
  }, [breakCount])

  useEffect(() => {
    setBreakCount(breakTime)
  }, [])

  return showRoundModal && !!breakCount && (
    <div className="round-modal">
      <div className="round-modal__top">
        <h3 className="round-modal__title">
          Coming up: Round {roundIndex + 1}
        </h3>
        <button title="Skip and start now" className="round-modal__timer" onClick={clickStartNow}>
          <Timer seconds={breakCount} cutMinutes={true} />
        </button>
      </div>
    </div>
  )
}