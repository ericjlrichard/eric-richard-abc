import PadBox from "../../components/PadBox/PadBox"

import "./Train.scss"

import { useEffect, useState } from "react";
import axios from "axios";

export default function Train() {
  const [actionsArray, setActionsArray] = useState(undefined)
  const [combosArray, setCombosArray] = useState(undefined)

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

  }, [])

  let userSettings = {};

  if(!sessionStorage.getItem("abc_stance")) {
    sessionStorage.setItem("abc_stance", userSettings.stance)
  } else {
    userSettings.stance = sessionStorage.getItem("abc_stance")
  }

  userSettings.stance = "orthodox";

  return !!actionsArray && !!combosArray && (
    <div className="train-page">

      <div className="pads-container">
        <PadBox combosArray={combosArray} actionsArray={actionsArray} userSettings={userSettings} />
      </div>

    </div>
    
  )
}