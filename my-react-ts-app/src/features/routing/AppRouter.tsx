import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import App from "../../App";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import WelcomePage from "../home/Welcome";
import Home from "../home/Home";
import EditProfile from "../profile/EditProfile";
import Profile from "../profile/Profile";
import NewListing from "../listings/NewListing";
import PublicPage from "../home/PublicPage";

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
