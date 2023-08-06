import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import '../login.css'
import icon from '../extras/icon.png'

import noteContext from "../context/notes/noteContext";
// import styles
import '../login.css'

export default function Signup() {

  const context = useContext(noteContext);
    const { setAlert } = context;
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  })
  const { name, email, password, passwordConfirm } = credentials;

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    console.log(e.target.id, e.target.value)
  }

  const onSubmit = async (e) => {
    console.log(credentials)
    e.preventDefault();
    
    if (password !== passwordConfirm) {
      alert("Passwords do not match");
    } else {
      const response = await fetch("http://127.0.0.1:4000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password})
      })
      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken)
        navigate("/")
        setAlert("signup");
      } else {
        setAlert("signup-fail");
        // <Alert message="invalid credentials" />
      }
    }
  }

  return (
    <div className='signUpDiv'>
      <main className="form-signin w-100 m-auto text-center">
        <form onSubmit={onSubmit}>
          <img className="mb-4" src={icon} alt="icon" width="125" height="125" />
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input onChange={handleChange} value={name}  name='name'type="text" className="form-control" id="name" placeholder="name" />
            <label htmlFor="name">Name</label>
          </div>

          <div className="form-floating">
            <input onChange={handleChange} value={email} name='email' type="email" className="form-control" id="email" placeholder="name@example.com" />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating">
            <input onChange={handleChange} required minLength={8} name='password' value={password} type="text" className="form-control" id="password" placeholder="Password" />
            <label htmlFor="password">Password</label>
          </div>

          <div className="form-floating">
            <input onChange={handleChange} name='passwordConfirm' required minLength={8} value={passwordConfirm} type="text" className="form-control" id="passwordConfirm" placeholder="Confirm password" />
            <label htmlFor="password">Confirm Password</label>
          </div>

          <button className="btn btn-dark w-100 py-2 my-3" type="submit">Sign up</button>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
        </form>
      </main>
    </div>
  )
}
