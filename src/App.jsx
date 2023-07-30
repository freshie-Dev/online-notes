import React from 'react'
import {Routes, Route} from "react-router-dom"

import NoteState from './context/notes/NoteState'

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'



export default function App() {
  return (
    <>
      <NoteState>
        <Navbar/>
        <div className="container">
          
        <Routes>
            <Route exact path='/' element = {<Home/>}/>
            <Route exact path='/about' element = {<About/>}/>
        </Routes>
        
        </div>
        </NoteState>
    </>
  )
}


//    "both": "concurrently \"npm run start\" \"nodemon backend/index.js\""
