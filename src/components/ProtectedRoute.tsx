// ProtectedRoute.tsx
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element | JSX.Element[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
