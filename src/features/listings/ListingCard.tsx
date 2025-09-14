import { useState } from "react";
import {
  mdiEyeOutline,
  mdiMapMarkerOutline,
  mdiWeb,
  mdiSquareEditOutline,
  mdiTrashCanOutline,
} from "@mdi/js";
import { Link } from "react-router-dom";
import type { ListingTypes } from "@/App.types";
import TagItems from "@/components/TagItems";
import Icon from "@mdi/react";
import DeleteListing from "../modals/DeleteListing";
import { AnimatePresence } from "framer-motion";

interface Props {
  listing: ListingTypes;
  isOwner?: boolean;
  updateDeleteStatus?: (isDelete: boolean) => void;
}

export default function ListingCard({ listing, isOwner }: Props) {
  const [isDelete, setIsDelete] = useState(false);
  const updateDeleteStatus = (isDelete: boolean) => {
    setIsDelete(isDelete);
  };

  const coveredskills = listing.skills.split(",");
  const lastNameInitial = " " + listing.user.name_initials?.slice(1) || "";

  let poster;
  let footer;
  const linkStyles =
    "py-1.5 px-3 text-xs sm:text-sm flex gap-2 items-center whitespace-nowrap border border-neutral-200 rounded-xl ";

  const viewDetails = (
    <Link
      to={"/listings/" + listing.slug}
      className={linkStyles + "bg-teal-500 text-white"}
    >
      <Icon path={mdiEyeOutline} size={0.8} />
      <p>View Details</p>
    </Link>
  );

  if (isOwner) {
    poster = (
      <p className="text-xs sm:text-sm text-gray-500">
        Posted {listing.delta_time}
      </p>
    );

    footer = (
      <div className="mt-2 flex flex-wrap gap-2 sm:gap-5 items-center">
        {viewDetails}

        <Link
          to={"/listings/" + listing.slug + "/edit"}
          className={linkStyles + "bg-white"}
        >
          <Icon path={mdiSquareEditOutline} size={0.8} />
          <p>Edit</p>
        </Link>

        <div
          onClick={() => {
            updateDeleteStatus?.(true);
          }}
          className={linkStyles + " bg-red-500 text-white"}
        >
          <Icon path={mdiTrashCanOutline} size={0.8} />
          <p>Delete</p>
        </div>
      </div>
    );
  } else {
    poster = (
      <p className="text-xs sm:text-sm text-gray-500">
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
    <div className="h-full p-4 bg-neutral-100 text-sm sm:text-base flex flex-col gap-2 border-2 border-neutral-200 rounded-xl">
      {/* title */}
      <div className="capitalize">
        <p className="text-base font-semibold leading-tight">
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

      <AnimatePresence>
        {isDelete && (
          <DeleteListing
            updateDeleteStatus={updateDeleteStatus}
            listing={listing}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
