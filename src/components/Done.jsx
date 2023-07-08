/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react"
import UserContext from "../context/UserContext"
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"
import { db } from "../config/firebaseConfig"
import { BsTrash } from "react-icons/bs"
import { AiOutlineUndo } from "react-icons/ai"

import "../styles/ToDoList.css"

const Done = () => {
  const { uid } = useContext(UserContext)
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

  const handleUnCheck = async (id) => {
    const todoRef = doc(db, "todo", uid, "list", id)
    await updateDoc(todoRef, { done: false })
    setToDo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, data: { ...item.data, done: false } } : item
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
      <h1>Done!</h1>

      <div className="list">
        <ul>
          {toDo.map((item, index) => (
            <li key={index}>
              {item.data.done === true ? (
                <a href="#">
                  <h2 className="header-done">{item.data.todo}</h2>

                  <div className="button-container">
                    <AiOutlineUndo
                      className="undo-icon"
                      onClick={() => handleUnCheck(item.id)}
                    />
                    <BsTrash
                      className="trash-icon"
                      onClick={() => handleDelete(item.id)}
                    />
                  </div>
                </a>
              ) : // <li>
              //   {item.data.todo}
              //   <RxCross2 onClick={() => handleUnCheck(item.id)} />

              //   <BsTrash onClick={() => handleDelete(item.id)} />
              // </li>
              null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Done
