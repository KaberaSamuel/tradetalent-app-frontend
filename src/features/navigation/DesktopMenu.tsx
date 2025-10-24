import {
  navigationSelector,
  updateActiveTab,
} from "@/features/navigation/navigationSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  mdiAccountOutline,
  mdiFormatListCheckbox,
  mdiMessageOutline,
  mdiPlusCircleOutline,
  mdiViewDashboardOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";

const DesktopMenu = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(navigationSelector);

  return (
    <div className="sticky w-[25vw] min-w-[280px] h-screen p-4 border-r-1 border-neutral-300 [&_.active]:text-black [&_.active]:bg-neutral-200">
      <div className="mb-10">
        <Link to="/" className="text-xl font-semibold">
          ServiceExchange
        </Link>
      </div>

      <div className="flex flex-col gap-4 text-neutral-700 [&>*]:py-2.5 [&>*]:px-3  [&>*]:rounded-xl [&>*]:flex [&>*]:gap-2 [&>*]:items-center">
        <Link
          to="/"
          onClick={() => dispatch(updateActiveTab("home"))}
          className={activeTab == "home" ? "active" : ""}
        >
          <Icon path={mdiViewDashboardOutline} size={1} />
          <p>Dashboard</p>
        </Link>

        <Link
          to="/listings"
          onClick={() => dispatch(updateActiveTab("listings"))}
          className={activeTab == "listings" ? "active" : ""}
        >
          <Icon path={mdiFormatListCheckbox} size={1} />
          <p>Listings</p>
        </Link>

        <Link
          to="/listings/new"
          onClick={() => dispatch(updateActiveTab("post"))}
          className={activeTab == "post" ? "active" : ""}
        >
          <Icon path={mdiPlusCircleOutline} size={1} />
          <p>Post Need/Offer</p>
        </Link>

        <Link
          to="/chats"
          onClick={() => dispatch(updateActiveTab("chats"))}
          className={activeTab == "chats" ? "active" : ""}
        >
          <Icon path={mdiMessageOutline} size={1} />
          <p>Chat</p>
        </Link>

        <Link
          to="/profile"
          onClick={() => dispatch(updateActiveTab("profile"))}
          className={activeTab == "profile" ? "active" : ""}
        >
          <Icon path={mdiAccountOutline} size={1} />
          <p>Profile</p>
        </Link>
      </div>
    </div>
  );
};

export default DesktopMenu;
