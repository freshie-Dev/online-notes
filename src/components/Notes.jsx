import React, {useContext} from "react";
import NoteContext from "../context/notes/NoteContext";

import NoteItem from "./NoteItem";

export default function Notes() {
    
  const context = useContext(NoteContext);
  let { notes, setNotes } = context;
  return (
    <div className="my-3 row">
      <h3>Your Notes</h3>
      {notes.map((note, index) => {
        return (
            <NoteItem note = {note} key = {index}/>
        );
      })}
    </div>
  );
}
