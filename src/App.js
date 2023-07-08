import React, { useState } from "react"

import { BrowserRouter as Router } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import UserContext from "./context/UserContext"

import SignIn from "./components/login/SignIn"
import SignUp from "./components/login/SignUp"
import Home from "./components/Home"
import AccountCreated from "./components/login/AccountCreated"
import ResetPassword from "./components/login/ResetPassword"
import Navbar from "./components/Navbar"
import Done from "./components/Done"

import "./App.css"

function App() {
  const [uid, setUid] = useState(null)
  return (
    <Router>
      <UserContext.Provider value={{ uid, setUid }}>
        <header>{uid === null ? null : <Navbar />}</header>
        <div className="App">
          <section>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<SignIn />} />
              <Route path="/home" element={<Home />} />
              <Route path="/accountcreated" element={<AccountCreated />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/done" element={<Done />} />
            </Routes>
          </section>
        </div>
      </UserContext.Provider>
    </Router>
  )
}

export default App
