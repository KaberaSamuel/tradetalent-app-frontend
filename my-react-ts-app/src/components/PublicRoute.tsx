import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import MessagePopup from "../features/messages/Message";

const PublicRoute = () => {
  const auth = useAuth();

  if (!auth?.accessToken) {
    return (
      <div>
        <Outlet />
        <MessagePopup />
      </div>
    );
  }

  return <Navigate to="/" replace />;
};

export default PublicRoute;
