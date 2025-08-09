import { Routes, Route } from "react-router-dom";
import App from "../../App";
import Login from "../auth/Login";
import Signup from "../auth/Signup";
import WelcomePage from "../../components/Welcome";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Home from "../../components/Home";

const UnderDevelopment = () => {
  return (
    <div className="p-5 text-xl">
      <p>The page is still in development</p>
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
          <Route path="*" element={<UnderDevelopment />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
