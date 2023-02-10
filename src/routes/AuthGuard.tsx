import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Role } from "interfaces/user";
import { useAuthStore } from "stores/auth";

const AuthGuard = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles?: Role[];
}) => {
  const user = useAuthStore().currentUser;
  let location = useLocation();
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  if (user?.role && roles && !roles?.includes(user?.role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children || <Outlet />;
};

export default AuthGuard;
