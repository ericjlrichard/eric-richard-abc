import { useState, useEffect } from "react"
import userUtils from "../../js/user-utils"
import Loading from "../Loading/Loading"

import RoundModal from "../RoundModal/RoundModal"

export default function NewPadBox({workout}) {
  const [showRoundModal, setShowRoundModal] = useState(true)
  const [roundIndex, setRoundIndex] = useState(undefined)
  const [userSettings, setUserSettings] = useState(undefined)

  useEffect(() => {

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
  while(!userSettings || (roundIndex === undefined)) {
    console.log(userSettings, roundIndex)
    return (
    <div className="">
      <Loading loadMessage="Loading workout..." />
    </div>
    )
  }

  //show the round modal at the start of the workout
  if (showRoundModal) {
    return (
      <div className="">
        <RoundModal clickStartNow={clickStartNow} showRoundModal={showRoundModal} roundIndex={roundIndex} breakTime={30} />
      </div>
    )
  }

  return (
    <div>
      Hello this is new pad box speaking, we hold the power of the workout.
    </div>
  )
}