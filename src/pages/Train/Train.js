import PadBox from "../../components/PadBox/PadBox"

import "./Train.scss"

import { useEffect, useState } from "react";
import axios from "axios";

export default function Train() {
  const [actionsArray, setActionsArray] = useState(undefined)
  // let userSettings = {
  //   stance: "orthodox"
  // };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/actionswithtypes`)
    .then(res => {
      setActionsArray(res.data)

    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  let userSettings = {};

  // sessionStorage.setItem("abc_stance", userSettings.stance)
  // console.log("session storage", sessionStorage.getItem("abc_stance"))

  if(!sessionStorage.getItem("abc_stance")) {
    sessionStorage.setItem("abc_stance", userSettings.stance)
  } else {
    userSettings.stance = sessionStorage.getItem("abc_stance")
  }

  return !!actionsArray && (
    <div className="train-page">
      <h1>Training Page</h1>

      <div className="pads-container">
        <PadBox actionsArray={actionsArray} userSettings={userSettings} />
      </div>

    </div>
    
  )
}