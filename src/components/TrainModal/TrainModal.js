import { useState } from "react";
import "./TrainModal.scss"

export default function TrainModal({showModal, clickClose, userSettings}) {
  const [numSeconds, setNumSeconds] = useState(5);

  console.log(userSettings)

  return showModal && (
    <div className="modal">
      <div className="modal__top">
        <div className="modal__close" title="Close and return to main" onClick={clickClose}>
          <button title="Not feeling beast mode today, close workout!">X</button>
        </div>
      </div>
      <h3>Workout settings</h3>

      <div className="modal__settings">
        <div className="modal__section">
          Stance: 
          <input id="radioOrthodox" type="radio" name="stance" value="orthodox" defaultChecked={userSettings.stance="orthodox"}></input>
          <label htmlFor="radioOrthodox">orthodox</label>
          <input id="radioSouthpaw" type="radio" name="stance" value="southpaw" defaultChecked={userSettings.stance="southpaw"}></input>
          <label htmlFor="radioOrthodox">southpaw</label>
        </div>
        <div className="modal__section">
          Duration 
          <input className="modal__time-input" name="workoutDuration" type="number" placeholder="30"></input> minutes 
          Round Duration
          <input className="modal__time-input" name="roundDuration" type="number" placeholder="180"></input> seconds
        </div>
        <div className="modal__section--two-cols">
          <div className="modal__sub-section">
            Combos
            <input name="combos" value="all" type="radio" id="allCombos"></input>
            <label htmlFor="allCombos">all</label>
            <input name="combos" value="all" type="radio" id="someCombos"></input>
            <label htmlFor="someCombos">some</label>

            Sounds
            
            <label className="switch">
              <input type="checkbox"/>
              <span className="slider round"></span>
            </label>
          </div>
          <div className="modal__subsection">
            BoxersCombos, will need to get axios for this...
          </div>
        </div>
      </div>

      <button className="modal__button">Starting in {numSeconds} seconds</button>
    </div>
  )
}