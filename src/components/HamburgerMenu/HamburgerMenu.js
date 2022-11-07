import "./HamburgerMenu.scss"
import { Link, NavLink } from "react-router-dom";




export default function HamburgerMenu({showHamburger, setShowHamburger, handleHamburgerClick}) {

  if (!showHamburger) {
    return null;
  }

  //not my fave thing, but passing handleHamburgerClick didn't seem to work.
  const handleOnClick = (event) => {
    setShowHamburger(false);
  }

  return (
    <div className="hamburger__menu">
      <NavLink className="hamburger__link" to="/" onClick={handleOnClick}>Home</NavLink>
      <NavLink className="hamburger__link" to="/train" onClick={handleOnClick}>Train</NavLink>
      <div className="hamburger__divider"></div>
      <NavLink className="hamburger__link" to="/account" onClick={handleOnClick}>Account</NavLink>
    </div>
  )
}