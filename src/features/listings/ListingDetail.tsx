import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchListingDetail } from "./api";
import { useAppSelector } from "@/hooks/reduxHooks";
import { authSelector } from "../auth/authSlice";
import { Spinner } from "@/components/Loaders";

export default function ListingDetail() {
  const { listing_slug } = useParams();
  const auth = useAppSelector(authSelector);

  const { data, isLoading } = useQuery({
    queryKey: [listing_slug],
    queryFn: () => fetchListingDetail(auth.token.access, listing_slug!),
  });

  if (isLoading) {
    return (
      <div className="w-full h-full -translate-y-10 flex flex-col gap">
        <Spinner />
      </div>
    );
  }

  if (data) {
    return <div>{data.description}</div>;
  }

  return (
    <div>
      <p>Error fetching listing details try again</p>
    </div>
  );
}
