import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // ✅ Role get केला

  if (!token) {
    return <Navigate to="/" />; // ❌ Token नाही -> लॉगिन पेजला पाठवा
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" />; // ❌ Role match होत नाही -> Unauthorized
  }

  return <Outlet />;
};

export default ProtectedRoute;
