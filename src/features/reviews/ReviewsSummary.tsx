import Icon from "@mdi/react";
import { mockReviews } from "@/features/mockData/reviews";
import type { UserTypes, ReviewTypes } from "@/App.types";
import { mdiStarOutline } from "@mdi/js";
import useMediaQuery from "@/hooks/useMediaQuery";

const ReviewsSummary = ({ user }: { user: UserTypes }) => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  // user reviews
  const reviews = mockReviews.filter(
    (review) => review.revieweeEmail === user.email
  );

  const styles = "text-amber-500 items-center flex gap-1";

  if (reviews.length == 0) {
    return (
      <div className={styles}>
        <Icon path={mdiStarOutline} size={1} />
        <p>No reviews yet</p>
      </div>
    );
  }

  const totalRatings = reviews.reduce(
    (accumulator: number, currentValue: ReviewTypes) => {
      return accumulator + currentValue.rating;
    },
    0
  );

  const averageRating = (totalRatings / reviews.length).toFixed(1);

  return (
    <div className={styles}>
      <Icon path={mdiStarOutline} size={isMobile ? 0.8 : 1} />
      <p className="text-black font-semibold">{averageRating}</p>
      <p>({reviews.length} Reviews)</p>
    </div>
  );
};

export default ReviewsSummary;
