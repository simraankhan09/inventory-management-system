import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

interface ProtectedRouteProps extends PropsWithChildren {
  accessibleRoles?: string[];
}

const ProtectedRoute = ({ children, accessibleRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (accessibleRoles && !accessibleRoles.includes(user.role)) {
    return <Navigate to="/403" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
