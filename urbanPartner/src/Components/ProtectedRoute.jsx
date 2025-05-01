// src/Components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("urbanPartnerToken");
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
