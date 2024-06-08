import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AuthLayout from '@/layouts/auth-layout';
import MainLayout from '@/layouts/main-layout';

import AuthGuard from './auth-guard';
import AuthRoutes from './auth-routes';
import UserRoutes from './user-routes';

const NotFound = React.lazy(() => import('@/pages/404'));

const AppRoute = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="auth/*" element={<AuthRoutes />} />
      </Route>
      <Route element={<AuthGuard children={<MainLayout />} />}>
        <Route path="/" element={<></>} />
        <Route path="user/*" element={<UserRoutes />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;
