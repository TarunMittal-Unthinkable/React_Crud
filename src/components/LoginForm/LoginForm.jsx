import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LoginForm.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("Authorization", response.headers.authorization); 
      // localStorage.setItem("RefreshToken", response.headers.RefreshToken); 
      // console.log(response.headers,response.headers.authorization,response.headers.RefreshToken)
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/brandlist");
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p className="form-link">
          Don’t have an account? 
        </p>
      </form>
    </div>
  );
}

export default Login;
