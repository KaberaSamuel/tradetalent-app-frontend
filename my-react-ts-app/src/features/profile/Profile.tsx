import { useAppSelector } from "../../hooks/reduxHooks";
import { authSelector } from "../auth/authSlice";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPencilOutline, mdiMapMarkerOutline } from "@mdi/js";

import ReviewsSummary from "../reviews/ReviewsSummary";
import ProfileImage from "./ProfileImage";
import ProfileCards from "./ProfileCards";

const Profile = () => {
  const auth = useAppSelector(authSelector);

  return (
    <div className="flex flex-col gap-7">
      <div className="pb-5 flex items-center gap-7 border-b-1 border-neutral-300">
        <ProfileImage isSmall={false} user={auth.user} />

        <div className="w-full flex items-center justify-between">
          <div className="text-lg flex flex-col gap-4">
            <div className="lg:flex lg:items-center lg:gap-3">
              <p className="text-3xl">{auth.user.name}</p>
              <p className="w-fit py-1 px-3 bg-neutral-200 text-neutral-500 text-sm translate-y-1 rounded-full">
                You
              </p>
            </div>

            <div className="text-neutral-500 flex items-center gap-1">
              <Icon path={mdiMapMarkerOutline} size={1} />
              <p>{auth.user.location || "No location yet"}</p>
            </div>

            <ReviewsSummary user={auth.user} />
          </div>

          <Link
            to="edit"
            className="min-w-fit py-2 px-3 font-semibold flex items-center gap-2 border border-neutral-300 rounded-lg"
          >
            <Icon path={mdiPencilOutline} size={1} />
            <p>Edit Profile</p>
          </Link>
        </div>
      </div>

      <div>
        <p className="text-neutral-500">
          Update your info, services, and more. Click "Edit profile" to start
        </p>
      </div>

      <ProfileCards />
    </div>
  );
};

export default Profile;
