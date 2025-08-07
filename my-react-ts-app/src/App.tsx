import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <p>Welcome to the home page</p>
      <Link to={"/login"}>Login</Link>
      <button className="ml-5">Logout</button>
    </div>
  );
};

export default App;
