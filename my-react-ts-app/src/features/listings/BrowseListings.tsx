import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks/reduxHooks";
import { authSelector } from "@/features/auth/authSlice";
import { fetchListings } from "@/features/listings/api";
import FilterBar from "@/features/listings/FilterBar";
import ListingCard from "@/features/listings/ListingCard";

export default function BrowseListings() {
  const auth = useAppSelector(authSelector);
  const { data, isLoading } = useQuery({
    queryKey: ["listings"],
    queryFn: () => fetchListings(auth.token.access),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data) {
    return (
      <div className="flex flex-col gap-5">
        <div className="text-2xl font-semibold">Browse Listings</div>
        <FilterBar />
        <ListingCard listing={data[0]} />
      </div>
    );
  }

  return <p>Error fetching data</p>;
}
