import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import App from "../../App";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import WelcomePage from "../../components/Welcome";
import Home from "../../components/Home";
import EditProfile from "../profile/EditProfile";
import Profile from "../profile/Profile";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/public" element={<WelcomePage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="*" element={<UnderDevelopment />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
