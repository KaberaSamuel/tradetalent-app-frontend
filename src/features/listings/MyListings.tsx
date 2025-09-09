import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import { mdiAccountOutline } from "@mdi/js";
import { useQuery } from "@tanstack/react-query";
import { authSelector } from "../auth/authSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import { fetchActiveListings } from "./api";
import { listingsGridStyles } from "./BrowseListings";
import ListingCard from "./ListingCard";
import Spinner from "@/components/Loader";

export default function MyListings() {
  const auth = useAppSelector(authSelector);
  const { data, isLoading } = useQuery({
    queryKey: ["my-listings"],
    queryFn: () => fetchActiveListings(auth.token.access),
  });

  if (isLoading) {
    return (
      <div className="w-full h-full translate-y-5">
        <Spinner />
      </div>
    );
  }

  if (data) {
    const listingsItems = data.map((listing) => (
      <li key={listing.id}>
        {" "}
        <ListingCard listing={listing} />
      </li>
    ));

    return (
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 justify-between">
          <p className="text-2xl font-semibold">My Active Listings</p>
          <Link
            to="/listings"
            className="py-2 px-4 bg-neutral-200 text-gray-500 font-semibold flex gap-1 items-center rounded-lg"
          >
            <Icon path={mdiAccountOutline} size={0.9} />
            <p>Browse Listings</p>
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
