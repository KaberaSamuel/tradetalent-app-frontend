import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MessagePopup from "@/features/popups/MessagePopUp";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  authSelector,
  updateTokens,
  updateUser,
} from "@/features/auth/authSlice";
import { updateMyListings } from "../home/ActivitiesSlice";
import { fetchUser } from "@/features/auth/api";
import { Spinner } from "@/components/Loader";

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
    queryKey: ["user-data"],
    queryFn: () => fetchUser(accessToken!, refreshToken!),
    enabled: shouldFetchUser,
    retry: false,
  });

  // Effect to update redux store when user data is fetched
  useEffect(() => {
    if (data) {
      const newTokens = {
        access: data.newAccessToken || accessToken!,
        refresh: refreshToken!,
      };

      dispatch(updateTokens(newTokens));
      dispatch(updateUser(data.data.user));
      dispatch(updateMyListings(data.data.user.my_listings_count));

      // Update localStorage if new token was provided
      if (data.newAccessToken) {
        localStorage.setItem("access", data.newAccessToken);
      }
    }
  }, [data, accessToken, refreshToken, dispatch]);

  // If already logged in
  if (auth.token.access) {
    return (
      <div>
        <Outlet />
        <MessagePopup />
      </div>
    );
  }

  // If not logged in, but have tokens in localStorage
  if (accessToken && refreshToken) {
    if (isLoading) {
      return (
        <div className="h-screen -translate-y-5">
          <Spinner />
        </div>
      );
    }

    if (isError) {
      // Clear localStorage as stored tokens are invalid
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

  return <Navigate to="/public" replace />;
};

export default PrivateRoute;
