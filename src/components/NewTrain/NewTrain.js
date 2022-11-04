
import "./NewTrain.scss";

import { useState, useEffect } from "react"; 
import TrainModal from "../TrainModal/TrainModal"
import { Navigate } from "react-router-dom";

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
    Navigate("/")
  }

  const clickTrain = (event) => {
    setShowTrainModal(false)

    const userSettings = userUtils.getSessionSettings();

    setWorkout(createWorkout(combosArray, Number(userSettings.workoutDuration), Number(userSettings.roundDuration), 30))
  }

  // ##### Train Modal events end

  //Am I dumb? Is this dumb? It seems to make the most sense, it's like a fake async/await kinda thing... I dunno, at the same time it feels fucking sketch. OTOH I ain't lying I AM loading combos and actions. And await async is just a glorified while loop anyway...
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

  //swinging the workout to the PadBox, now it's their problem.
  return !!workout &&  (
    <div className="train__page">
      <NewPadBox workout={workout} />
    </div>
  )
}