import Icon from "@mdi/react";
import { mdiMapMarkerOutline, mdiMonitor } from "@mdi/js";
import type { ListingTypes } from "@/App.types";

interface Props {
  listing: ListingTypes;
}

export default function ListingCard({ listing }: Props) {
  return (
    <div className="w-100 p-4 bg-neutral-100 flex flex-col gap-3 border-2 border-neutral-200 rounded-lg">
      {/* heading */}
      <div>
        <div className="capitalize flex gap-2 justify-between items-start">
          <p className="font-semibold">{listing.type + ": " + listing.title}</p>

          <div className="py-1 px-3 bg-teal-100 text-teal-500 flex gap-1 justify-between items-center rounded-2xl">
            {listing.work_mode === "remote" ? (
              <Icon path={mdiMonitor} size={0.6} />
            ) : (
              <Icon path={mdiMapMarkerOutline} size={0.7} />
            )}

            <p className="text-sm">{listing.work_mode}</p>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          Posted by {listing.user.first_name + ", "} {listing.delta_time}
        </p>
      </div>

      {/* description */}
      <div>
        <p>{listing.description}</p>
      </div>
    </div>
  );
}
