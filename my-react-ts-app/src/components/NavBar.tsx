import { Link } from "react-router-dom";

import Icon from "@mdi/react";
import {
  mdiViewDashboardOutline,
  mdiFormatListCheckbox,
  mdiMessageOutline,
  mdiAccountOutline,
  mdiPlusCircleOutline,
} from "@mdi/js";

const NavBar = () => {
  return (
    <div className="w-[30vw] min-h-screen p-4 border-r-1 border-neutral-300">
      <div className="mb-8">
        <Link to="/" className="text-xl font-semibold">
          TradeTalentApp
        </Link>
      </div>

      <div className="flex flex-col gap-2 text-neutral-700 [&>*]:py-2.5 [&>*]:px-3  [&>*]:rounded-xl [&>*]:flex [&>*]:gap-2 [&>*]:items-center">
        <Link to="/" className="text-black bg-neutral-200">
          <Icon path={mdiViewDashboardOutline} size={1} />
          <p>Dashboard</p>
        </Link>

        <Link to="/listings">
          <Icon path={mdiFormatListCheckbox} size={1} />
          <p>Listings</p>
        </Link>

        <Link to="/messages">
          <Icon path={mdiMessageOutline} size={1} />
          <p>Messages</p>
        </Link>

        <Link to="/profile">
          <Icon path={mdiAccountOutline} size={1} />
          <p>Profile</p>
        </Link>

        <Link to="/new">
          <Icon path={mdiPlusCircleOutline} size={1} />
          <p>Post a Skill/Need</p>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
