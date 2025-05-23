import React from "react";
import { Navigate } from "react-router-dom";

const AuthLogin = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  return token ? children : <Navigate to="/" />;
};

export default AuthLogin;
