import { Outlet } from "react-router-dom";
import NavBar from "@/features/navigation/NavBar";
import TopBar from "@/features/navigation/TopBar";
// import ModalOveraly from "./features/modals/ModalOveraly";

const App = () => {
  return (
    <div className="flex">
      <NavBar />

      <div className="w-[100%] min-h-screen flex flex-col">
        <TopBar />

        <div className="p-3 sm:p-7 pb-30 grow">
          <Outlet />
        </div>

        {/* <ModalOveraly>
          <p>Children</p>
        </ModalOveraly> */}
      </div>
    </div>
  );
};

export default App;
