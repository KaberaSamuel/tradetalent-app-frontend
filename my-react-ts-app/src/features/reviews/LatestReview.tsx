import { Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/reduxHooks";
import { authSelector } from "@/features/auth/authSlice";
import { mockReviews } from "@/features/mockData/reviews";
import ProfileImage from "@/features/profile/ProfileImage";
import type { ReviewTypes } from "@/App.types";

function getTimePassed(dateString: string): string {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const MS_PER_WEEK = MS_PER_DAY * 7;
  const MS_PER_MONTH = MS_PER_DAY * (365.25 / 12);
  const MS_PER_YEAR = MS_PER_DAY * 365.25; // 365.25 to account for leap years

  const inputDate = new Date(dateString);
  const now = new Date();

  const timeDifferenceMs = now.getTime() - inputDate.getTime();

  // return empty string for invalid dates
  if (isNaN(timeDifferenceMs) || timeDifferenceMs < 0) {
    return "";
  }

  // Calculate the differences in days, weeks, months, and years.
  const daysDifference = Math.floor(timeDifferenceMs / MS_PER_DAY);
  const weeksDifference = Math.floor(timeDifferenceMs / MS_PER_WEEK);
  const monthsDifference = Math.floor(timeDifferenceMs / MS_PER_MONTH);
  const yearsDifference = Math.floor(timeDifferenceMs / MS_PER_YEAR);

  // Determine the appropriate time level and return the formatted string.
  if (daysDifference < 1) {
    return "Today";
  } else if (daysDifference < 7) {
    const daysText = daysDifference === 1 ? "day" : "days";
    return `${daysDifference} ${daysText} ago`;
  } else if (weeksDifference < 4) {
    const weeksText = weeksDifference === 1 ? "week" : "weeks";
    return `${weeksDifference} ${weeksText} ago`;
  } else if (monthsDifference < 12) {
    const monthsText = monthsDifference === 1 ? "month" : "months";
    return `${monthsDifference} ${monthsText} ago`;
  } else {
    const yearsText = yearsDifference === 1 ? "year" : "years";
    return `${yearsDifference} ${yearsText} ago`;
  }
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
    <div className="py-2">
      <div className="mb-4 flex items-center gap-3">
        <ProfileImage isSmall={true} user={latestReview.user} />
        <p className="font-semibold">{latestReview.user.name}</p>
        <p className="text-neutral-600 text-[1rem]">{formattedDate}</p>
      </div>
      <p>"{latestReview.message}"</p>
      <Link
        to="#"
        className="absolute bottom-5 right-5 w-fit py-2 px-4 bg-white text-sm font-semibold border border-neutral-300 rounded-2xl"
      >
        Show all {reviews.length} reviews
      </Link>
    </div>
  );
};

export default LatestReview;
