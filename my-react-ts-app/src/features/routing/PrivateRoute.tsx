import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MessagePopup from "../popups/MessagePopUp";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { authSelector, updateTokens, updateUser } from "../auth/authSlice";
import { fetchUser } from "../../api";
import { useEffect } from "react";

const PrivateRoute = () => {
  const auth = useAppSelector(authSelector);
  const dispatch = useAppDispatch();

  // Get tokens from localStorage
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");

  // Determine when necessary to fetch user data
  const shouldFetchUser = Boolean(
    !auth.token.access && accessToken && refreshToken
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get user data"],
    queryFn: () => fetchUser(accessToken!, refreshToken!),
    enabled: shouldFetchUser,
  });

  // Effect to dispatch actions only when a condition is met
  useEffect(() => {
    // Check if the react query has successfully fetched data
    if (data) {
      dispatch(
        updateTokens({
          access: accessToken!,
          refresh: refreshToken!,
        })
      );
      dispatch(updateUser(data.data.user));
    }
  }, [data, accessToken, refreshToken, dispatch, updateUser, updateTokens]);

  // If already logged in
  if (auth.token.access) {
    return (
      <div>
        <Outlet />
        <MessagePopup />
      </div>
    );
  }

  // If not logged in, but have tokens on local storage
  if (accessToken && refreshToken) {
    if (isLoading) {
      return <p>Loading....</p>;
    }

    if (isError) {
      // clear localstorage as stored tokesn are invalid
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

    if (data) {
      return (
        <div>
          <Outlet />
          <MessagePopup />
        </div>
      );
    }
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
