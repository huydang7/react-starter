import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Role, routes } from "./config";

import { RouteProps } from "react-router-dom";

import { useSelector } from "react-redux";
import BlankLayout from "../layouts/BlankLayout";
import { RootState } from "../rematch/store";

import useLoading from "../hooks/useLoading";

export type RouteConfig = {
  layout: any;
  subRoutes?: Array<RouteConfig>;
  isPrivate?: boolean;
  component?: any;
} & RouteProps;
export interface AppRouteProps {
  // routes: Array<RouteConfig>;
}

const RequireAuth = ({
  children,
  ...rest
}: {
  children: JSX.Element;
  roles?: Role[];
}) => {
  const user: any = useSelector((state: RootState) => state.auth.user);
  let location = useLocation();
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  if (user?.role && rest?.roles && !rest?.roles?.includes(user?.role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
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
              <RequireAuth {...rest}>
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
  const getMeState = useLoading(
    (state: RootState) => state.loading.effects.auth.getMe
  );
  const tokens = useSelector((state: RootState) => state.auth.tokens);

  if (!getMeState.finished && tokens) {
    return <></>;
  }

  return (
    <BrowserRouter>
      <Routes>{generateRoutes(routes)}</Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
