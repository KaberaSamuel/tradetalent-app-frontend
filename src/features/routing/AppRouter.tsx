import { Route, Routes } from "react-router-dom";

import PrivateRoute from "@/features/routing/PrivateRoute";
import PublicRoute from "@/features/routing/PublicRoute";

import App from "@/App";
import Login from "@/features/auth/Login";
import Signup from "@/features/auth/Signup";
import Home from "@/features/home/Home";
import PublicPage from "@/features/home/PublicPage";
import WelcomePage from "@/features/home/Welcome";
import BrowseListings from "@/features/listings/BrowseListings";
import EditListing from "@/features/listings/EditListing";
import ListingDetail from "@/features/listings/ListingDetail";
import MyListings from "@/features/listings/MyListings";
import NewListing from "@/features/listings/NewListing";
import MessagesPage from "@/features/messages/Messages";
import EditProfile from "@/features/profile/EditProfile";
import Profile from "@/features/profile/Profile";
import NotFoundPage from "@/features/routing/Notfound";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/public" element={<PublicPage />}>
          <Route index element={<WelcomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/listings" element={<BrowseListings />} />
          <Route path="/listings/new" element={<NewListing />} />
          <Route path="/listings/:listing_slug" element={<ListingDetail />} />
          <Route path="/users/:user_slug" element={<Profile />} />
          <Route
            path="/listings/:listing_slug/edit"
            element={<EditListing />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/messages" element={<MessagesPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
