import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/Auth/auth-context";

export function PrivateRoute({ children }) {
  const { token } = useAuth();
  const location = useLocation();
  return token ? children : <Navigate to="/sign-in" state={{ from: location?.pathname }} replace />;
}
