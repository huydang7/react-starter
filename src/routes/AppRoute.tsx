import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { routes } from "./config";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { RouteProps } from "react-router-dom";

export interface RouteConfig extends RouteProps {
  layout: any;
  subRoutes?: Array<RouteConfig>;
  isPrivate?: boolean;
  authComponent?: any;
  authLayout?: any;
}

export interface AppRouteProps {
  // routes: Array<RouteConfig>;
}

const generateRoutes = (routes: RouteConfig[]): any[] => {
  const mainRoutes = routes.map(
    ({
      isPrivate,
      layout,
      path,
      subRoutes,
      children,
      component,
      render,
      authComponent,
      authLayout,
      ...rest
    }) => {
      if (isPrivate)
        return [
          <PrivateRoute
            layout={layout}
            path={path}
            component={component}
            children={children}
            render={render}
            {...rest}
          />,
          ...generateRoutes(subRoutes || []),
        ];
      return [
        <PublicRoute
          layout={layout}
          path={path}
          component={component}
          children={children}
          render={render}
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
    <Router>
      <Switch>{generateRoutes(routes)}</Switch>
    </Router>
  );
};

export default AppRoute;
