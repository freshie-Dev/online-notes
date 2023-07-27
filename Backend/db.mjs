import mongoose from "mongoose";

const mongoURI = "mongodb://127.0.0.1:27017/iNoteBook-2"; // Add your MongoDB URI here

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

export default connectToMongo;