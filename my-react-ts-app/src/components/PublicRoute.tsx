import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PublicRoute = () => {
  const auth = useAuth();

  if (!auth?.accessToken) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default PublicRoute;
