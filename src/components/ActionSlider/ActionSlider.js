import "./ActionSlider.scss"

import { useEffect, useState } from "react";

import { setActionAnimWithReset } from "../../js/time-anim-utils";

import BoxAction from "../BoxAction/BoxAction"

export default function ActionSlider() {
  const [l1, setL1] = useState({action: "", anim: "rest"})
  const [l2, setL2] = useState({action: "", anim: "rest"})
  const [l3, setL3] = useState({action: "", anim: "rest"})

  const [r1, setR1] = useState({action: "", anim: "rest"})
  const [r2, setR2] = useState({action: "", anim: "rest"})
  const [r3, setR3] = useState({action: "", anim: "rest"})

  useEffect(() => {
    
    setActionAnimWithReset(setL1, "2", "slide-right", 5000, "rest", 6000);

    setActionAnimWithReset(setR1, "3", "slide-left", 5500, "rest", 6500);
  
    setActionAnimWithReset(setL2, "4", "slide-right", 6000, "rest", 7000)

    setActionAnimWithReset(setL3, "6", "slide-right", 8000, "rest", 9000)

    setActionAnimWithReset(setL1, "12", "slide-right", 9000, "rest", 10000)
  }, [])
  

  return (
    <div className="slider">
      <BoxAction  side="left" state={l1}/>
      <BoxAction  side="left" state={l2}/>
      <BoxAction  side="left" state={l3} />

      <BoxAction action="R1" side="right" state={r1}/>
      <BoxAction action="R2" side="right" state={r2}/>
      <BoxAction action="R3" side="right" state={r3} />
    </div>
  )
}