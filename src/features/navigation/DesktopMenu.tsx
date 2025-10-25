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
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { updateSidebarDimensions } from "./dimensionsSlice";

const DesktopMenu = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(navigationSelector);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  // effect to setup function for tracking dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const sidebarDiv = sidebarRef.current;
      if (sidebarDiv) {
        const dimensions = {
          height: sidebarDiv.offsetHeight,
          width: sidebarDiv.offsetWidth,
        };
        dispatch(updateSidebarDimensions(dimensions));
      }
    };

    // get initial dimensions
    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="sticky w-[25vw] min-w-[280px] h-screen p-4 border-r-1 border-neutral-300 [&_.active]:text-black [&_.active]:bg-neutral-200"
    >
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
