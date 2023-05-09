import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

import Navbar from "./component/Navbar"
import ToDoList from "./component/ToDoList"
import Done from "./component/Done"

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Navbar />
        </header>

        <Routes>
          <Route path="/" element={<ToDoList />} />
          <Route path="/done" element={<Done />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
