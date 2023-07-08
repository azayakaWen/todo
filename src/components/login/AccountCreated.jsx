import React from "react"
import { NavLink } from "react-router-dom"

const AccountCreated = () => {
  return (
    <div>
      <h1>Your account have been created</h1>
      <NavLink to="/">Sign in</NavLink>
    </div>
  )
}

export default AccountCreated
