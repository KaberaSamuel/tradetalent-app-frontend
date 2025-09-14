import Icon from "@mdi/react";
import { mdiTrashCanOutline, mdiClose, mdiDeleteOutline } from "@mdi/js";
import { motion } from "framer-motion";
import type { ListingTypes } from "@/App.types";
import useMediaQuery from "@/hooks/useMediaQuery";
import ModalOveraly from "@/features/modals/ModalOveraly";

interface Props {
  updateDeleteStatus: (isDelete: boolean) => void;
  listing: ListingTypes;
}

function DeleteListing({ updateDeleteStatus, listing }: Props) {
  const iconSize = 1;
  const buttonIconSize = iconSize - 0.2;
  const buttonStyles =
    "py-2 px-3 text-sm font-semibold flex gap-1 items-center border border-neutral-300 rounded-xl";
  const modalStyles =
    "w-[90%] sm:w-150 fixed z-10 p-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-50 flex flex-col gap-3";

  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
      }}
    >
      <ModalOveraly updateVisibility={updateDeleteStatus} />

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{
          duration: 0.3,
        }}
        className={modalStyles}
      >
        <div className="flex gap-2 items-center">
          <Icon
            path={mdiTrashCanOutline}
            size={iconSize}
            className="text-red-500"
          />
          <p className="text-lg font-semibold">Delete Listing ?</p>
        </div>

        <p className="text-gray-500 mb-1">
          This action permanently removes the listing and its messages. You
          can't undo this.
        </p>

        <div className="py-3 px-4 text-sm font-semibold capitalize bg-teal-100 rounded-xl">
          <p className="text-base">
            {listing.type}: {listing.title}
          </p>

          <div className="text-gray-500 flex flex-col sm:flex-row gap-0 sm:gap-2">
            <p>Posted {listing.delta_time},</p>
            <p>Tags: {listing.skills}</p>
          </div>
        </div>

        <div className="mt-3 flex gap-3 sm:gap-5 sm:justify-end">
          <button
            onClick={() => {
              updateDeleteStatus(false);
            }}
            className={buttonStyles + " bg-white text-black"}
          >
            <Icon path={mdiClose} size={buttonIconSize} />
            <p>Cancel</p>
          </button>

          <button className={buttonStyles + " bg-red-500 text-white"}>
            <Icon path={mdiDeleteOutline} size={buttonIconSize} />
            <p>Delete {!isMobile && "permanently"}</p>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DeleteListing;
