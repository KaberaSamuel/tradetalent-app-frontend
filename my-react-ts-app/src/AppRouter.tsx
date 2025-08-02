// AppRouter.tsx (new file)
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Signup from "./components/Signup";
import WelcomePage from "./components/Welcome";
import PrivateRoute from "./components/PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/public" element={<WelcomePage />} />

      {/* Protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<App />} />
        {/* Add more protected routes here */}
      </Route>
    </Routes>
  );
};

export default AppRouter;
