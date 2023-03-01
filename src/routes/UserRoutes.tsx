import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="profile" replace />} />
    <Route path="profile" element={<></>} />
  </Routes>
);

export default UserRoutes;
