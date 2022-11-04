import "./RoundModal.scss";

import Timer from "../Timer/Timer";
import Loading from "../Loading/Loading";

import { useEffect, useState } from "react";



import axios from "axios";

import { getRandom } from "../../js/math-utils";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"

export default function RoundModal({round, showRoundModal, roundIndex, clickStartNow, breakTime}) {
  const [breakCount, setBreakCount] = useState(undefined)
  const [boxers, setBoxers] = useState(undefined)
  const [combos, setCombos] = useState(undefined)
  let randomCombo = undefined;

  //if the break is over, start the round.
  useEffect(() => {
    if (breakCount === 0) {
      clickStartNow()
    } else {
      //setTimeout(() => setBreakCount(breakCount-1), 1000)
    }
  }, [breakCount])

  useEffect(() => {
    setBreakCount(breakTime)
    axios.get(`${API_URL}/boxers`)
    .then(res => {
      setBoxers(res.data)

      axios.get(`${API_URL}/combos`)
      .then(res => {
        setCombos(res.data)

      })
      .catch(err => {
        console.log(err)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  //waiting for boxers and combos
  while(!boxers || !combos) {
    return (
      <Loading loadMessage="Loading images..." />
    )
  }

  randomCombo = combos.find(item => item.id === getRandom(round.combos))

  console.log(randomCombo);

  return !!randomCombo && showRoundModal && !!breakCount && (
    <div className="round-modal">
      <div className="round-modal__top">
        <h3 className="round-modal__title">
          Coming up: Round {roundIndex + 1}
        </h3>
        <button title="Skip and start now" className="round-modal__timer" onClick={clickStartNow}>
          <Timer seconds={breakCount} cutMinutes={true} />
        </button>
      </div>
      <div className="round-modal__combo">
        This round featuring:
        {randomCombo.combo_string}
        {boxers.find(item => item.id === randomCombo.boxer_id).first_name + " " + boxers.find(item => item.id === randomCombo.boxer_id).last_name}
        
        <img className="round-modal__img" src={require("../../assets/" + boxers.find(item => item.id === randomCombo.boxer_id).img)} alt="Boxer Profile" />

      </div>
    </div>
  )
}