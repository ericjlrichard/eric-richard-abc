import PadBox from "../../components/PadBox/PadBox"

import "./Train.scss"

import { useEffect, useState } from "react";
import axios from "axios";

import TrainModal from "../../components/TrainModal/TrainModal";

import { useNavigate } from "react-router-dom";

import userUtils from "../../js/user-utils";

import { timerFromSeconds } from "../../js/date-time-utils";
import Timer from "../../components/Timer/Timer";

export default function Train() {
  const navigate = useNavigate();
  const [actionsArray, setActionsArray] = useState(undefined)
  const [combosArray, setCombosArray] = useState(undefined)
  const [showModal, setShowModal] = useState(true)
  const [userSettings, setUserSettings] = useState(userUtils.getSessionSettings())
  const [countdown, setCountdown] = useState(undefined)

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

    console.log(userSettings)
  }, [])

  useEffect(() => {

    if (countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown-1)
      }, 1000)
    }
    

  }, [countdown])


  //Closing the modal returns to main
  const clickClose = (event) => {

    event.preventDefault();
    navigate("/");
  }

  //Modal confirmed, training starts
  const clickTrain = (event) => {
    setShowModal(false);
    setCountdown(userSettings.roundDuration)
    console.log(timerFromSeconds(userSettings.roundDuration))
  }

  if(showModal) {
    return (
      <TrainModal showModal={showModal} clickClose={clickClose} clickTrain={clickTrain} />
    )
  }

  return !!actionsArray && !!combosArray && !showModal && (
    <div className="train-page">
      <Timer seconds={countdown} />
      
      <div className="pads-container">
        <PadBox combosArray={combosArray} actionsArray={actionsArray} userSettings={userSettings} />
      </div>

    </div>
    
  )
}