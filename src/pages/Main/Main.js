
import "./Main.scss"

//import axios from "axios";
import { useState, useEffect} from "react";

import { Link } from "react-router-dom";
import About from "../About/About";

export default function Main()  {
  const [test, setTest] = useState(undefined)

  useEffect(() => {
    //onLoad()
    setTest(true)
  }, [])

  //TD
  if (!test) {
    return ( <div>Main Loading!</div>)
  }

  return !!test && (
    <Link to="/train">
      <div className="main">
        
        <div className="main__hero">
        </div>
        <div className="main__prompt">
          Train Now!
        </div>
      </div>
      <About />
    </Link>
  )
}