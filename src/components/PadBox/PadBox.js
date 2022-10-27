import "./PadBox.scss"

import Pad from "../Pad/Pad"

export default function PadBox() {


  return (
    <div className="pad-box">
      <Pad orientation="vertical" number="1" />
      <Pad orientation="vertical" number="2" />
      <Pad orientation="horizontal" number="3" />
      <Pad orientation="horizontal" number="4" />
      <Pad orientation="vertical" number="5" />
      <Pad orientation="vertical" number="6" />

      <Pad orientation="vertical" number="7" />
      <Pad orientation="vertical" number="8" />
      <Pad orientation="horizontal" number="9" />
      <Pad orientation="horizontal" number="10" />
      <Pad orientation="vertical" number="11" />
      <Pad orientation="vertical" number="12" />
    </div>
  )
}