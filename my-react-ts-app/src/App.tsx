import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";

const App = () => {
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
