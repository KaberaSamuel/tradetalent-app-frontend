import { useAppSelector } from "@/hooks/reduxHooks";
import { authSelector } from "@/features/auth/authSlice";
import LatestReview from "@/features/reviews/LatestReview";
import TagItems from "@/components/TagItems";

const ProfileCards = () => {
  const auth = useAppSelector(authSelector);
  const servicesNeeded = auth.user.services_needed.split(",");
  const servicesOffered = auth.user.services_offered.split(",");

  const cardStyles =
    "[&>*]:min-h-60 [&>*]:py-4 [&>*]:px-5 [&>*]:bg-neutral-50 [&>*]:border [&>*]:border-neutral-200 [&>*]:rounded-2xl [&_.title]:text-xl [&_.title]:font-semibold [&_.title]:mb-4";

  return (
    <div className={"grid grid-cols-1 xl:grid-cols-2 gap-7 " + cardStyles}>
      <div>
        <p className="title">
          About {auth.user.first_name || "No location yet"}
        </p>
        <p>{auth.user.about || "No description yet"}</p>
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
    </div>
  );
};

export default ProfileCards;
