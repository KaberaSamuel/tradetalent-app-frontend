import { Route, Routes } from "react-router-dom";

import PrivateRoute from "@/features/routing/PrivateRoute";
import PublicRoute from "@/features/routing/PublicRoute";

import App from "@/App";
import ForgotPasswordPage from "@/features/auth/ForgotPassword";
import Login from "@/features/auth/Login";
import ResetPasswordPage from "@/features/auth/ResetPassword";
import Signup from "@/features/auth/Signup";
import ChatPage from "@/features/chat/ChatPage";
import Conversations from "@/features/chat/Conversations";
import Home from "@/features/home/Home";
import PublicPage from "@/features/home/PublicPage";
import WelcomePage from "@/features/home/Welcome";
import BrowseListings from "@/features/listings/BrowseListings";
import EditListing from "@/features/listings/EditListing";
import ListingDetail from "@/features/listings/ListingDetail";
import MyListings from "@/features/listings/MyListings";
import NewListing from "@/features/listings/NewListing";
import EditProfile from "@/features/profile/EditProfile";
import Profile from "@/features/profile/Profile";
import NotFoundPage from "@/features/routing/Notfound";
import useMediaQuery from "@/hooks/useMediaQuery";

const AppRouter = () => {
  const isTablet = useMediaQuery("(max-width: 1024px)");

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/public/" element={<PublicPage />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/listings" element={<BrowseListings />} />
          <Route path="/listings/new" element={<NewListing />} />
          <Route path="/listings/:listing_slug" element={<ListingDetail />} />
          <Route
            path="/listings/:listing_slug/edit"
            element={<EditListing />}
          />

          <Route path="/users/:user_slug" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />

          {/* Chat Pages Routing */}
          {isTablet ? (
            <>
              <Route path="/chats" element={<Conversations />} />
              <Route path="/chats/:conversationName" element={<ChatPage />} />
            </>
          ) : (
            <Route path="/chats" element={<Conversations />}>
              <Route path=":conversationName" element={<ChatPage />} />
            </Route>
          )}
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
