import { useState, useEffect } from "react";
import "./TrainModal.scss"
import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL

export default function TrainModal({showModal, clickClose, clickTrain, userSettings}) {
  const [numSeconds, setNumSeconds] = useState(5);
  const [boxers, setBoxers] = useState(undefined)
  const [cancelTimer, setCancelTimer] = useState(false)


  //console.log(userSettings)

  useEffect(() => {

    axios.get(`${API_URL}/boxers`)
    .then (res => {
      setBoxers(res.data)
    })
    .catch(err => {
      console.log(err)
    })

    //doesn't work... only goes to 4?
    // const intervalId = setInterval(() => {
    //   const seconds = numSeconds - 1
    //   setNumSeconds(seconds)
    // }, 1000)

    // setTimeout(() => clearInterval(intervalId), 5000 )
  }, [])

  useEffect(() => {

    if(!cancelTimer) {

      setTimeout(() => {
        setNumSeconds(numSeconds - 1)
      }, 1000)

      if (numSeconds === 0) {
        clickTrain();
      }
    }
    
  }, [numSeconds])

  const handleSubmit = (event) => {
    event.preventDefault();
    clickTrain();
  }

  const handleClick = (event) => {
    setCancelTimer(true)
  }

  return showModal && !!boxers && (
    <form className="modal" onSubmit={handleSubmit} onClick={handleClick}>
      <div className="modal__top">
        <h3 className="modal__title">Workout settings</h3>
        <div className="modal__close" title="Close and return to main" onClick={clickClose}>
          <button title="Not feeling beast mode today, close workout!">X</button>
        </div>
      </div>
      

      <div className="modal__settings">
        <div className="modal__section">
          Stance:
          <input id="radioOrthodox" type="radio" name="stance" value="orthodox" defaultChecked={userSettings.stance="orthodox"}></input>
          <label htmlFor="radioOrthodox">orthodox</label>
          <input id="radioSouthpaw" type="radio" name="stance" value="southpaw" defaultChecked={userSettings.stance="southpaw"}></input>
          <label htmlFor="radioOrthodox">southpaw</label>
        </div>
        <div className="modal__section">
          Duration:
          <input className="modal__time-input" name="workoutDuration" type="number" placeholder="30"></input> minutes 
          <br></br>Round Duration:
          <input className="modal__time-input" name="roundDuration" type="number" placeholder="180"></input> seconds
        </div>
        <div className="modal__section--two-cols">
          <div className="modal__sub-section modal__sub-section--left">

            Combos:
            <input name="combos" value="all" type="radio" id="allCombos" defaultChecked={true}></input>
            <label htmlFor="allCombos">all</label>
            <input name="combos" value="all" type="radio" id="someCombos"></input>
            <label htmlFor="someCombos">some</label><br></br><br></br>

            Sounds:
            
            <label className="switch">
              <input type="checkbox" defaultChecked={true}/>
              <span className="check-slider round"></span>
            </label>

          </div>

          <div className="modal__subsection">
            {boxers.map(item =>  (
              <div key={item.id}>
                <input className="modal__check-boxers" type="checkbox" name={`checkBoxers${item.id}`} value={item.id} checked disabled></input> {item.first_name + " '" + item.nickname + "' " + item.last_name}</div>
            ))}
          </div>

        </div>
      </div>

      <button className="modal__button">{cancelTimer ? `I'm ready!` : `Starting in ${numSeconds} seconds`}</button>
    </form>
  )
}