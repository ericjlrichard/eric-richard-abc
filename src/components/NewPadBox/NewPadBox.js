import { useState, useEffect } from "react"
import userUtils from "../../js/user-utils"
import Loading from "../Loading/Loading"

import RoundModal from "../RoundModal/RoundModal"

import { getRandom } from "../../js/math-utils"

import axios from "axios";

import Pad from "../Pad/Pad"
import ActionSlider from "../ActionSlider/ActionSlider"

import { setPadAnimWithReset } from "../../js/time-anim-utils"
import { setBellTimer, setSoundTimer } from "../../js/sound-utils"

import {determinePad } from "../../js/combo-utils"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"

export default function NewPadBox({workout}) {
  const [showRoundModal, setShowRoundModal] = useState(true)
  const [roundIndex, setRoundIndex] = useState(undefined)
  const [userSettings, setUserSettings] = useState(undefined)
  const [boxersArray, setBoxersArray] = useState(undefined)
  const [combosArray, setCombosArray] = useState(undefined)
  const [actionsArray, setActionsArray] = useState(undefined)
  const [soundTimeouts, setSoundTimeouts] = useState([])

  const [padState1, setPadState1] = useState ("fadein")
  const [padState2, setPadState2] = useState ("fadein")
  const [padState3, setPadState3] = useState ("fadein")
  const [padState4, setPadState4] = useState ("fadein")
  const [padState5, setPadState5] = useState ("fadein")
  const [padState6, setPadState6] = useState ("fadein")
  const [padState7, setPadState7] = useState ("fadein")
  const [padState8, setPadState8] = useState ("fadein")
  const [padState9, setPadState9] = useState ("fadein")
  const [padState10, setPadState10] = useState ("fadein")
  const [padState11, setPadState11] = useState ("fadein")
  const [padState12, setPadState12] = useState ("fadein")

  const [padStatesFunc, setPadStatesFunc] = useState([setPadState1, setPadState2, setPadState3, setPadState4, setPadState5, setPadState6, setPadState7, setPadState8, setPadState9, setPadState10, setPadState11, setPadState12])

  //onLoad
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

  //onUnLoad
  //onUnLoad
  useEffect(() => () => {

  //clears out the sounds
  if(soundTimeouts) {
    soundTimeouts.forEach(sound => {
      clearTimeout(sound)
    })
    setSoundTimeouts([])
  }

}, [])

  // ##### Modal Functions

  //on Round Start
  const clickStartNow = (event) => {
    setShowRoundModal(false)

    console.log("start now", workout[roundIndex])

    let time = 0;
    let comboIndex=0;
    let comboObj= {}
    console.log("start now", combosArray)

    setBellTimer(time, 1);

    workout[roundIndex].round.forEach(action => {
      if(action === ".") {
        //wait!
      } else if (action === "!") {
        //combo switch
        setTimeout(() => {
          comboObj = 
          console.log("next combo: ", comboIndex, combosArray.find(item => item.id === workout[roundIndex].combos[comboIndex]))
          comboIndex++;
        }, time)
        
        
      } else {
        const padNumber = determinePad(action)

        //if padNumber is indeed a number, it means it's an offensive action. Set the pad anim.
        if(!isNaN(padNumber)) {
          setPadAnimWithReset(padStatesFunc[Number(padNumber - 1)], "hit", time, "rest")

          if(userSettings.sounds) {
            soundTimeouts.push(setSoundTimer(time, padNumber))
          }

        } else {
          //eventual defensive anims here
        }
      }

      //in any case, the beat goes on.
      time += 250
    })

    setBellTimer(time, 3);

    setTimeout(() => {
      if ((roundIndex + 1) === workout.length) {
        //End Workout
      } else {
        setRoundIndex(roundIndex+1)
        setShowRoundModal(true)
      }
      
    }, time)
    // setPadAnimWithReset(padStatesFunc[0], "hit", 1000, "rest")

    // setPadAnimWithReset(padStatesFunc[6], "hit", 5000, "rest")
    // setSoundTimer(1000, 1)
  }

  // ##### End Modal Functions


  //Until we're set up, don't go any further
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
    
      <div className="pad-box">
      <Pad userSettings={userSettings} orientation="vertical" number="1" padState={padState1} />
      <Pad userSettings={userSettings} orientation="vertical" number="2" padState={padState2}/>
      <Pad userSettings={userSettings} orientation="horizontal" number="3" padState={padState3}/>
      <Pad userSettings={userSettings} orientation="horizontal" number="4" padState={padState4}/>
      <Pad userSettings={userSettings} orientation="vertical" number="5" padState={padState5}/>
      <Pad userSettings={userSettings} orientation="vertical" number="6" padState={padState6}/>

      <ActionSlider round={workout[roundIndex]} userSettings={userSettings} />

      <Pad userSettings={userSettings} orientation="vertical" number="7" padState={padState7}/>
      <Pad userSettings={userSettings} orientation="vertical" number="8" padState={padState8}/>
      <Pad userSettings={userSettings} orientation="horizontal" number="9" padState={padState9}/>
      <Pad userSettings={userSettings} orientation="horizontal" number="10" padState={padState10}/>
      <Pad userSettings={userSettings} orientation="vertical" number="11" padState={padState11}/>
      <Pad userSettings={userSettings} orientation="vertical" number="12" padState={padState12}/>

    </div>
    
  )
}