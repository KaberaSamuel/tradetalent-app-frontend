import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { Outlet } from "react-router-dom";
import { clear } from "./features/auth/authSlice";
import { authSelector } from "./features/auth/authSlice";
import { logoutUser } from "./api";

import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";

const App = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(authSelector);

  const logout = async () => {
    try {
      logoutUser(auth.token.access, auth.token.refresh);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(clear());
      localStorage.clear();
    }
  };

  return (
    <div className="flex">
      <NavBar />

      <div className="w-[100%]">
        <TopBar />

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
