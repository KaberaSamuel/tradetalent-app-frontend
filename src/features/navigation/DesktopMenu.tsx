import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiViewDashboardOutline,
  mdiFormatListCheckbox,
  mdiMessageOutline,
  mdiAccountOutline,
  mdiPlusCircleOutline,
} from "@mdi/js";

const DesktopMenu = () => {
  const [activeTab, setActiveTab] = useState(window.location.pathname);

  return (
    <div className="sticky top-0 w-[25vw] min-w-[280px] h-screen p-4 border-r-1 border-neutral-300 [&_.active]:text-black [&_.active]:bg-neutral-200">
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
          className={
            activeTab.startsWith("/listings") && !activeTab.includes("new")
              ? "active"
              : ""
          }
        >
          <Icon path={mdiFormatListCheckbox} size={1} />
          <p>Listings</p>
        </Link>

        <Link
          to="/listings/new"
          onClick={() => setActiveTab("/listings/new")}
          className={activeTab.includes("/new") ? "active" : ""}
        >
          <Icon path={mdiPlusCircleOutline} size={1} />
          <p>Post Need/Offer</p>
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
      </div>
    </div>
  );
};

export default DesktopMenu;
