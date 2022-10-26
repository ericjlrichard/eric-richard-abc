import "../../styles/partials/_colors.scss"

//import axios from "axios";
import { useState, useEffect} from "react";

export default function Main()  {
  const [test, setTest] = useState(undefined)

  useEffect(() => {
    //onLoad()

  }, [])
  return !!test && (
    <div>
      
      {test.map(item => (
        <div>{item.combo_string}</div>
      ))}

    </div>
  )
}