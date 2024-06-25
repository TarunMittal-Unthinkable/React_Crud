import React from "react";
import "./Logout.css";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    navigate("/login");
    toast.success('Logout Successful');
  };
  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
