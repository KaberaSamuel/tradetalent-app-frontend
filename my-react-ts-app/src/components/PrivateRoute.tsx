// PrivateRoute.tsx (updated)
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PrivateRoute = () => {
  const auth = useAuth();

  if (auth?.accessToken) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
