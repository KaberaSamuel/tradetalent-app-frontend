import { Outlet, Link } from "react-router-dom";

import Icon from "@mdi/react";
import { mdiPencilRuler, mdiDotsHorizontal, mdiBellOutline } from "@mdi/js";

const PublicPage = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 py-3 px-5 flex justify-between border-b-1 border-neutral-300">
        <Link to="/public" className="flex gap-2 items-center">
          <Icon path={mdiPencilRuler} size={1} />
          <p className="text-xl font-semibold">Service Exchange</p>
        </Link>

        <div className="text-neutral-500 flex gap-3">
          <div className="w-8 h-8 bg-neutral-200 flex justify-center items-center rounded-full">
            <Icon path={mdiDotsHorizontal} size={0.9} />
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default PublicPage;
