import { Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WelcomePage from "./components/Welcome";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/public" element={<WelcomePage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<App />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
