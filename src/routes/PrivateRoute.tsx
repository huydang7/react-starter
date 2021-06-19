import React from "react";
import { Redirect, RouteProps } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import * as AuthService from "../services/auth-service";
import { PublicRoute } from "./PublicRoute";

export interface Props extends RouteProps {
  layout: React.ComponentType;
}

export const PrivateRoute: React.FC<Props> = (props) => {
  const isLoggedIn = AuthService.isLoggedIn();
  const { layout, component, ...rest } = props;
  const Component = component;
  const Layout = layout !== undefined ? layout : BlankLayout;
  return (
    <Layout>
      <PublicRoute
        {...rest}
        render={(props) => {
          if (isLoggedIn) {
            if (rest.render) {
              return rest.render({ ...props });
            } else if (Component) {
              return <Component {...props} />;
            } else {
              return null;
            }
          }
          return <Redirect to="/auth/login" />;
        }}
      />
    </Layout>
  );
};
