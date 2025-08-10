import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MessagePopup from "../popups/MessagePopUp";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { authSelector, updateTokens, updateUser } from "../auth/authSlice";
import { fetchUser } from "../auth/api";
import type { UserTypes } from "../../App.types";

export const getNameInitials = (user: UserTypes): string => {
  const nameInitials = user.first_name.charAt(0) + user.last_name.charAt(0);

  return nameInitials.toUpperCase();
};

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

      // adding name initials to the user response
      const user = data.data.user;
      user.name_initials = getNameInitials(user);
      dispatch(updateUser(user));
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
