import "./HamburgerMenu.scss"
import { Link, NavLink } from "react-router-dom";




export default function HamburgerMenu({showHamburger}) {

  if (!showHamburger) {
    return null;
  }

  return (
    <div className="hamburger__menu">
      <NavLink className="hamburger__link" to="/">Home</NavLink>
      <NavLink className="hamburger__link" to="/train">Train</NavLink>
      <div className="hamburger__divider">----</div>
      <NavLink className="hamburger__link" to="/account">Account</NavLink>
    </div>
  )
}