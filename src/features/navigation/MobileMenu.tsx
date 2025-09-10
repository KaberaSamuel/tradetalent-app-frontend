import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiHomeOutline,
  mdiFormatListCheckbox,
  mdiMessageOutline,
  mdiAccountOutline,
  mdiCogOutline,
} from "@mdi/js";

const MobileMenu = () => {
  const [activeTab, setActiveTab] = useState(window.location.pathname);
  const childrenStyles =
    " [&>*]:rounded-xl [&>*]:flex [&>*]:flex-col [&>*]:items-center [&>*]:text-xs";
  return (
    <div
      className={
        "fixed z-10 p-3 sm:px-15 bg-white bottom-0 w-full flex justify-between text-sm text-neutral-700 font-semibold border-t-2 border-neutral-300" +
        childrenStyles
      }
    >
      <Link
        to="/"
        onClick={() => setActiveTab("/")}
        className={activeTab == "/" ? "active" : ""}
      >
        <Icon path={mdiHomeOutline} size={1} />
        <p>Home</p>
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
  );
};

export default MobileMenu;
