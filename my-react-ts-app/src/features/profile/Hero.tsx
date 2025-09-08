import { useAppSelector } from "@/hooks/reduxHooks";
import { authSelector } from "@/features/auth/authSlice";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPencilOutline, mdiMapMarkerOutline } from "@mdi/js";
import useMediaQuery from "@/hooks/useMediaQuery";

import ReviewsSummary from "@/features/reviews/ReviewsSummary";
import ProfileImage from "@/features/profile/ProfileImage";
import type { UserTypes } from "@/App.types";

const DesktopHero = ({ user }: { user: UserTypes }) => {
  return (
    <div className="pb-5 flex items-center gap-7 border-b-1 border-neutral-300">
      <ProfileImage isSmall={false} user={user} />

      <div className="w-full flex items-center justify-between">
        <div className="text-lg flex flex-col gap-2 sm:gap-4">
          <div className="lg:flex lg:items-center lg:gap-3">
            <p className="text-3xl">{user.name}</p>
            <p className="w-fit py-1 px-3 bg-neutral-200 text-neutral-500 text-sm translate-y-1 rounded-full">
              You
            </p>
          </div>

          <div className="text-neutral-500 flex items-center gap-1">
            <Icon path={mdiMapMarkerOutline} size={1} />
            <p>{user.location || "No location yet"}</p>
          </div>

          <ReviewsSummary user={user} />
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
  );
};

const MobileHero = ({ user }: { user: UserTypes }) => {
  return (
    <div className="pb-5 flex items-center gap-7 border-b-1 border-neutral-300">
      <div className="flex flex-col gap-3 items-center">
        <ProfileImage isSmall={false} user={user} />
        <Link to="edit">
          <p className="underline text-gray-500">Edit Profile</p>
        </Link>
      </div>

      <div className="md:text-lg flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <p className="text-2xl md:text-3xl">{user.name}</p>
          <p className="w-fit py-1 px-3 bg-neutral-200 text-neutral-500 text-sm translate-y-1 rounded-full">
            You
          </p>
        </div>

        <div className="text-neutral-500 flex items-center gap-1">
          <Icon path={mdiMapMarkerOutline} size={1} />
          <p>{user.location || "No location yet"}</p>
        </div>

        <ReviewsSummary user={user} />
      </div>
    </div>
  );
};

const Hero = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const auth = useAppSelector(authSelector);

  if (isMobile) return <MobileHero user={auth.user} />;

  return <DesktopHero user={auth.user} />;
};

export default Hero;
