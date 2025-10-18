import {
  mdiAccountOutline,
  mdiFormatListCheckbox,
  mdiHomeOutline,
  mdiMessageOutline,
  mdiPlus,
} from "@mdi/js";
import Icon from "@mdi/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const [activeTab, setActiveTab] = useState(window.location.pathname);
  const childrenStyles =
    " [&>*]:rounded-xl [&>*]:flex [&>*]:flex-col [&>*]:items-center [&>*]:text-xs";
  return (
    <div
      className={
        "z-10 fixed p-3 sm:px-15 bg-white bottom-0 w-full flex justify-between text-sm text-neutral-700 font-semibold border-t-2 border-neutral-300" +
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
        to="/listings/new"
        onClick={() => setActiveTab("/messages")}
        className={activeTab.startsWith("/messages") ? "active" : ""}
      >
        <Icon path={mdiPlus} size={1} />
        <p>Create</p>
      </Link>

      <Link
        to="/chats"
        onClick={() => setActiveTab("/chats")}
        className={activeTab.startsWith("/chats") ? "active" : ""}
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
  );
};

export default MobileMenu;
