import { Navigate, Outlet } from "react-router-dom";
import MessagePopup from "../popups/MessagePopUp";
import { useAppSelector } from "../../hooks/reduxHooks";
import { authSelector } from "../auth/authSlice";

const PublicRoute = () => {
  const auth = useAppSelector(authSelector);

  if (!auth.token.access) {
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
