import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import MessagePopup from "../features/messages/Message";

const PrivateRoute = () => {
  const auth = useAuth();

  if (auth?.accessToken) {
    return (
      <div>
        <Outlet />
        <MessagePopup />
      </div>
    );
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
