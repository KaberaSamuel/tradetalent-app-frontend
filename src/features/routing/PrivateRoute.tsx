import { Spinner } from "@/components/Loader";
import { fetchUser } from "@/features/auth/api";
import {
  authSelector,
  updateTokens,
  updateUser,
} from "@/features/auth/authSlice";
import { updateMyListings } from "@/features/home/ActivitiesSlice";
import { updateActiveTab } from "@/features/navigation/navigationSlice";
import MessagePopup from "@/features/popups/MessagePopUp";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
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

  const [isServerWaking, setIsServerWaking] = useState(false);

  // Effect to show waiting message on page load
  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        setIsServerWaking(true);
      }
    }, 5000);
  }, [isLoading]);

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

      // updating activetab
      const path = location.pathname;
      if (path.includes("listings")) {
        if (path.includes("new")) {
          dispatch(updateActiveTab("post"));
        } else {
          dispatch(updateActiveTab("listings"));
        }
      } else if (path.includes("chats")) {
        dispatch(updateActiveTab("chats"));
      } else if (path.includes("profile")) {
        dispatch(updateActiveTab("profile"));
      } else {
        dispatch(updateActiveTab("home"));
      }

      // Update localStorage if new token was provided
      if (data.newAccessToken) {
        localStorage.setItem("access", data.newAccessToken);
      }
    }
  }, [data, accessToken, refreshToken, dispatch, location]);

  // If already logged in
  if (auth.token.access) {
    return (
      <div>
        <Outlet />
        <MessagePopup />
      </div>
    );
  }

  // Fetching user data if there're tokens on the localStorage
  if (accessToken && refreshToken) {
    if (isLoading) {
      return (
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="w-fit">
            <Spinner />
          </div>
          {isServerWaking && (
            <div className="mt-8 sm:text-lg flex flex-col sm:flex-row gap-1">
              <p className=" text-teal-500">
                Hang on, The server is waking up,
              </p>
              <p className=" text-red-500">This can take 1-3 minutes</p>
            </div>
          )}
        </div>
      );
    }

    if (isError) {
      // Clear localStorage as stored tokens are invalid
      localStorage.clear();
      return <Navigate to="/public" replace />;
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
