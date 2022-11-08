
import "./Main.scss"

//import axios from "axios";
import { useState, useEffect} from "react";

import { Link } from "react-router-dom";
import About from "../About/About";

export default function Main()  {
  const [loadComplete, setLoadComplete] = useState(false)

  useEffect(() => {


    setLoadComplete(true)
  }, [])

  //TD
  if (!loadComplete) {
    return ( <div>Main Loading!</div>)
  }

  return !!loadComplete && (
    <>
      <Link to="/new-train">
        <div className="main">
          
          <div className="main__hero">
          </div>
          <div className="main__prompt">
            Train Now!
          </div>
        </div>
      </Link>
        
      <About />

    </>
    
  )
}