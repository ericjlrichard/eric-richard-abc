import { useState, useEffect } from "react"
import userUtils from "../../js/user-utils"
import Loading from "../Loading/Loading"

import RoundModal from "../RoundModal/RoundModal"

import { getRandom } from "../../js/math-utils"

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"

export default function NewPadBox({workout}) {
  const [showRoundModal, setShowRoundModal] = useState(true)
  const [roundIndex, setRoundIndex] = useState(undefined)
  const [userSettings, setUserSettings] = useState(undefined)
  const [featuredCombo, setFeaturedCombo] = useState(undefined)
  const [boxersArray, setBoxersArray] = useState(undefined)
  const [combosArray, setCombosArray] = useState(undefined)
  const [actionsArray, setActionsArray] = useState(undefined)

  useEffect(() => {

    
      axios.get(`${API_URL}/boxers`)
      .then(res => {
        setBoxersArray(res.data)
  
        axios.get(`${API_URL}/combos`)
        .then(res => {
          setCombosArray(res.data)
          
          axios.get(`${API_URL}/actions`)
          .then(res => {
            setActionsArray(res.data)
          })
          .catch(err => {
            console.log(err)
          })
  
        })
        .catch(err => {
          console.log(err)
        })
      })
      .catch(err => {
        console.log(err)
      })

    //if round index is undefined, it's our first time here. Initialize!
    if(!roundIndex) {
      setRoundIndex(0)
      setUserSettings(userUtils.getSessionSettings())
      
    }
  }, [])

  // ##### Modal Functions

  const clickStartNow = (event) => {
    setShowRoundModal(false)
  }

  // ##### End Modal Functions


  //Until we're set up, don't go any further!
  while(!userSettings || (roundIndex === undefined) || !boxersArray || !combosArray || !actionsArray) {
    return (
    <div className="">
      <Loading loadMessage="Loading workout..." />
    </div>
    )
  }

  //show the round modal at the start of each round
  if (showRoundModal) {
    
    const randomCombo = getRandom(workout[roundIndex].combos)

    return (
      <div className="">
        <RoundModal 
          boxersArray={boxersArray} 
          combosArray={combosArray} 
          actionsArray={actionsArray}
          featuredCombo={combosArray.find(item => item.id === randomCombo)} 
          clickStartNow={clickStartNow} 
          showRoundModal={showRoundModal} 
          round= {workout[roundIndex]} 
          roundIndex={roundIndex} breakTime={30} />
      </div>
    )
  }

  return (
    <div>
      Hello this is new pad box speaking, we hold the power of the workout.
    </div>
  )
}