import React, { useState } from "react";

import NoteContext from "./NoteContext";

const NoteState = (props)=> {

    const [state, setState] = useState({
        "name": "harry",
        "class": "5A"
    })

    const [isTrue, setIsTrue] = useState(true)

    const update = ()=> {
        isTrue? setState({name: "Harry", class: "5B"}) : setState({name: "Ahmad", class: "5A"})
    }

    const initialNotes = [
        {
          "_id": "64c292a4d94a92054596eca8",
          "user": "64c27a6026c4688961e9b709",
          "title": "UPDATEDasd",
          "description": "UPDATED",
          "tag": "NEW TAG",
          "date": "2023-07-27T15:52:04.037Z",
          "__v": 0
        },
        {
          "_id": "64c502467f69862ac83822b3",
          "user": "64c27a6026c4688961e9b709",
          "title": "this is my title",
          "description": "this is my description",
          "tag": "General",
          "date": "2023-07-29T12:12:54.246Z",
          "__v": 0
        },
        {
          "_id": "64c502487f69862ac83822b5",
          "user": "64c27a6026c4688961e9b709",
          "title": "this is my title",
          "description": "this is my description",
          "tag": "General",
          "date": "2023-07-29T12:12:56.030Z",
          "__v": 0
        },
        {
          "_id": "64c502507f69862ac83822b7",
          "user": "64c27a6026c4688961e9b709",
          "title": "this is my title",
          "description": "this is my description",
          "tag": "General",
          "date": "2023-07-29T12:13:04.496Z",
          "__v": 0
        },
        {
          "_id": "64c502507f69862ac83822b7",
          "user": "64c27a6026c4688961e9b709",
          "title": "this is my title",
          "description": "this is my description",
          "tag": "General",
          "date": "2023-07-29T12:13:04.496Z",
          "__v": 0
        },
        {
          "_id": "64c502507f69862ac83822b7",
          "user": "64c27a6026c4688961e9b709",
          "title": "this is my title",
          "description": "this is my description",
          "tag": "General",
          "date": "2023-07-29T12:13:04.496Z",
          "__v": 0
        },
        {
          "_id": "64c502507f69862ac83822b7",
          "user": "64c27a6026c4688961e9b709",
          "title": "this is my title",
          "description": "this is my description",
          "tag": "General",
          "date": "2023-07-29T12:13:04.496Z",
          "__v": 0
        },
        {
          "_id": "64c502507f69862ac83822b7",
          "user": "64c27a6026c4688961e9b709",
          "title": "this is my title",
          "description": "this is my description",
          "tag": "General",
          "date": "2023-07-29T12:13:04.496Z",
          "__v": 0
        },
        {
          "_id": "64c502507f69862ac83822b7",
          "user": "64c27a6026c4688961e9b709",
          "title": "this is my title",
          "description": "this is my description",
          "tag": "General",
          "date": "2023-07-29T12:13:04.496Z",
          "__v": 0
        },
        {
          "_id": "64c502507f69862ac83822b7",
          "user": "64c27a6026c4688961e9b709",
          "title": "this is my title",
          "description": "this is my description",
          "tag": "General",
          "date": "2023-07-29T12:13:04.496Z",
          "__v": 0
        },
        {
          "_id": "64c502507f69862ac83822b7",
          "user": "64c27a6026c4688961e9b709",
          "title": "this is my title",
          "description": "this is my description",
          "tag": "General",
          "date": "2023-07-29T12:13:04.496Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(initialNotes)

    return(
        <NoteContext.Provider value = {{state, isTrue, setIsTrue, update, notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;