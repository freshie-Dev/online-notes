import express from "express"
const notesRouter = express.Router();

notesRouter.get("/", (req, res) => {
    const obj = {
        name: "Ahmad notes",
        email: "ahmad@ahmad.comnotes"
    }
    res.json(obj)
})

export default notesRouter;