import React from 'react';
import { Route, Routes } from 'react-router-dom';

import lazyRetry from '@/shared/utils/lazy-retry';
const User = lazyRetry(() => import('@/pages/user'));

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<User />} />
    <Route path="profile" element={<></>} />
  </Routes>
);

export default UserRoutes;
