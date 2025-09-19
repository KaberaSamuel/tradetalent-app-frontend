import { Link, Outlet } from "react-router-dom";

import { mdiPencilRuler } from "@mdi/js";
import Icon from "@mdi/react";

const PublicPage = () => {
  return (
    <div>
      <nav className="z-10 fixed top-0 left-0 right-0 py-3 px-5 bg-white flex justify-between border-b-1 border-neutral-300">
        <Link to="/public" className="flex gap-2 items-center">
          <Icon path={mdiPencilRuler} size={1} />
          <p className="text-xl font-semibold">Service Exchange</p>
        </Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default PublicPage;
