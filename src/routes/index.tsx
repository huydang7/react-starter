import React from "react";
import { Route, Routes } from "react-router-dom";
import LoadingScreen from "components/LoadingScreen";
import { useQueryGetMe } from "hooks/useAuth";
import AuthLayout from "layouts/AuthLayout";
import MainLayout from "layouts/MainLayout";
import { useAuthStore } from "stores/auth";
import AccountRoutes from "./AccountRoutes";
import AuthGuard from "./AuthGuard";
import AuthRoutes from "./AuthRoutes";
import DashboardRoutes from "./DashboardRoutes";

const NotFound = React.lazy(() => import("pages/Error/404"));

const AppRoute = () => {
  const { isLoading } = useQueryGetMe();
  const tokens = useAuthStore().tokens;

  if (isLoading && tokens) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="auth/*" element={<AuthRoutes />} />
      </Route>
      <Route element={<AuthGuard children={<MainLayout />} />}>
        <Route path="/" element={<></>} />
        <Route path="dashboard/*" element={<DashboardRoutes />} />
        <Route path="account/*" element={<AccountRoutes />} />
        <Route path="user" element={<></>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;
