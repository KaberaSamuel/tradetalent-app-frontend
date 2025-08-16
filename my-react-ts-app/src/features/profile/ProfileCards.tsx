import { useAppSelector } from "../../hooks/reduxHooks";
import { authSelector } from "../auth/authSlice";
import LatestReview from "../reviews/LatestReview";

const ServicesItems = ({ items }: { items: string[] }) => {
  const validatedArray = items.filter((item) => item != "");

  if (validatedArray.length > 0) {
    return (
      <div className="text-sm flex flex-wrap gap-3 mt-5">
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

      <div>
        <p className="title">Services Needed</p>
        <ServicesItems items={servicesNeeded} />
      </div>

      <div>
        <p className="title">Services Offered</p>
        <ServicesItems items={servicesOffered} />
      </div>

      <div className="relative">
        <p className="title">Latest Review</p>
        <LatestReview />
      </div>
    </div>
  );
};

export default ProfileCards;
