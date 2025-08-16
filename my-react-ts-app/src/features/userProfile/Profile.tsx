import { useAppSelector } from "../../hooks/reduxHooks";
import { authSelector } from "../auth/authSlice";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPencilOutline, mdiMapMarkerOutline } from "@mdi/js";

import ReviewsSummary from "../reviews/ReviewsSummary";
import ProfileImage from "./ProfileImage";
import LatestReview from "../reviews/LatestReview";

const ServicesItems = ({ items }: { items: string[] }) => {
  const validatedArray = items.filter((item) => item != "");

  if (validatedArray.length > 0) {
    return (
      <div className="text-base flex flex-wrap gap-3 mt-5">
        {validatedArray.map((item) => (
          <p
            key={item}
            className="w-fit py-2 px-4 bg-teal-100 text-teal-500 rounded-xl"
          >
            {item}
          </p>
        ))}
      </div>
    );
  }

  return <div>No posted services yet</div>;
};

const Cards = () => {
  const auth = useAppSelector(authSelector);
  const servicesNeeded = auth.user.services_needed.split(",");
  const servicesOffered = auth.user.services_offered.split(",");

  const cardStyles =
    "[&>*]:min-h-60 [&>*]:py-4 [&>*]:px-5 [&>*]:bg-neutral-50 [&>*]:text-lg [&>*]:border [&>*]:border-neutral-200 [&>*]:rounded-2xl [&_.title]:text-xl [&_.title]:font-semibold [&_.title]:mb-4";

  return (
    <div className={"grid grid-cols-1 xl:grid-cols-2 gap-7 " + cardStyles}>
      <div>
        <p className="title">
          About {auth.user.first_name || "No location yet"}
        </p>
        <p>{auth.user.about || "No description yet"}</p>
      </div>

      <div>
        <p className="title">Services Needed</p>
        <ServicesItems items={servicesNeeded} />
      </div>

      <div>
        <p className="title">Services Offered</p>
        <ServicesItems items={servicesOffered} />
      </div>

      <div>
        <p className="title">Latest Review</p>
        <LatestReview />
      </div>
    </div>
  );
};

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

      <Cards />
    </div>
  );
};

export default Profile;
