import { authSelector } from "@/features/auth/authSlice";
import { updateActiveTab } from "@/features/navigation/navigationSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  mdiEyeOutline,
  mdiFormatListCheckbox,
  mdiMessageOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";

const ActivityOverview = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(authSelector);

  const cardsContainerStyles = "grid grid-cols-1 lg:grid-cols-2 gap-6 ";
  const cardStyles =
    "h-50  p-5 bg-neutral-50 flex justify-between border border-neutral-300 rounded-2xl ";
  const leftStyles = "font-semibold grid grid-rows-2";
  const rightStyles = "text-teal-500 flex flex-col justify-between items-end ";
  const numberStyles = "text-3xl transform -translate-y-2";

  return (
    <div>
      <h1 className="text-xl font-semibold mb-7">Your Activity Overview</h1>

      {/* cards */}
      <div className={cardsContainerStyles}>
        {/* active listings */}
        <div className={cardStyles}>
          <div className={leftStyles}>
            <p>Active Listings</p>
            <p className={numberStyles}>{auth.user.my_listings_count}</p>
          </div>

          <div className={rightStyles}>
            <Icon path={mdiFormatListCheckbox} size={1} />
            <Link
              to="/my-listings"
              onClick={() => {
                dispatch(updateActiveTab("listings"));
              }}
            >
              View My Listings
            </Link>
          </div>
        </div>

        {/* new messages */}
        <div className={cardStyles}>
          <div className={leftStyles}>
            <p>New Messages</p>
            <p className={numberStyles}>0</p>
          </div>

          <div className={rightStyles}>
            <Icon path={mdiMessageOutline} size={1} />
            <Link
              to="/chats"
              onClick={() => {
                dispatch(updateActiveTab("chats"));
              }}
            >
              Go to Messages
            </Link>
          </div>
        </div>

        {/* profile views */}
        <div className={cardStyles}>
          <div className={leftStyles}>
            <p>Profile Views</p>
            <p className={numberStyles}>0</p>
          </div>

          <div className={rightStyles}>
            <Icon path={mdiEyeOutline} size={1} />
            <Link
              to="/profile"
              onClick={() => {
                dispatch(updateActiveTab("profile"));
              }}
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityOverview;
