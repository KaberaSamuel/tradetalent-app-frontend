import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MessagePopup from "../features/messages/Message";

import { useAppDispatch } from "../hooks/reduxHooks";
import { updateTokens, updateUser } from "../features/auth/authSlice";
import { fetchUser } from "../api";

const PrivateRoute = () => {
  const dispatch = useAppDispatch();

  const accessToken = localStorage.getItem("access") || "";
  const refreshToken = localStorage.getItem("refresh") || "";

  // fetching using access token
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get user data"],
    queryFn: () => fetchUser(accessToken, refreshToken),
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (data) {
    // updating state
    dispatch(
      updateTokens({
        access: localStorage.getItem("access") || "",
        refresh: localStorage.getItem("refresh") || "",
      })
    );

    dispatch(updateUser(data.data.user));
  }

  return (
    <div>
      <Outlet />
      <MessagePopup />
    </div>
  );
};

export default PrivateRoute;
