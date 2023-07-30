import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function About() {
  const a = useContext(NoteContext);
  return (
    <>
      <div>This is about {a.state.name}</div>
      <h1>he studies in {a.state.class}</h1>
      <button
        onClick={() => {
          a.update();
          a.setIsTrue((prevValue)=> {
            return !prevValue
          });
          console.log(a.isTrue)
        }}
      >
        click
      </button>
    </>
  );
}
