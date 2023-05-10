import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  // apiKey: "AIzaSyBHFpyIAKpkOBibhOKrKoFi4uqaq-ZwCSw",
  // authDomain: "to-do-a808a.firebaseapp.com",
  // projectId: "to-do-a808a",
  // storageBucket: "to-do-a808a.appspot.com",
  // messagingSenderId: "201531704001",
  // appId: "1:201531704001:web:8c3f7092dfbede0922ca40",
  // measurementId: "G-VR74ZSC70V",
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASURMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }
