import express from "express"
const app = express();
app.use(express.json())
const port = 4000;
import connectToMongo from "./db.mjs";
connectToMongo();

import authRouter from "./Routes/auth.mjs";
import notesRouter from "./Routes/notes.mjs";

// Available Routes
app.get("/", (req, res) => {
    res.send("hello")
})
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter)
  
  app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })