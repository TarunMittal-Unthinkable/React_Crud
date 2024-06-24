import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../SignUp/SignUp.css";

function Register() {
  const navigate = useNavigate();
  const [setShowError] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    console.log(data);

    try {
      await axios.post("http://localhost:3000/api/users/register", data);
      toast.success("Registration successful! Please login.");
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <ToastContainer />
      <form onSubmit={handleRegister} className="form">
        <h2>Signup</h2>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="phone_no"
            placeholder="Enter Phone Number"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="test"
            name="first_name"
            placeholder="Enter First Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="last_name"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="gender"
            placeholder="Enter Gender"
          />
        </div>
        <button type="submit">Signup</button>
        <p className="form-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
