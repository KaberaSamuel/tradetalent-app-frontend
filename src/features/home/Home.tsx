import { useAppSelector } from "@/hooks/reduxHooks";
import { authSelector } from "@/features/auth/authSlice";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlus, mdiMagnify } from "@mdi/js";

import ActivityOverview from "@/features/home/ActivityOverview";

const Welcome = () => {
  const auth = useAppSelector(authSelector);
  const username = auth.user.first_name?.toLowerCase();

  return (
    <div className="p-4 sm:py-5 sm:px-6 bg-teal-100 text-teal-500 rounded-xl">
      <h1 className="capitalize text-xl font-semibold mb-4">
        Welcome back, {username}!
      </h1>

      <p className="sm:text-lg mb-5">
        Explore new opportunities or manage your existing skills and needs.
      </p>

      <div className="w-[100%] flex flex-col sm:flex-row gap-3 sm:gap-5 [&>*]:w-[100%] [&>*]:p-2.5 [&>*]:font-semibold [&>*]:flex [&>*]:justify-center [&>*]:items-center [&>*]:gap-2 [&>*]:rounded-xl">
        <Link to="/listings/new" className="bg-teal-500 text-white">
          <Icon path={mdiPlus} size={1} />
          <p>Post New Listing</p>
        </Link>
        <Link to="#" className="bg-neutral-200 text-neutral-500">
          <Icon path={mdiMagnify} size={1} />
          <p>Browse Listings</p>
        </Link>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col gap-10">
      <Welcome />
      <ActivityOverview />
    </div>
  );
};

export default Home;
