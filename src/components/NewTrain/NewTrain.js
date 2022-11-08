
import "./NewTrain.scss";

import { useState, useEffect } from "react"; 
import TrainModal from "../TrainModal/TrainModal"
import { useNavigate } from "react-router-dom";

import userUtils from "../../js/user-utils.js"
import Loading from "../Loading/Loading";
import NewPadBox from "../NewPadBox/NewPadBox"
import { createWorkout } from "../../js/combo-utils";

import axios from "axios";

export default function NewTrain() {

  const [showTrainModal, setShowTrainModal] = useState(true)
  const [workout, setWorkout] = useState(undefined)
  const [actionsArray, setActionsArray] = useState(undefined)
  const [combosArray, setCombosArray] = useState(undefined)

  const navigate = useNavigate();

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

  }, [])


  // ##### Train Modal events
  const clickClose = (event) => {
    navigate("/")
  }

  const clickTrain = (event) => {
    setShowTrainModal(false)

    const userSettings = userUtils.getSessionSettings();

    setWorkout(createWorkout(combosArray, Number(userSettings.workoutDuration), Number(userSettings.roundDuration), 30))
  }

  // ##### Train Modal events end

  while (!combosArray || !actionsArray) {
    return (
      <div className="modal__container">
        <Loading loadMessage={"loading combos..."} />
      </div>
      
    )
  }

  //displaying the settings modal before training
  if (showTrainModal) {
    return (
      <div className="modal__container">
        <TrainModal showTrainModal={showTrainModal} clickClose={clickClose} clickTrain={clickTrain}/>
      </div>
      
    )
  }

  while (!workout) {
    return (
      <div className="modal__container">
        <Loading loadMessage="Creating Workout..." />
      </div>
    )
  }

  //swinging the workout to the PadBox, it's their problem now.
  return !!workout &&  (
    <div className="train__page">
      <div className="pads-container">
        <NewPadBox workout={workout} />
      </div>
      
    </div>
  )
}