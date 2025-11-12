import type { UserTypes } from "@/App.types";
import ProfileImage from "@/features/profile/ProfileImage";
import { mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Props {
  user: UserTypes;
}

export default function ChatProfile({ user }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="-mx-2 sticky top-0 z-5 px-4 py-2 bg-white flex gap-3 items-center border-b border-neutral-300">
      <ProfileImage isSmall={true} size={10} user={user} />
      <p className="text-lg font-semibold">{user.name}</p>

      <button
        className="ml-auto text-teal-500"
        onClick={() => {
          setIsDeleting(true);
        }}
      >
        <Icon path={mdiTrashCanOutline} size={1} />
      </button>

      {/* delete modal */}
      <AnimatePresence></AnimatePresence>
    </div>
  );
}
