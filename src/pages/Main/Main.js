import "../../styles/partials/_colors.scss"

//import axios from "axios";
import { useState, useEffect} from "react";

export default function Main()  {
  const [test, setTest] = useState(undefined)

  useEffect(() => {
    //onLoad()

  }, [])

  //TD
  if (!test) {
    return ( <div>Main Loading!</div>)
  }

  return !!test && (
    <div>
      
      {test.map(item => (
        <div>{item.combo_string}</div>
      ))}

    </div>
  )
}