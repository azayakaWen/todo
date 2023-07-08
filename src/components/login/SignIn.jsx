import React, { useState, useContext } from "react"
import UserContext from "../../context/UserContext"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../config/firebaseConfig"
import { NavLink, useNavigate } from "react-router-dom"

import "../../styles/SignIn.css"

const SignIn = () => {
  const { setUid } = useContext(UserContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        setUid(user.uid)
        navigate("/home")
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <>
      <main>
        <section>
          <div>
            <h1 className="signin-header">To Do List!</h1>

            <form className="signin-form">
              <div>
                <label htmlFor="email-address">Email address</label>
                <br />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <br />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button className="signin-btn" onClick={onLogin}>
                  Login
                </button>
              </div>
            </form>

            <p>
              <NavLink className="link-text" to="/resetpassword">
                Forgotten password?
              </NavLink>
            </p>

            <p className="account-text">
              No account yet?{" "}
              <NavLink className="link-text" to="/signup">
                Sign up
              </NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  )
}

export default SignIn
