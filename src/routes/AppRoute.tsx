import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  RouteProps,
} from "react-router-dom";
import { routes } from "./config";
import BlankLayout from "../layouts/BlankLayout";
import { useAuthStore } from "../stores/auth";
import { useQueryGetMe } from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";
import { Role } from "../interfaces/user";

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
  const user = useAuthStore().currentUser;
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
  const { isLoading } = useQueryGetMe();
  const tokens = useAuthStore().tokens;

  if (isLoading && tokens) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>{generateRoutes(routes)}</Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
