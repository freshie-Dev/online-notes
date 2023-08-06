import { Alert } from "bootstrap";
import NoteContext from "./noteContext";
import { useState } from "react";

// const { v4: uuidv4 } = require('uuid');

const NoteState = (props) => {

  const host = "http://127.0.0.1:4000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  const showAlert = (message, type) => {
    <Alert type={type} message={message} />
  }

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    console.log(note)
  
    setNotes(notes.concat(note))
    console.log("Adding a new note with id: " + note._id, note.title )

    setAlert("addNote");
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    console.log(json)

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)

    setAlert("deleteNote");
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json)

     let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
    setAlert("editNote");

  }
  const [alert, setAlert] = useState(null)

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, alert, setAlert, showAlert }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;