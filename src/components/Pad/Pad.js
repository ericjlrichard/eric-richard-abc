import { useEffect } from "react";
import "./Pad.scss";

export default function Pad({number, orientation, padState, userSettings}) {

  let orthodox = userSettings.stance === "orthodox" ? "--orthodox" : "";
  return (

    <div id={`pad${number}`} className={`pad pad--${orientation} pad${number + orthodox} pad--${padState}`}>{number}</div>
  )
}