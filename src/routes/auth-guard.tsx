import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import { Role } from '@/interfaces/user';
import { useAuthStore } from '@/stores/auth';

const AuthGuard = ({ children, roles }: { children: JSX.Element; roles?: Role[] }) => {
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
