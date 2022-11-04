import PadBox from "../../components/PadBox/PadBox"

import "./Train.scss"

import { useEffect, useState } from "react";
import axios from "axios";

import TrainModal from "../../components/TrainModal/TrainModal";
import RoundModal from "../../components/RoundModal/RoundModal";

import { useNavigate } from "react-router-dom";

import userUtils from "../../js/user-utils";

import Timer from "../../components/Timer/Timer";

export default function Train() {
  const navigate = useNavigate();
  const [actionsArray, setActionsArray] = useState(undefined)
  const [combosArray, setCombosArray] = useState(undefined)
  const [showModal, setShowModal] = useState(true)
  const [showRoundModal, setShowRoundModal] = useState(true)
  const [userSettings, setUserSettings] = useState(userUtils.getSessionSettings())
  const [roundCountdown, setRoundCountdown] = useState(undefined)
  const [roundIndex, setRoundIndex] = useState(0)

  //onLoad
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/actionswithtypes`)
    .then(res => {
      setActionsArray(res.data)

      axios.get(`${process.env.REACT_APP_SERVER_URL}/combos`)
      .then(res => {
        setCombosArray(res.data)
      })
      .catch(err => {
        console.log(err)
      })

    })
    .catch(err => {
      console.log(err)
    })

    setUserSettings(userUtils.getSessionSettings())

  }, [])


  //countdown the remaining time
  useEffect(() => {

    if (roundCountdown > 0) {
      setTimeout(() => {
        setRoundCountdown(roundCountdown-1)
      }, 1000)
    }
  
  }, [roundCountdown])

   //countdown the remaining time
   useEffect(() => {

    //setShowRoundModal(true)
  
  }, [roundIndex])


  //Closing the modal returns to main
  const clickClose = (event) => {

    event.preventDefault();
    navigate("/");
  }

  //Training Modal confirmed, training starts with round 1 modal
  const clickTrain = (event) => {
    setShowModal(false);
    setRoundCountdown(userSettings.roundDuration)
  }

  //for round modal
  const clickStartNow = (event) => {
    setShowRoundModal(false);
  }

  if(showModal) {
    return (
      <div className="modal__container">
        <TrainModal showModal={showModal} clickClose={clickClose} clickTrain={clickTrain} />
      </div>
    )
  }

  if(showRoundModal) {
    return (
      <div className="modal__container">
        <RoundModal clickStartNow={clickStartNow} showRoundModal={showRoundModal} roundIndex={roundIndex} breakTime={30} />
      </div>
    )
  }

  return !!actionsArray && !!combosArray && !showModal && !showRoundModal && (
    <div className="train__page">

      <div className="pads-container">
        <div className="train__infos">
          <span>Next Combo:<br></br>
            brief combo desc
          </span>
          <span>Round 1
          <Timer seconds={roundCountdown} /></span>
        </div>

        <PadBox roundIndex={roundIndex} setRoundIndex={setRoundIndex} combosArray={combosArray} actionsArray={actionsArray} userSettings={userSettings} />

        <div className="train__infos">
          Sounds: On / Off
        </div>
      </div>

    </div>
    
  )
}