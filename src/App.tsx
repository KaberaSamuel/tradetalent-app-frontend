import NavBar from "@/features/navigation/NavBar";
import TopBar from "@/features/navigation/TopBar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="flex overflow-x-hidden">
      <NavBar />

      <div className="w-[100%] min-h-screen flex flex-col">
        <TopBar />

        <div className="px-4 pt-6 pb-30 sm:px-7  grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
