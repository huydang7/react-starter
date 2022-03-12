import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { routes } from "./config";

import { RouteProps } from "react-router-dom";
import * as AuthService from "../services/auth-service";
import BlankLayout from "../layouts/BlankLayout";

export interface RouteConfig extends RouteProps {
  layout: any;
  subRoutes?: Array<RouteConfig>;
  isPrivate?: boolean;
  component?: any;
}

export interface AppRouteProps {
  // routes: Array<RouteConfig>;
}

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = AuthService.isLoggedIn();
  let location = useLocation();
  if (isLoggedIn) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
};

const generateRoutes = (routes: RouteConfig[]): any => {
  const mainRoutes = routes.map(
    ({ isPrivate, layout, subRoutes, component, ...rest }) => {
      const Component = component;
      const Layout = layout !== undefined ? layout : BlankLayout;
      if (isPrivate)
        return [
          <Route
            element={
              <RequireAuth>
                <Layout>
                  <Component />
                </Layout>
              </RequireAuth>
            }
            {...rest}
          />,
          ...generateRoutes(subRoutes || []),
        ];
      return [
        <Route
          element={
            <Layout>
              <Component />
            </Layout>
          }
          {...rest}
        />,
        ...generateRoutes(subRoutes || []),
      ];
    }
  );

  return mainRoutes;
};

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>{generateRoutes(routes)}</Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
