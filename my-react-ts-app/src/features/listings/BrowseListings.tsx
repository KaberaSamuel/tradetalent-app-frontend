import { useState } from "react";
import Icon from "@mdi/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { mdiAccountOutline } from "@mdi/js";
import { useAppSelector } from "@/hooks/reduxHooks";
import { authSelector } from "@/features/auth/authSlice";
import { fetchListings } from "@/features/listings/api";
import FilterBar from "@/features/listings/FilterBar";
import ListingCard from "@/features/listings/ListingCard";
import type { ListingTypes } from "@/App.types";

export const listingsGridStyles = "grid xl:grid-cols-2 gap-5 items-stretch";

function getFilteredListings(listings: ListingTypes[], activeFilter: string) {
  if (activeFilter === "onsite") {
    return listings.filter((listing) => listing.work_mode === "onsite");
  }

  if (activeFilter === "hybrid") {
    return listings.filter((listing) => listing.work_mode === "hybrid");
  }

  if (activeFilter === "remote") {
    return listings.filter((listing) => listing.work_mode === "remote");
  }

  if (activeFilter === "offers") {
    return listings.filter((listing) => listing.type === "offer");
  }

  if (activeFilter === "needs") {
    return listings.filter((listing) => listing.type === "need");
  }

  return listings;
}

export default function BrowseListings() {
  const auth = useAppSelector(authSelector);
  const [activeFilter, setActiveFilter] = useState("all");
  const { data, isLoading } = useQuery({
    queryKey: ["browse-listings"],
    queryFn: () => fetchListings(auth.token.access),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data) {
    let listings: ListingTypes[] = getFilteredListings(data, activeFilter);

    const listingsItems = listings.map((listing) => (
      <li key={listing.id}>
        {" "}
        <ListingCard listing={listing} />
      </li>
    ));

    const updateFilter = (filter: string) => {
      setActiveFilter(filter);
    };

    return (
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 justify-between">
          <p className="text-2xl font-semibold">Browse Listings</p>
          <Link
            to="/my-listings"
            className="py-2 px-4 bg-neutral-200 text-gray-500 text-sm font-semibold flex gap-1 items-center rounded-lg"
          >
            <Icon path={mdiAccountOutline} size={0.9} />
            <p>My Listings</p>
          </Link>
        </div>

        <FilterBar activeFilter={activeFilter} updateFilter={updateFilter} />

        {listings.length ? (
          <ul className={listingsGridStyles}>{listingsItems}</ul>
        ) : (
          <div className="h-[45vh] flex justify-center items-center">
            <p>No listings here yet!</p>
          </div>
        )}
      </div>
    );
  }

  return <p>Error fetching data</p>;
}
