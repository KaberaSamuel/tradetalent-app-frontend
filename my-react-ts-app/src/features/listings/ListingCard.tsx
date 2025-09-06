import Icon from "@mdi/react";
import { mdiMapMarkerOutline, mdiWeb } from "@mdi/js";
import type { ListingTypes } from "@/App.types";
import TagItems from "@/components/TagItems";

interface Props {
  listing: ListingTypes;
}

export default function ListingCard({ listing }: Props) {
  const coveredskills = listing.skills.split(",");
  const lastNameInitial = " " + listing.user.name_initials?.slice(1) || "";
  return (
    <div className="w-100 p-4 bg-neutral-100 flex flex-col gap-2 border-2 border-neutral-200 rounded-xl">
      {/* title */}
      <div className="capitalize">
        <p className="font-semibold leading-tight">
          {listing.type + ": " + listing.title}
        </p>
      </div>

      {/* poster */}
      <p className="text-sm text-gray-500">
        Posted by {listing.user.first_name + lastNameInitial + ", "}{" "}
        {listing.delta_time}
      </p>

      {/* description */}
      <p className="my-2">{listing.description}</p>

      {/* covered skills */}
      <TagItems items={coveredskills} fallback="No skills specified yet!" />

      {/* footer */}
      <div className="mt-1 flex gap-5">
        <p className="w-fit py-2 px-4 bg-teal-500 text-white font-semibold rounded-xl">
          View Details
        </p>

        <div className="text-gray-500 capitalize flex gap-1 items-center">
          {listing.work_mode === "remote" ? (
            <Icon path={mdiWeb} size={0.8} />
          ) : (
            <Icon path={mdiMapMarkerOutline} size={0.8} />
          )}

          <p>{listing.work_mode}</p>
        </div>
      </div>
    </div>
  );
}
