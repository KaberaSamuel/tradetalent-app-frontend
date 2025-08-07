// import { Link } from "react-router-dom";
import { useAppSelector } from "./hooks/reduxHooks";
import { authSelector } from "./features/auth/authSlice";

const App = () => {
  const auth = useAppSelector(authSelector);
  console.log(auth);
  return (
    <div className="App">
      <p>Welcome to the home page</p>
      <button className="ml-5">Logout</button>
    </div>
  );
};

export default App;
