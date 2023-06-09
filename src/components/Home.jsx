import React, { useState, useEffect, useContext } from "react"
import UserContext from "../context/UserContext.js"
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "../config/firebaseConfig"
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai"
import { BsTrash } from "react-icons/bs"

import "../styles/ToDoList.css"

const Home = () => {
  const { uid } = useContext(UserContext)
  const [inputText, setInputText] = useState("")
  const [toDo, setToDo] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const dateRef = collection(db, "todo", uid, "list")
      const dateSnap = await getDocs(dateRef)

      const fetchedData = []
      dateSnap.forEach((doc) => {
        fetchedData.push({ id: doc.id, data: doc.data() })
      })

      setToDo(fetchedData)
    }

    fetchData()
  }, []) //eslint-disable-line

  const handleAdd = async () => {
    const newToDo = { todo: inputText, done: false }

    try {
      const docRef = await addDoc(collection(db, "todo", uid, "list"), newToDo)
      setToDo((prev) => prev.concat({ id: docRef.id, data: newToDo }))
    } catch (e) {
      console.error("Error adding document: ", e)
    }

    setInputText("")
  }

  const handleCheck = async (id) => {
    const todoRef = doc(db, "todo", uid, "list", id)
    await updateDoc(todoRef, { done: true })
    setToDo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, data: { ...item.data, done: true } } : item
      )
    )
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "todo", uid, "list", id))

      setToDo((prev) => prev.filter((item) => item.id !== id))
    } catch (e) {
      console.error("Error deleting document: ", e)
    }
  }

  return (
    <div className="to-do-list">
      <div>
        <h1>Add what needs to be done</h1>

        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <AiOutlinePlus className="add-icon" onClick={handleAdd} />
        </div>
      </div>

      <div className="list">
        <ul>
          {toDo.map((item, index) => (
            <li key={index}>
              {item.data.done === false ? (
                <>
                  {/* eslint-disable-next-line */}
                  <a href="#">
                    <h2>{item.data.todo}</h2>

                    <div className="button-container">
                      <AiOutlineCheck
                        className="check-icon"
                        onClick={() => handleCheck(item.id)}
                      />
                      <BsTrash
                        className="trash-icon"
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </a>
                </>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
