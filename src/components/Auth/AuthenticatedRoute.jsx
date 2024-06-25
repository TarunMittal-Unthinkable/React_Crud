import React from "react";
import { Navigate } from "react-router-dom";

function AuthenticatedRoute({ children }) {
  const token = localStorage.getItem("Authorization");
  return token ? children : <Navigate replace to="/login" />;
}

export default AuthenticatedRoute;
