import { Outlet } from "react-router-dom";
import NavBar from "@/features/navigation/NavBar";
import TopBar from "@/features/navigation/TopBar";

const App = () => {
  return (
    <div className="flex">
      <NavBar />

      <div className="w-[100%] flex flex-col">
        <TopBar />

        <div className="p-7 pb-30 grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
