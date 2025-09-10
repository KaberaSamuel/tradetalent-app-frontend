import Icon from "@mdi/react";
import {
  mdiEyeOutline,
  mdiMapMarkerOutline,
  mdiWeb,
  mdiSquareEditOutline,
} from "@mdi/js";
import { Link } from "react-router-dom";
import type { ListingTypes } from "@/App.types";
import TagItems from "@/components/TagItems";

interface Props {
  listing: ListingTypes;
  isOwner?: boolean;
}

export default function ListingCard({ listing, isOwner }: Props) {
  const coveredskills = listing.skills.split(",");
  const lastNameInitial = " " + listing.user.name_initials?.slice(1) || "";

  let poster;
  let footer;
  const viewDetails = (
    <Link
      to="#"
      className="w-fit py-2 px-4 bg-teal-500 text-white text-sm font-semibold flex gap-2 items-center rounded-xl"
    >
      <Icon path={mdiEyeOutline} size={0.8} />
      <p>View Details</p>
    </Link>
  );

  if (isOwner) {
    poster = (
      <p className="text-sm text-gray-500">Posted {listing.delta_time}</p>
    );

    footer = (
      <div className="mt-2 flex gap-5 items-center">
        {viewDetails}

        <Link
          to="#"
          className="py-1.5 px-4 bg-white  flex gap-2 items-center border border-neutral-200 rounded-xl"
        >
          <Icon path={mdiSquareEditOutline} size={0.8} />
          <p>Edit</p>
        </Link>

        <Link
          to="#"
          className="py-1.5 px-4 bg-red-500 text-white  flex gap-2 items-center rounded-xl"
        >
          <Icon path={mdiSquareEditOutline} size={0.8} />
          <p>Delete</p>
        </Link>
      </div>
    );
  } else {
    poster = (
      <p className="text-sm text-gray-500">
        Posted by {listing.user.first_name + lastNameInitial + ", "}
        {listing.delta_time}
      </p>
    );

    footer = (
      <div className="mt-2 text-gray-500 capitalize flex gap-5 items-center">
        {viewDetails}

        <div className="flex gap-1 items-center">
          {listing.work_mode === "remote" ? (
            <Icon path={mdiWeb} size={0.8} />
          ) : (
            <Icon path={mdiMapMarkerOutline} size={0.8} />
          )}

          <p>{listing.work_mode}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-4 bg-neutral-100 flex flex-col gap-2 border-2 border-neutral-200 rounded-xl">
      {/* title */}
      <div className="capitalize">
        <p className="font-semibold leading-tight">
          {listing.type + ": " + listing.title}
        </p>
      </div>

      {/* poster */}
      {poster}

      {/* description */}
      <p className="my-2">{listing.description}</p>

      {/* covered skills */}
      <TagItems items={coveredskills} fallback="No skills specified yet!" />

      {/* footer */}
      {footer}
    </div>
  );
}
