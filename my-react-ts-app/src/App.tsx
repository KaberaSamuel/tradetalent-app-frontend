import { useAuth } from "./hooks/AuthProvider";

const App = () => {
  const auth = useAuth();
  console.log(auth);

  return (
    <div className="App">
      <h1>Hi {auth!.user?.fullname}</h1>
      <p>Welcome to the home page</p>
    </div>
  );
};

export default App;
