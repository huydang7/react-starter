import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import * as AuthService from "../services/auth-service";

export interface Props extends RouteProps {
  layout: React.ComponentType;
}

export const PrivateRoute: React.FC<Props> = (props) => {
  const { layout, component, render, ...rest } = props;
  const Layout = layout !== undefined ? layout : BlankLayout;
  const isLoggedIn = AuthService.isLoggedIn();
  const Component = component;
  return (
    <Route
      {...rest}
      render={(props) => {
        return isLoggedIn ? (
          render ? (
            render({ ...props })
          ) : (
            <Layout>{Component ? <Component {...props} /> : null}</Layout>
          )
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};
