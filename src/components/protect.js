import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./authprovider";

const ProtectedRoute = ({ children, requiredType }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    // Not logged in — send to correct signup route
    const redirectPath = requiredType === "college" ? "/signup1" : "/signup";
    return <Navigate to={redirectPath} replace />;
  }

  // Logged in but wrong user type
  if (requiredType && user.type !== requiredType) {
    const fallbackPath = user.type === "college" ? "/dashboard" : "/";
    return <Navigate to={fallbackPath} replace />;
  }
  if (requiredType && user.type !== requiredType) {
    const fallbackPath = user.type === "student0" ? "/student-corner" : "/";
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
