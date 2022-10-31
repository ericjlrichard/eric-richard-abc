import { useEffect } from "react";
import "./Pad.scss";

export default function Pad({number, orientation, padState}) {

  return (

    <div id={`pad${number}`} className={`pad pad--${orientation} pad${number} pad--${padState}`}>{number}</div>
  )
}