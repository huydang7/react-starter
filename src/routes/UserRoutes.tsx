import React from 'react';
import { Route, Routes } from 'react-router-dom';
const User = React.lazy(() => import('pages/User'));

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<User />} />
    <Route path="profile" element={<></>} />
  </Routes>
);

export default UserRoutes;
