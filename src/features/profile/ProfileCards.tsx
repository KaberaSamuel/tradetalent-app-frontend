import Icon from "@mdi/react";
import { mdiPencilOutline, mdiMessageOutline } from "@mdi/js";
import { Link } from "react-router-dom";
import useMediaQuery from "@/hooks/useMediaQuery";
import LatestReview from "@/features/reviews/LatestReview";
import TagItems from "@/components/TagItems";
import type { UserTypes } from "@/App.types";

interface Props {
  isLoggedIn: boolean;
  user: UserTypes;
}

const ProfileCards = ({ isLoggedIn, user }: Props) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const servicesNeeded = user.services_needed.split(",");
  const servicesOffered = user.services_offered.split(",");

  const titleStyles =
    " text-base sm:[&_.title]:text-xl [&_.title]:font-semibold [&_.title]:mb-4";
  const cardStyles =
    "[&>*]:min-h-45 md[&>*]:min-h-60 [&>*]:p-3 sm:[&>*]:py-4 sm:[&>*]:px-5 [&>*]:bg-neutral-50 [&>*]:border [&>*]:border-neutral-200 [&>*]:rounded-xl " +
    titleStyles;
  const buttonStyles =
    "w-fit py-2 px-4 bg-teal-500 text-white font-semibold flex items-center gap-2 rounded-lg";

  return (
    <div
      className={
        "text-sm sm:text-base grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-7 " +
        cardStyles
      }
    >
      <div>
        <p className="title">About {user.first_name || "No location yet"}</p>
        <p>{user.about || "No description yet"}</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="title">Services Needed</p>
        <TagItems items={servicesNeeded} fallback={"Nothing here yet!"} />
      </div>

      <div className="flex flex-col gap-2">
        <p className="title">Services Offered</p>
        <TagItems items={servicesOffered} fallback={"Nothing here yet!"} />
      </div>

      <div className="relative">
        <p className="title">Latest Review</p>
        <LatestReview />
      </div>

      {isMobile &&
        (isLoggedIn ? (
          <div className="unset-styles">
            <Link to="/profile/edit" className={buttonStyles}>
              <Icon path={mdiPencilOutline} size={1} />
              <p>Edit Profile</p>
            </Link>
          </div>
        ) : (
          <div className="unset-styles">
            <Link to="/messages" className={buttonStyles}>
              <Icon path={mdiMessageOutline} size={0.8} />
              <p>Message {user.first_name}</p>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ProfileCards;
