import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ResetPassword from "../pages/Auth/ResetPassword";
import NotFound from "../pages/Error/404";
import Home from "../pages/Home";
import { RouteConfig } from "./AppRoute";

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const routes = [
  {
    path: "/",
    component: Home,
    layout: MainLayout,
    exact: true,
    isPrivate: true,
  },
  {
    path: "/auth",
    component: NotFound,
    layout: AuthLayout,
    exact: true,
    subRoutes: [
      {
        path: "/auth/login",
        component: Login,
        layout: AuthLayout,
        exact: true,
      },
      {
        path: "/auth/register",
        component: Register,
        layout: AuthLayout,
        exact: true,
      },
      {
        path: "/auth/forgot-password",
        component: ForgotPassword,
        layout: AuthLayout,
        exact: true,
      },
      {
        path: "/auth/reset-password",
        component: ResetPassword,
        layout: AuthLayout,
        exact: true,
      },
    ],
  },
  {
    path: "*",
    component: NotFound,
  },
] as Array<RouteConfig>;
