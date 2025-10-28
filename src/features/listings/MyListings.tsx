import { Link } from "react-router-dom";
import { mdiSearchWeb } from "@mdi/js";
import { useQuery } from "@tanstack/react-query";
import { authSelector } from "../auth/authSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import { fetchActiveListings } from "./api";
import { listingsGridStyles } from "./BrowseListings";
import { Spinner } from "@/components/Loader";
import Icon from "@mdi/react";
import ListingCard from "./ListingCard";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function MyListings() {
  const auth = useAppSelector(authSelector);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data, isLoading } = useQuery({
    queryKey: ["my-listings"],
    queryFn: () => fetchActiveListings(auth.token.access),
  });

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Spinner />
      </div>
    );
  }

  if (data) {
    const listingsItems = data.map((listing) => (
      <li key={listing.id}>
        {" "}
        <ListingCard listing={listing} isOwner={true} />
      </li>
    ));

    return (
      <div className="flex flex-col gap-5">
        <div className="flex sm:gap-2 justify-between">
          <p className="text-lg sm:text-2xl font-semibold">My Listings</p>
          <Link
            to="/listings"
            className="py-1.5 px-2 sm:px-4 bg-neutral-200 text-gray-500 font-semibold flex gap-1 items-center rounded-lg"
          >
            <Icon path={mdiSearchWeb} size={isMobile ? 0.8 : 0.9} />
            <p className="text-sm sm:text-base">Browse Listings</p>
          </Link>
        </div>
        {data.length ? (
          <ul className={listingsGridStyles}>{listingsItems}</ul>
        ) : (
          <div className="h-[55vh] flex justify-center items-center">
            <p>You haven't posted any listing yet!</p>
          </div>
        )}
      </div>
    );
  }

  return <p>Error fetching data</p>;
}
