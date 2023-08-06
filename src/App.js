import './App.css';
import React, { useContext, useEffect } from 'react';
import noteContext from "./context/notes/noteContext";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import { Alert } from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const context = useContext(noteContext);
  const { alert, setAlert, showAlert } = context;

  useEffect(() => {
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }, [alert])


  return (
    <>
      <Router>
        <Navbar />

        {alert === "deleteNote" ? <Alert message="Note Deleted Successfully" type="warning" /> :
          alert === "editNote" ? <Alert message="Note Edited Successfully" type="success" /> :
            alert === "addNote" ? <Alert message="Note Added Successfully" type="success" /> :
              alert === "login" ? <Alert message="Logged In Successfully" type="success" /> :
                alert === "signUp" ? <Alert message="Signed Up Successfully" type="success" /> :
                  alert === "signup-fail" ? <Alert message="Invalid Credentials" type="danger" /> :
                    alert === "login-fail" ? <Alert message="Invalid Credentials" type="danger" /> : null}


        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
