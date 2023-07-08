import React, { useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { VscChecklist } from "react-icons/vsc"
import UserContext from "../context/UserContext"
import { signOut } from "firebase/auth"
import { auth } from "../config/firebaseConfig"
import { useNavigate } from "react-router-dom"

import "../styles/Navbar.css"

const Navbar = () => {
  const location = useLocation()

  const hiddenRoutes = ["/login", "/register"]

  const shouldHideNavbar = hiddenRoutes.includes(location.pathname)

  const { setUid } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUid(null)
        navigate("/")
        console.log("Signed out successfully")
      })
      .catch((error) => {
        // An error happened.
      })
  }

  return (
    <>
      {shouldHideNavbar ? null : (
        <div className="navbar">
          <Link to="/">
            <div className="logo">
              To Do List! <VscChecklist className="logo-icon" />
            </div>
          </Link>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <ul className="list-container">
            <li>
              <Link to="/home">To do</Link>
            </li>
            <li>
              <Link to="/done">Done!</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}

export default Navbar
