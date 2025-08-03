import { useAuth } from "./hooks/AuthProvider";
import { Link } from "react-router-dom";

const App = () => {
  const auth = useAuth();

  return (
    <div className="App">
      <h1>Hi {auth!.user?.first_name}</h1>
      <p>Welcome to the home page</p>
      <Link to={"/login"}>Login</Link>
    </div>
  );
};

export default App;
