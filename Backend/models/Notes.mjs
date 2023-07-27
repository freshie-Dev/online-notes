import mongoose from "mongoose";

const {Schema} = mongoose;

const notesSchema = new Schema ({
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
        default: Default.now
    }
})

const Note = mongoose.model("Note", notesSchema)

// export default mongoose.model('note', notesSchema);
