import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";
import { RouteConfig } from "./AppRoute";

export const routes = [
  {
    path: "/",
    component: Home,
    layout: MainLayout,
    exact: true,
  },
  {
    path: "/auth",
    component: () => "AUTH",
    layout: BlankLayout,
    exact: true,
    routes: [
      {
        path: "/auth/login",
        component: Login,
        layout: BlankLayout,
        exact: true,
      },
      {
        path: "/auth/register",
        component: Register,
        layout: BlankLayout,
        exact: true,
      },
    ],
  },
  {
    component: Register,
  },
] as Array<RouteConfig>;
