// routes/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthService from "../../config/auth/AuthService";

export default function ProtectedRoute({ children }) {
  const token = AuthService.getAuthToken()
    console.log(token)
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
