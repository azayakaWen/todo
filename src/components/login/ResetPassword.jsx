import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"

import "../../styles/ResetPassword.css"

const ResetPassword = () => {
  const [email, setEmail] = useState("") //eslint-disable-line
  const auth = getAuth()

  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email)
    console.log("Password reset email sent")
  }

  return (
    <div>
      <h1 className="reset-header">Reset password</h1>

      <div>
        <label className="reset-lable">Email</label> <br />
        <input
          className="resetEmailInput"
          placeholder="Email"
          type="email"
          required
        />
        <br />
        <button className="reset-btn" type="button" onClick={triggerResetEmail}>
          Reset password
        </button>
        <p className="account-text">
          <NavLink className="link-text" to="/">
            Back
          </NavLink>{" "}
          to login
        </p>
      </div>
    </div>
  )
}

export default ResetPassword
