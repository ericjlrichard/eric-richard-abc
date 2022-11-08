import "./NewTrain.scss";

import { useState, useEffect } from "react";
import TrainModal from "../TrainModal/TrainModal";
import { useNavigate } from "react-router-dom";

import userUtils from "../../js/user-utils.js";
import Loading from "../Loading/Loading";
import NewPadBox from "../NewPadBox/NewPadBox";
import { createWorkout, createRandomCombo } from "../../js/combo-utils";

import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080"

let combosArrayFiltered = []

export default function NewTrain() {
  const [showTrainModal, setShowTrainModal] = useState(true);
  const [workout, setWorkout] = useState(undefined);
  const [actionsArray, setActionsArray] = useState(undefined);
  const [combosArray, setCombosArray] = useState(undefined);
  const [boxerRandom, setBoxerRandom] = useState(undefined)

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/actionswithtypes`)
      .then((res) => {
        setActionsArray(res.data);

        axios
          .get(`${API_URL}/combos`)
          .then((res) => {
            setCombosArray(res.data);

            axios.get(`${API_URL}/boxers/Random`)
            .then(res => {
              //getting the boxer with the nickname "Random". We will link random dynamic combos to him.
              setBoxerRandom(res.data)
            })
            .catch(err => {
              console.log(err)
            })
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ##### Train Modal events
  const clickClose = (event) => {
    navigate("/");
  };

  const clickTrain = (event) => {
    setShowTrainModal(false);

    const userSettings = userUtils.getSessionSettings();

    //filtering to only selected boxers
    combosArrayFiltered = combosArray.filter(
      (item) => userSettings.combos.indexOf(item.boxer_id.toString()) >= 0
    );

    if (userSettings.combos.indexOf(boxerRandom.id.toString()) >= 0) {

      //add random combos, approximately the same number as the other boxers, with a minimum of 7
      const randomCombosNb = Math.floor(combosArrayFiltered.length / userSettings.combos.length) || 7
      for(let i = 0; i < randomCombosNb; i++) {

        const minRandomActions = 2;
        const maxRandomActions = 7;

        const comboObj = {
          id: i + combosArray.length + 1,
          boxer_id: boxerRandom.id,
          combo_string: createRandomCombo(actionsArray, minRandomActions, maxRandomActions).map(item => item.code).join(","),
          first_name: boxerRandom.first_name,
          last_name: boxerRandom.last_name,
          nickname: boxerRandom.nickname

        }

        combosArrayFiltered.push(comboObj)
      }
    }

    setWorkout(
      createWorkout(
        combosArrayFiltered,
        Number(userSettings.workoutDuration),
        Number(userSettings.roundDuration),
        30
      )
    );
  };

  // ##### Train Modal events end

  while (!combosArray || !actionsArray || !boxerRandom) {
    return (
      <div className="modal__container">
        <Loading loadMessage={"loading combos..."} />
      </div>
    );
  }

  //displaying the settings modal before training
  if (showTrainModal) {
    return (
      <div className="modal__container">
        <TrainModal
          showTrainModal={showTrainModal}
          clickClose={clickClose}
          clickTrain={clickTrain}
        />
      </div>
    );
  }

  while (!workout) {
    return (
      <div className="modal__container">
        <Loading loadMessage="Creating Workout..." />
      </div>
    );
  }

  //swinging the workout to the PadBox, it's their problem now.
  return (
    !!workout && (
      <div className="train__page">
        <div className="pads-container">
          <NewPadBox workout={workout} combosArray={combosArrayFiltered} />
        </div>
      </div>
    )
  );
}
