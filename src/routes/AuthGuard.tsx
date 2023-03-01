import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Role } from "interfaces/user";
import { useAuthStore } from "stores/auth";
import { shallow } from "zustand/shallow";

const AuthGuard = ({
  children,
  roles,
}: {
  children: JSX.Element;
  roles?: Role[];
}) => {
  const user = useAuthStore((state) => state.currentUser, shallow);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children || <Outlet />;
};

export default AuthGuard;
