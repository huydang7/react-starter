import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import lazyRetry from '@/shared/utils/lazy-retry';
import { useAuthStore } from '@/stores/auth';

const Login = lazyRetry(() => import('@/pages/Auth/Login'));
const Register = lazyRetry(() => import('@/pages/Auth/Register'));
const ForgotPassword = lazyRetry(() => import('@/pages/Auth/ForgotPassword'));
const ResetPassword = lazyRetry(() => import('@/pages/Auth/ResetPassword'));

const AuthRoutes = () => {
  const user = useAuthStore((state) => state.currentUser, shallow);

  if (user) {
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
