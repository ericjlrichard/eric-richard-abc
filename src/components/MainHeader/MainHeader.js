
import "./MainHeader.scss"
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import hamburgerIcon from "../../assets/icons/hamburger-menu.png"
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

import TestSuite from "../TestSuite/TestSuite"

export default function MainHeader() {
  const [showHamburger, setShowHamburger] = useState(false);

  const handleClickHamburger= (event) => {
    setShowHamburger(!showHamburger)
  }

  return (
    
    <header className="header_menu">

      
      {/*
      Commenting out Test Suite for submission
      
       <TestSuite /> */}
      <HamburgerMenu setShowHamburger={setShowHamburger} handleClickHamburger={handleClickHamburger} showHamburger={showHamburger} />
      <nav className="header_menu__nav">

        <Link to="/main"><div className="header_menu__logo"><img className="header_menu__logo-img" src={require("../../assets/logos/abc_logo.png")} alt="ABC Logo"></img></div></Link>
        <div className="header_menu__bar">
          <NavLink to="/new-train"><div className="header_menu__link">Train</div></NavLink>
          <NavLink to="/account"><div className="header_menu__link">Account</div></NavLink>
        </div>
        <img className="header_menu__hamburger-icon" alt="Top Right Menu" src={hamburgerIcon} onClick={handleClickHamburger}/>
      </nav>
      
    </header>
  )
}