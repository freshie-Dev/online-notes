import express from "express";
const authRouter = express.Router();

import User from "../models/User.mjs";
import fetchUser from "../middleware/fetchUser.mjs";

import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "this is my jwt secret 1122";

// Route:1 Create a user using a POST request at "../api/auth".
authRouter.post(
  "/",
  [
    body("name", "Name should be atlease 3 characters").isLength({ min: 3 }),
    body("email", " This email is not valid").isEmail(),
    body(
      "password",
      "Password must contain atleast 1 uppercase and 1 lowercase letter, a symbol and a number and length >=8"
    ).matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;

    // Encypting plain password using bcrypt package
    const encryptedPass = await bcrypt.hash(password, 10);

    // If there are validation errors, return the errors to the client
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      // const user = new User(req.body);
      const user = await User.create({
        name: name,
        email: email,
        password: encryptedPass,
      });
      // "64c270926a92f7db4d441007"

      const userId = { user: { id: user._id } };

      // Generate a unique token for user who is created
      const authToken = jwt.sign(userId, JWT_SECRET);
      console.log("auth token: " + authToken);
      res.json({ authToken });

      // await user.save();
      // res.send(req.body);
    } catch (error) {
      // Checks uniqueness of Email using (unique = true) property in User Model
      if (error.code === 11000) {
        // If the error is due to duplicate email, handle it here
        console.log(error.message, error.keyPattern.email);
        return res
          .status(400)
          .json({ error: "Email already exists", message: error.message });
      } else {
        // For other errors, return a generic error message
        console.error(error);
        res
          .status(500)
          .json({ error: "Something went wrong", message: error.message });
      }
    }
  }
);

// Route:2 Login a user using a POST request at "../api/auth/login".
authRouter.post(
  "/login",
  [body("email", " This email is not valid").isEmail()],
  async (req, res) => {
    const {email, password} = req.body;

    // If there are validation errors, return the errors to the client
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({email})

      if(!user) {
        return res.status(400).json({error: "Incorrect credentials"})
      }

      const comparedPassword = await bcrypt.compare(password, user.password) //returns true/false

      if(!comparedPassword) {
        return res.status(400).json({error: "Incorrect credentials"})
      }
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRjMjc5NTc0NWYxY2U5MmFkMThlMzZiIn0sImlhdCI6MTY5MDQ2NjY4NH0.PRM5spF5bnVEaAbdklrz8xsP5BbHMr-5IZF6lP1PMbA"
      const data = {
        user:{
          id: user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET)

      res.json(authToken)
    } catch (error) {
      // For errors, return a generic error message
      console.error(error);
      res
        .status(500)
        .json({ error: "Something went wrong", message: error.message });
    }
  }
);

// Route:3 Get details of a user using a POST request at "../api/auth/getuser".
authRouter.post("/getuser",fetchUser ,async(req, res) => {

  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("name email");
    res.send(user)

  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

export default authRouter;
// 400 user input error, server will not process the request
