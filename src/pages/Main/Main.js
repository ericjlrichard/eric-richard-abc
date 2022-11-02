
import "./Main.scss"

//import axios from "axios";
import { useState, useEffect} from "react";

import { Link } from "react-router-dom";
import About from "../About/About";

export default function Main()  {
  const [loadComplete, setLoadComplete] = useState(false)
  //const [userSettings, setUserSettings] = useState(undefined)

  useEffect(() => {
    //onLoad()
    // const userSettingsObject = {};

    // if(!sessionStorage.getItem("abc_stance")) {
    //   sessionStorage.setItem("abc_stance", userSettingsObject.stance)
    // } else {
    //   userSettingsObject.stance = sessionStorage.getItem("abc_stance")
    // }
  
    // setUserSettings(userSettingsObject)

    // console.log(userSettingsObject.stance)


    //userSettings.stance = "orthodox";
    setLoadComplete(true)
  }, [])

  //TD
  if (!loadComplete) {
    return ( <div>Main Loading!</div>)
  }

  return !!loadComplete && (
    <>
      <Link to="/train">
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