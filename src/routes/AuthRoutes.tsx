import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "stores/auth";
import { shallow } from "zustand/shallow";

const Login = React.lazy(() => import("pages/Auth/Login"));
const Register = React.lazy(() => import("pages/Auth/Register"));
const ForgotPassword = React.lazy(() => import("pages/Auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("pages/Auth/ResetPassword"));

const AuthRoutes = () => {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
    shallow
  );

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default AuthRoutes;
