import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../backend";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor] = useState(""); 
  const Navigate = useNavigate();

  const obj = {
    email,
    password,
  };

  const isEmailValid = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    try {
      if (!email || !password) {
        setMessage("Please enter both email and password.");
      } else {
        localStorage.setItem("email", email);
        axios
          .post(`${url}/api/user/login`, obj)
          .then((res) => {
            console.log(res);
            const token = res.data.token;
            console.log(token);
            if (token) {
              localStorage.setItem("token", res.data.token);
              setMessage("Login successful!");
            }
            Navigate("/task")
          })
          .catch((error) => {
            console.error("Login failed:", error);
            setMessage("Login failed. Please check your email and password.");
          });
      }
    } catch (error) {}
  };

  const handleclick = () => {
    Navigate("/register");
  };

  const handlePasswordFocus = () => {
    if (!isEmailValid(email)) {
      setMessage("Email is not valid");
    } else {
      setMessage("");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <label htmlFor="">Email:</label>
      <br />
      <input className="input1"
        style={{ color: "black" }}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="">Password:</label>
      <br />
      <input className="2ndinput"
        style={{ color: "black" }}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onFocus={handlePasswordFocus}
      />
      <br />
      <div className="om">
        <button
          style={{ color: "green", fontSize: "16px" }}
          className="login"
          onClick={handleLogin}
        >
          Login
        </button>
        <button 
          onClick={handleclick}
          style={{ color: "black" }}
          className="register"
        >
          Register
        </button>
      </div>
      <p style={{ color: "red", fontSize: "15px", paddingTop: "5px" }}>
        {message}
      </p>
    </div>
  );
}

export default Login;
