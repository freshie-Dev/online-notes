import express from "express";
const authRouter = express.Router();
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";

// Importing User model
import User from "../models/User.mjs";







// Route:1 Create a user using a POST request at "../api/auth".
authRouter.post(
  "/",
  [
    body("name", "Name should be atlease 3 characters").isLength({ min: 3 }),
    body("email", " This email is not valid").isEmail(),
    body(
      "password",
      "Password must contain atleast 1 uppercase and 1 lowercase letter, a symbol and a number and length >=8"
    ).matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
  ],
  async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);

    // Encypting plain password using bcrypt package
    const encryptedPass = await bcrypt.hash(password, 10);

    // If there are validation errors, return the errors to the client
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      // const user = new User(req.body);
      const user = await User.create({
        name: name,
        email: email,
        password: encryptedPass,
      })
      res.json(user)

      // await user.save();
      // res.send(req.body);
    } catch (error) {
      // Checks uniqueness of Email using (unique = true) property in User Model
      if (error.code === 11000) {
        // If the error is due to duplicate email, handle it here
        console.log(error.message, error.keyPattern.email);
        return res.status(400).json({ error: "Email already exists", message: error.message  });
      } else {
        // For other errors, return a generic error message
        console.error(error);
        res.status(500).json({ error: "Something went wrong", message: error.message });
      }
    }
  }
);

export default authRouter;
