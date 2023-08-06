import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import '../login.css'
import icon from '../extras/icon.png'
import noteContext from "../context/notes/noteContext";
// import { Alert } from "./Alert.js"

export default function Login() {
    const context = useContext(noteContext);
    const { setAlert } = context;

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })
    const [registered, setRegistered] = useState(false)

    let navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch("http://127.0.0.1:4000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })
            const json = await response.json();
            if (json.success) {
                setAlert("login");
                localStorage.setItem("token", json.authtoken)
                console.log(json.authtoken)
                navigate("/")
            } else {
                setAlert("login-fail");
                // <Alert message="invalid credentials" />
            }

        } catch (error) {
            console.log(error)
        }


    }
    return (
        <div className='signUpDiv'>

            <main className="form-signin w-100 m-auto text-center ">
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={icon} alt="icon" width="125" height="125" />
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input onChange={handleChange} value={credentials.email} type="email" className="form-control" id="email" placeholder="name@example.com" />
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input onChange={handleChange} required minLength={8} value={credentials.password} type="text" className="form-control" id="password" placeholder="Password" />
                        <label htmlFor="password">Password</label>
                    </div>

                    <button className="btn btn-dark w-100 py-2 my-3" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
                </form>
            </main>
        </div>
    )
}