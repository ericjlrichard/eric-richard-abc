
import "./MainHeader.scss"
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import hamburgerIcon from "../../assets/icons/hamburger-menu.png"
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

export default function MainHeader() {
  const [showHamburger, setShowHamburger] = useState(false);

  const handleClickHamburger= (event) => {
    setShowHamburger(!showHamburger)
  }

  return (
    <header className="header_menu">
      <HamburgerMenu showHamburger={showHamburger} />
      <nav className="header_menu__nav">

        <Link to="/main"><div className="header_menu__logo">Logo</div></Link>
        <div className="header_menu__bar">
          <NavLink to="/train"><div className="header_menu__link">Train</div></NavLink>
          <NavLink to="/account"><div className="header_menu__link">Account</div></NavLink>
        </div>
        <img className="header_menu__hamburger-icon" alt="Top Right Menu" src={hamburgerIcon} onClick={handleClickHamburger}/>
      </nav>
      
    </header>
  )
}