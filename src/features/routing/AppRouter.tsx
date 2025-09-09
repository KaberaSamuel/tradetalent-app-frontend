import { Routes, Route } from "react-router-dom";
import PrivateRoute from "@/features/routing/PrivateRoute";
import PublicRoute from "@/features/routing/PublicRoute";

import App from "@/App";
import Login from "@/features/auth/Login";
import Signup from "@/features/auth/Signup";
import WelcomePage from "@/features/home/Welcome";
import Home from "@/features/home/Home";
import EditProfile from "@/features/profile/EditProfile";
import Profile from "@/features/profile/Profile";
import NewListing from "@/features/listings/NewListing";
import MyListings from "@/features/listings/MyListings";
import BrowseListings from "@/features/listings/BrowseListings";
import PublicPage from "@/features/home/PublicPage";

const UnderDevelopment = () => {
  return (
    <div className="text-xl">
      <p>This page is still in development</p>
    </div>
  );
};

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
          <Route path="/listings" element={<BrowseListings />} />
          <Route path="/my-listings" element={<MyListings />} />
          <Route path="/listings/new" element={<NewListing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="*" element={<UnderDevelopment />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
