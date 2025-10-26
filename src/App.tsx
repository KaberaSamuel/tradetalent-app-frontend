import NavBar from "@/features/navigation/NavBar";
import TopBar from "@/features/navigation/TopBar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen flex">
      <NavBar />

      <div className="w-[100vw] min-h-screen flex flex-col">
        <TopBar />

        <div className="relative grow">
          <div className="p-3 pb-30 sm:px-7 h-full overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
