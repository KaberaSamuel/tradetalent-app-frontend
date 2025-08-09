import { Link } from "react-router-dom";

import Icon from "@mdi/react";
import {
  mdiViewDashboardOutline,
  mdiFormatListCheckbox,
  mdiMessageOutline,
  mdiAccountOutline,
  mdiPlusCircleOutline,
} from "@mdi/js";

const Sidebar = () => {
  return (
    <div className="w-[21vw] min-h-screen p-4 border-r-2 border-neutral-200">
      <div className="mb-8">
        <Link to="/" className="text-xl font-semibold">
          TradeTalentApp
        </Link>
      </div>

      <div className="flex flex-col gap-2 text-neutral-700 [&>*]:p-2.5 [&>*]:rounded-md [&>*]:flex [&>*]:gap-2 [&>*]:items-center">
        <div className="text-black bg-neutral-200">
          <Icon path={mdiViewDashboardOutline} size={1} />
          <p>Dashboard</p>
        </div>

        <div>
          <Icon path={mdiFormatListCheckbox} size={1} />
          <p>Listings</p>
        </div>

        <div>
          <Icon path={mdiMessageOutline} size={1} />
          <p>Messages</p>
        </div>

        <div>
          <Icon path={mdiAccountOutline} size={1} />
          <p>Profile</p>
        </div>

        <div>
          <Icon path={mdiPlusCircleOutline} size={1} />
          <p>Post a Skill/Need</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
