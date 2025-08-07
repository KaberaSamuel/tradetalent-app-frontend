import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { clear } from "./features/auth/authSlice";
import { authSelector } from "./features/auth/authSlice";
import { logoutUser } from "./api";

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
    <div className="App">
      <p>Hi, {auth.user.first_name}</p>
      <p>Welcome to the home page</p>
      <button onClick={logout} className="ml-5">
        Logout
      </button>
    </div>
  );
};

export default App;
