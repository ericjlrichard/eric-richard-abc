import "./RoundModal.scss";

import Timer from "../Timer/Timer";
import Loading from "../Loading/Loading";

import { useEffect, useState } from "react";

import RandomCombo from "../RandomCombo/RandomCombo";


export default function RoundModal({round, showRoundModal, roundIndex, clickStartNow, breakTime, featuredCombo, boxersArray, combosArray, actionsArray}) {
  const [breakCount, setBreakCount] = useState(30)

  //if the break is over, start the round.
  useEffect(() => {
    if (breakCount === 0) {
      clickStartNow()
    } else {
      setTimeout(() => setBreakCount(breakCount-1), 1000)
    }
  }, [breakCount])

  //waiting for boxers and combos
  while(!boxersArray || !combosArray || !actionsArray) {
    return (
      <Loading loadMessage="Loading images..." />
    )
  }

  return showRoundModal && !!breakCount && (
    <div className="modal__container">
      <div className="round-modal">
        <div className="round-modal__top">
          <h3 className="round-modal__title">
            Coming up: Round {roundIndex + 1}
          </h3>
          <button title="Skip and start now" className="round-modal__timer" onClick={clickStartNow}>
            <Timer seconds={breakCount} cutMinutes={true} />
          </button>
        </div>
        <div className="round-modal__divider"></div>
        <RandomCombo featuredCombo={featuredCombo} boxersArray={boxersArray} combosArray={combosArray} round={round} actionsArray={actionsArray} />
      </div>
    </div>
  )
}