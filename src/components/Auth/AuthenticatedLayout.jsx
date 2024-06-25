import React from "react";
import { Outlet } from "react-router-dom";
import LogoutButton from "../LogOut/Logout.jsx";

function AuthenticatedLayout() {
  return (
    <div>
      <LogoutButton />
      <Outlet />
    </div>
  );
}

export default AuthenticatedLayout;
