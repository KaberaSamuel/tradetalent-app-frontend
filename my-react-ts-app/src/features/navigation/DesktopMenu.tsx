import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiViewDashboardOutline,
  mdiFormatListCheckbox,
  mdiMessageOutline,
  mdiAccountOutline,
  mdiCogOutline,
} from "@mdi/js";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { authSelector, clear } from "../auth/authSlice";
import { logoutUser } from "../auth/api";

const DesktopMenu = () => {
  const [activeTab, setActiveTab] = useState(window.location.pathname);
  const dispatch = useAppDispatch();
  const auth = useAppSelector(authSelector);

  const logout = async () => {
    try {
      await logoutUser(auth.token.access, auth.token.refresh);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(clear());
      localStorage.clear();
    }
  };

  return (
    <div className="relative w-[25vw] min-w-[280px] h-full p-4 border-r-1 border-neutral-300 [&_.active]:text-black [&_.active]:bg-neutral-200">
      <div className="mb-10">
        <Link to="/" className="text-xl font-semibold">
          ServiceExchange
        </Link>
      </div>

      <div className="flex flex-col gap-4 text-neutral-700 [&>*]:py-2.5 [&>*]:px-3  [&>*]:rounded-xl [&>*]:flex [&>*]:gap-2 [&>*]:items-center">
        <Link
          to="/"
          onClick={() => setActiveTab("/")}
          className={activeTab == "/" ? "active" : ""}
        >
          <Icon path={mdiViewDashboardOutline} size={1} />
          <p>Dashboard</p>
        </Link>

        <Link
          to="/listings"
          onClick={() => setActiveTab("/listings")}
          className={activeTab == "/listings" ? "active" : ""}
        >
          <Icon path={mdiFormatListCheckbox} size={1} />
          <p>Listings</p>
        </Link>

        <Link
          to="/messages"
          onClick={() => setActiveTab("/messages")}
          className={activeTab.startsWith("/messages") ? "active" : ""}
        >
          <Icon path={mdiMessageOutline} size={1} />
          <p>Messages</p>
        </Link>

        <Link
          to="/profile"
          onClick={() => setActiveTab("/profile")}
          className={activeTab.startsWith("/profile") ? "active" : ""}
        >
          <Icon path={mdiAccountOutline} size={1} />
          <p>Profile</p>
        </Link>

        <Link
          to="/settings"
          onClick={() => setActiveTab("/new")}
          className={activeTab.startsWith("/new") ? "active" : ""}
        >
          <Icon path={mdiCogOutline} size={1} />
          <p>Settings</p>
        </Link>
      </div>

      <button onClick={logout} className="absolute bottom-5 text-lg underline">
        Logout
      </button>
    </div>
  );
};

export default DesktopMenu;
