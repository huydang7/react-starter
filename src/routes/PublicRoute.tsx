import React from "react";
import { Route, RouteProps } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";

export interface Props extends RouteProps {
  layout?: React.ComponentType;
}

export const PublicRoute: React.FC<Props> = (props) => {
  const { layout, component, render, ...rest } = props;
  const Layout = layout !== undefined ? layout : BlankLayout;
  const Component = component;

  return (
    <Route
      {...rest}
      render={(props) =>
        render ? (
          render({ ...props })
        ) : (
          <Layout>{Component ? <Component {...props} /> : null}</Layout>
        )
      }
    />
  );
};
