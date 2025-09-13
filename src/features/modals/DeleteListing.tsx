import Icon from "@mdi/react";
import { mdiTrashCanOutline, mdiClose, mdiDeleteOutline } from "@mdi/js";
import ModalOveraly from "@/features/modals/ModalOveraly";

interface Props {
  updateDeleteStatus: (isDelete: boolean) => void;
}

function DeleteListing({ updateDeleteStatus }: Props) {
  const iconSize = 1;
  const buttonIconSize = iconSize - 0.2;
  const buttonStyles =
    "py-2 px-3 text-sm font-semibold flex gap-1 items-center border border-neutral-200 rounded-xl";
  const modalStyles =
    "w-fit fixed z-10 p-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-50 flex flex-col gap-3";

  return (
    <div>
      <ModalOveraly />

      <div className={modalStyles}>
        <div className="flex gap-2 items-center">
          <Icon
            path={mdiTrashCanOutline}
            size={iconSize}
            className="text-red-500"
          />
          <p className="text-lg font-semibold">Delete Listing ?</p>
        </div>

        <p>
          This action permanently removes the listing and its messages. You
          can't undo this.
        </p>

        <div className="mt-3 flex gap-5  justify-end">
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
            <p>Delete Permanently</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteListing;
