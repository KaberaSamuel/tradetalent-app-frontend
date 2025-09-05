import type { ListingTypes } from "@/App.types";

interface Props {
  listing: ListingTypes;
}

export default function ListingCard({ listing }: Props) {
  return <div> {listing.title}</div>;
}
