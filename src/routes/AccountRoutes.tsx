import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const AccountRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="profile" replace />} />
    <Route path="profile" element={<></>} />
  </Routes>
);

export default AccountRoutes;
