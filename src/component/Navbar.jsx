import React from "react"
import { Link } from "react-router-dom"
import "../style/Navbar.css"
import { VscChecklist } from "react-icons/vsc"

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <div className="logo">
          To Do List! <VscChecklist className="logo-icon" />
        </div>
      </Link>

      <ul className="list-container">
        <li>
          <Link to="/">To do</Link>
        </li>
        <li>
          <Link to="/done">Done!</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
