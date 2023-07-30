import express from "express";
import { body, validationResult } from "express-validator";

import fetchUser from "../middleware/fetchUser.mjs";
const notesRouter = express.Router();
import Note from "../models/Notes.mjs";

// Route:1 Fetch all notes using a GET request at "../api/notes/fetchallnotes".
notesRouter.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId });
    console.log(req.userId);
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
});

// Route:2 Create a note using a POST request at "../api/notes/addnote".
notesRouter.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Title must be atleast 3 characters").isLength({ min: 3 }),
    body("description", "Title must be atleast 3 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const { title, description, tag, user } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    try {
      let note = await Note.create({
        title,
        description,
        tag,
        user: req.userId,
      });

      res.json(note);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "internal server error" });
    }
  }
);

// Route:3 Update a note using a PUT request at "../api/notes/updatenote".
notesRouter.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Creating new note object

  // Updating the existing note
  // const note = Note.findByIdAndUpdate(req.userId)
  try {
    let newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    let note = await Note.findById({ _id: req.params.id });

    if (!note) {
      return res.status(404).send("Not Found!");
    }

    if (note.user.toString() !== req.userId) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.updateOne({ _id: req.params.id }, newNote);

    // note = await Note.findByIdAndUpdate(
    //   req.params.id,
    //   { $set: newNote },
    //   { new: true }
    // );

    res.send({ newNote });
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error")
  }
});

// Route:4 Delete a note using a DELETE request at "../api/notes/deletenote".
notesRouter.delete("/deletenote/:id", async (req, res) => {
  // Find the note to be deleted
  try {
    let note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).send("Note Found!");
  }

  note = await Note.findByIdAndDelete(req.params.id);
  res.json({ success: "Notes has been deleted", deletedNote: note });
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error")
  }
});

export default notesRouter;
