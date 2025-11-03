import { Spinner } from "@/components/Loader";
import ModalOveraly from "@/features/modals/ModalOveraly";
import useMediaQuery from "@/hooks/useMediaQuery";
import { mdiClose, mdiDeleteOutline, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { motion } from "framer-motion";
import type React from "react";
import type { ReactNode } from "react";

interface Props {
  item: string;
  pending: boolean;
  updateDeleteStatus: (isDelete: boolean) => void;
  deleteFunction: () => void;
  children: ReactNode;
}

function DeleteModal({
  item,
  pending,
  updateDeleteStatus,
  deleteFunction,
  children,
}: Props) {
  const iconSize = 1;
  const buttonIconSize = iconSize - 0.2;
  const buttonStyles =
    "py-2 px-3 text-sm font-semibold flex gap-1 justify-center items-center border border-neutral-300 rounded-xl";
  const modalStyles =
    "w-[90%] sm:w-150 fixed z-30 p-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-50 flex flex-col gap-3";

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
        {/* header */}
        <div className="flex gap-2 items-center">
          <Icon
            path={mdiTrashCanOutline}
            size={iconSize}
            className="text-red-500"
          />
          <p className="text-lg font-semibold">Delete {item} ?</p>
        </div>

        {/* body */}
        {children}

        {/* footer */}
        <div className="mt-3 flex gap-3 sm:gap-5 sm:justify-end">
          <button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              updateDeleteStatus(false);
            }}
            className={buttonStyles + " bg-white text-black"}
          >
            <Icon path={mdiClose} size={buttonIconSize} />
            <p>Cancel</p>
          </button>

          <button className={buttonStyles + " min-w-30 bg-red-500 text-white"}>
            {pending ? (
              <Spinner isButton={true} />
            ) : (
              <div
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  deleteFunction();
                }}
                className="flex gap-1 sm:gap-2"
              >
                <Icon path={mdiDeleteOutline} size={buttonIconSize} />
                <p>Delete {!isMobile && "permanently"}</p>
              </div>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DeleteModal;
