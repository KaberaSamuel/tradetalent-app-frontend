import type { ListingTypes } from "@/App.types";
import { authSelector } from "@/features/auth/authSlice";
import { deleteListing } from "@/features/listings/api";
import DeleteModal from "@/features/modals/DeleteModal";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useState } from "react";

interface Props {
  updateDeleteStatus: (isDelete: boolean) => void;
  listing: ListingTypes;
}

function DeleteListing({ updateDeleteStatus, listing }: Props) {
  const auth = useAppSelector(authSelector);
  const [isLoading, setIsLoading] = useState(false);

  const submitDeleteRequest = async () => {
    try {
      setIsLoading(true);
      await deleteListing(listing.slug, auth.token.access);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      window.location.href = "/my-listings";
    }
  };

  return (
    <DeleteModal
      item="listing"
      pending={isLoading}
      updateDeleteStatus={updateDeleteStatus}
      deleteFunction={submitDeleteRequest}
    >
      <p className="text-gray-500 mb-1">
        This action permanently removes the listing and its messages. You can't
        undo this.
      </p>

      <div className="py-3 px-4 text-sm capitalize bg-teal-100 rounded-xl">
        <p className="leading-tight text-base font-semibold mb-2">
          {listing.type}: {listing.title}
        </p>

        <div className="text-gray-500 flex flex-col sm:flex-row gap-0 sm:gap-2">
          <p>Posted {listing.delta_time},</p>
          <p>Tags: {listing.skills}</p>
        </div>
      </div>
    </DeleteModal>
  );
}

export default DeleteListing;
