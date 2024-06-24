import React, { createContext, useContext, useState } from "react";

// Create the auth context with createContext()
const AuthContext = createContext();

// Create a custom hook to use the auth context easily
export const useAuth = () => useContext(AuthContext);

// AuthProvider component that provides the auth context to child components
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  // Define a logout function that clears the auth state
  const logout = () => {
    setAuth({ token: null, user: null }); // Reset the authentication state
  };

  // Include the logout function in the value provided by the AuthContext provider
  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
