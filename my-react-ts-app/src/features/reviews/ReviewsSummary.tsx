import Icon from "@mdi/react";
import { mockReviews } from "../mockData/reviews";
import type { UserTypes, ReviewTypes } from "../../App.types";
import { mdiStarOutline } from "@mdi/js";

const ReviewsSummary = ({ user }: { user: UserTypes }) => {
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
      <Icon path={mdiStarOutline} size={1} />
      <p className="text-black font-semibold">{averageRating}</p>
      <p>({reviews.length} Reviews)</p>
    </div>
  );
};

export default ReviewsSummary;
