import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/reduxHooks";
import { authSelector } from "@/features/auth/authSlice";
import { mockReviews } from "@/features/mockData/reviews";
import ProfileImage from "@/features/profile/ProfileImage";
import { formatDistanceToNow } from "date-fns";
import type { ReviewTypes } from "@/App.types";

function getTimePassed(dateString: string): string {
  const inputDate = new Date(dateString);
  return formatDistanceToNow(inputDate, { addSuffix: true });
}

const LatestReview = () => {
  const auth = useAppSelector(authSelector);

  // user reviews
  const reviews = mockReviews.filter(
    (latestReview) => latestReview.revieweeEmail === auth.user.email
  );

  if (reviews.length == 0) {
    return <p>No reviews yet!</p>;
  }

  const latestReview: ReviewTypes = reviews[0];
  const formattedDate = getTimePassed(latestReview.date);

  return (
    <div className="py-2 flex flex-col">
      <div className="mb-4 flex items-center gap-3">
        <ProfileImage size={10} isSmall={true} user={latestReview.user} />
        <p className="font-semibold">{latestReview.user.name}</p>
        <p className="text-neutral-600 text-[1rem]">{formattedDate}</p>
      </div>

      <p className="mb-5">"{latestReview.message}"</p>

      <Link
        to="#"
        className="w-fit self-end py-2 px-4 bg-white text-sm font-semibold border border-neutral-300 rounded-2xl"
      >
        Show all {reviews.length} reviews
      </Link>
    </div>
  );
};

export default LatestReview;
