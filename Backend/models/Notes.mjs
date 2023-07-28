import mongoose from "mongoose";

const {Schema} = mongoose;

const notesSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        tag: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Note = mongoose.model("Note", notesSchema)

export default Note;
