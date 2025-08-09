import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { clear } from "./features/auth/authSlice";
import { authSelector } from "./features/auth/authSlice";
import { logoutUser } from "./api";

import Sidebar from "./components/SideBar";

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
      <Sidebar />
      <div className="p-5">
        <p>Hi, {auth.user.first_name}</p>
        <p>Welcome to the home page</p>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default App;
