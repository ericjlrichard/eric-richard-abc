import PadBox from "../../components/PadBox/PadBox"

import "./Train.scss"

export default function Train() {
  // let userSettings = {
  //   stance: "orthodox"
  // };

  let userSettings = {};

  // sessionStorage.setItem("abc_stance", userSettings.stance)
  // console.log("session storage", sessionStorage.getItem("abc_stance"))

  if(!sessionStorage.getItem("abc_stance")) {
    sessionStorage.setItem("abc_stance", userSettings.stance)
  } else {
    userSettings.stance = sessionStorage.getItem("abc_stance")
  }

  userSettings.stance = "southpaw"

  return (
    <div className="train-page">
      <h1>Training Page</h1>

      <div className="pads-container">
        <PadBox userSettings={userSettings} />
      </div>
      

    </div>
    
  )
}