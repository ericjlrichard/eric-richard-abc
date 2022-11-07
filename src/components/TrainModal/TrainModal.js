import { useState, useEffect } from "react";
import "./TrainModal.scss";
import axios from "axios";
import userUtils from "../../js/user-utils";

const API_URL = process.env.REACT_APP_SERVER_URL;

export default function TrainModal({ showTrainModal, clickClose, clickTrain }) {
  const [numSeconds, setNumSeconds] = useState(5);
  const [boxers, setBoxers] = useState(undefined);
  const [cancelTimer, setCancelTimer] = useState(false);
  const [userSettings, setUserSettings] = useState(undefined);

  useEffect(() => {
    axios
      .get(`${API_URL}/boxers`)
      .then((res) => {
        setBoxers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      setUserSettings(userUtils.getSessionSettings())
  }, []);

  //each time numSeconds changes, we set another 1 second timer, unless the automatic start (cancelTimer) has been cancelled
  useEffect(() => {
    if (!cancelTimer) {
      setTimeout(() => {
        setNumSeconds(numSeconds - 1);
      }, 1000);

      if (numSeconds === 0) {
        clickTrain();
      }
    }

  }, [numSeconds]);

  // ######## form tools

  const enableCheckBoxers = (enabled) => {
    boxers.forEach((boxer) => {
      document.getElementById(`checkBoxers${boxer.id}`).disabled = !enabled;
    });
  };

  const checkAllCheckBoxers = () => {
    boxers.forEach((boxer) => {
      document.getElementById(`checkBoxers${boxer.id}`).checked = true;
    });
  };

  const getCheckBoxers = () => {
    const boxerIdArray = [];

    boxers.forEach((boxer) => {
      if (document.getElementById(`checkBoxers${boxer.id}`).checked) {
        boxerIdArray.push(boxer.id);
      }
    });
    return boxerIdArray;
  };
  // ######## form events

  const handleComboChange = (event) => {
    if (event.target.value === "all") {
      enableCheckBoxers(false);
      checkAllCheckBoxers()
    } else {
      enableCheckBoxers(true);
    }
  };

  const handleSubmit = (event) => {

    
    event.preventDefault();
    let userSettingsObj = {};
    userSettingsObj.stance = event.target.stance.value;

    userSettingsObj.workoutDuration = event.target.workoutDuration.value.trim()
      ? event.target.workoutDuration.value
      : 30;

    userSettingsObj.roundDuration = event.target.roundDuration.value.trim()
      ? event.target.roundDuration.value
      : 180;

    userSettingsObj.sounds = event.target.sounds.checked;

    userSettingsObj.combos = getCheckBoxers().join(",");

    userSettingsObj.combosAll = event.target.combos.value

    userUtils.setSessionSettings(userSettingsObj);

    clickTrain();
  };

  //whenever a user click on anything in the form, cancel automatic start
  const handleClick = (event) => {
    setCancelTimer(true);
  };

  return showTrainModal &&
  !!boxers && !!userSettings && (
    
      <form
        className="modal"
        name="modalForm"
        onSubmit={handleSubmit}
        onClick={handleClick}
      >
        <div className="modal__top">
          <h3 className="modal__title">Workout settings</h3>
          <div
            className="modal__close"
            title="Close and return to main"
            onClick={clickClose}
          >
            <button className="modal__button--close" title="Not feeling beast mode today, close workout!">
              X
            </button>
          </div>
        </div>

        <div className="modal__settings">
          <div className="modal__section">
            Stance:
            <input
              id="radioOrthodox"
              type="radio"
              name="stance"
              value="orthodox"
              defaultChecked={(userSettings.stance = "orthodox")}
            ></input>
            <label htmlFor="radioOrthodox">orthodox</label>
            <input
              id="radioSouthpaw"
              type="radio"
              name="stance"
              value="southpaw"
              defaultChecked={(userSettings.stance = "southpaw")}
            ></input>
            <label htmlFor="radioOrthodox">southpaw</label>
          </div>

          <div className="modal__section">
            Duration:
            <input
              className="modal__time-input"
              name="workoutDuration"
              type="number"
              placeholder="30"
              defaultValue={userSettings.workoutDuration}
            ></input>{" "}
            minutes
            <br></br>Round Duration:
            <input
              className="modal__time-input"
              name="roundDuration"
              type="number"
              placeholder="180"
              defaultValue={userSettings.roundDuration}
            ></input>{" "}
            seconds
          </div>

          <div className="modal__section--two-cols">
            <div className="modal__sub-section modal__sub-section--left">
              Combos:<br></br>
              <input
                name="combos"
                value="all"
                type="radio"
                id="allCombos"
                defaultChecked={userSettings.combosAll === "all"}
                onChange={handleComboChange}
              ></input>
              <label htmlFor="allCombos">all</label><br></br>
              <input
                name="combos"
                value="some"
                type="radio"
                id="someCombos"
                defaultChecked={userSettings.combosAll !== "all"}
                onChange={handleComboChange}
              ></input>
              <label htmlFor="someCombos">some</label>
              <br></br>
              <br></br>
              Sounds:
              <label className="switch">
                <input
                  name="sounds"
                  type="checkbox"
                  defaultChecked={userSettings.sounds}
                />
                <span className="check-slider round"></span>
              </label>
            </div>

            <div className="modal__subsection">
              {boxers.map((item) => (
                <div key={item.id}>
                  <input
                    className="modal__check-boxers"
                    type="checkbox"
                    defaultChecked={userSettings.combos.find(haystack => { return Number(haystack) === item.id })}
                    disabled={userSettings.combosAll === "all"}
                    id={`checkBoxers${item.id}`}
                    value={item.id}
                  ></input>{" "}
                  {item.first_name +
                    " '" +
                    item.nickname +
                    "' " +
                    item.last_name}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className="modal__button">
          {cancelTimer ? `I'm ready!` : `Starting in ${numSeconds} seconds`}
        </button>
      </form>
    
  );
}
