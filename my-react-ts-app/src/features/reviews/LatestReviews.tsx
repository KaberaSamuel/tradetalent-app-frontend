import { useAppSelector } from "../../hooks/reduxHooks";
import { authSelector } from "../auth/authSlice";
import { mockReviews } from "../mockData/reviews";
import ProfileImage from "../userProfile/ProfileImage";

const LatestReviews = () => {
  const auth = useAppSelector(authSelector);

  // get latest review
  const reviews = mockReviews
    .filter((review) => review.revieweeEmail === auth.user.email)
    .slice(0, 1);
  const reviewStyles = "py-3";

  if (!reviews.length) {
    return <p>No reviews yet</p>;
  }

  return (
    <div>
      {reviews.map((review, index) => (
        <div
          key={review.id}
          className={
            index < reviews.length - 1
              ? "border-b border-neutral-300 " + reviewStyles
              : reviewStyles
          }
        >
          <div className="flex items-center gap-3">
            <ProfileImage isSmall={true} user={review.user} />
            <p className="font-semibold">{review.user.name}</p>
            <p className="text-neutral-600 text-[1rem]">{review.date}</p>
          </div>
          <p className="mt-5">"{review.message}"</p>
        </div>
      ))}
    </div>
  );
};

export default LatestReviews;
