import "./Pad.scss";

export default function Pad({number, orientation}) {

  return (

    <div className={`pad pad--${orientation} pad${number}`}>{number}</div>
  )
}