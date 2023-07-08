import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebaseConfig"

import "../../styles/SignIn.css"

const SignUp = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        navigate("/accountcreated")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        // ..
      })
  }

  return (
    <main>
      <section>
        <div>
          <div>
            <h1 className="signin-header">To Do List!</h1>

            <form className="signin-form">
              <div>
                <label htmlFor="email-address">Email address</label>
                <br />
                <input
                  type="email"
                  label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="password"
                  label="Create password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>

              <button className="signin-btn" type="submit" onClick={onSubmit}>
                Sign up
              </button>
            </form>

            <p className="account-text">
              Already have an account?{" "}
              <NavLink className="link-text" to="/">
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default SignUp
