import useMediaQuery from "@/hooks/useMediaQuery";
import { mdiMapMarkerOutline, mdiPencilOutline } from "@mdi/js";
import Icon from "@mdi/react";
import ButtonToConversation from "@/features/chat/ButtonToConversation";
import { Link } from "react-router-dom";

import type { UserTypes } from "@/App.types";
import ProfileImage from "@/features/profile/ProfileImage";
import ReviewsSummary from "@/features/reviews/ReviewsSummary";

interface Props {
  user: UserTypes;
  isLoggedIn: boolean;
}

const DesktopHero = ({ user, isLoggedIn }: Props) => {
  const iconSize = 0.9;
  const buttonStyles =
    "min-w-fit py-2 px-3 font-semibold flex items-center gap-2 rounded-lg";

  return (
    <div className="pb-5 flex items-center gap-7 border-b-1 border-neutral-300">
      <ProfileImage size={25} isSmall={false} user={user} />

      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className="lg:flex lg:items-center lg:gap-3">
            <p className="text-2xl">{user.name}</p>
            {isLoggedIn && (
              <p className="-z-10! w-fit py-1 px-3 bg-neutral-200 text-neutral-500 text-sm translate-y-1 rounded-full">
                You
              </p>
            )}
          </div>

          <div className="text-neutral-500 flex items-center gap-1">
            <Icon path={mdiMapMarkerOutline} size={1} />
            <p>{user.location || "No location yet"}</p>
          </div>

          <ReviewsSummary user={user} />
        </div>

        {isLoggedIn ? (
          <Link
            to="edit"
            className={buttonStyles + " border border-neutral-300"}
          >
            <Icon path={mdiPencilOutline} size={iconSize} />
            <p className="text-sm">Edit Profile</p>
          </Link>
        ) : (
          <ButtonToConversation otherUser={user} iconSize={1} />
        )}
      </div>
    </div>
  );
};

const MobileHero = ({ user, isLoggedIn }: Props) => {
  return (
    <div className="pb-5 flex items-center gap-4 sm:gap-7 border-b-1 border-neutral-300">
      <div className="flex flex-col gap-3 items-center">
        <ProfileImage size={20} isSmall={false} user={user} />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <p className="text-base md:text-2xl">{user.name}</p>
          {isLoggedIn && (
            <p className="-z-10 w-fit py-1 px-3 bg-neutral-200 text-neutral-500 text-xs translate-y-1 rounded-full">
              You
            </p>
          )}
        </div>

        <div className="text-neutral-500 flex items-center gap-1">
          <Icon path={mdiMapMarkerOutline} size={0.8} />
          <p>{user.location || "No location yet"}</p>
        </div>

        <ReviewsSummary user={user} />
      </div>
    </div>
  );
};

const Hero = ({ user, isLoggedIn }: Props) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  if (isMobile) return <MobileHero user={user} isLoggedIn={isLoggedIn} />;

  return <DesktopHero user={user} isLoggedIn={isLoggedIn} />;
};

export default Hero;
