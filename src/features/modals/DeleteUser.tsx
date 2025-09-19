import type { UserTypes } from "@/App.types";
import { deleteUser } from "@/features/auth/api";
import { authSelector } from "@/features/auth/authSlice";
import DeleteModal from "@/features/modals/DeleteModal";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useState } from "react";
import ProfileImage from "../profile/ProfileImage";

interface Props {
  updateDeleteStatus: (isDelete: boolean) => void;
  user: UserTypes;
}

function DeleteUser({ updateDeleteStatus, user }: Props) {
  const auth = useAppSelector(authSelector);
  const [isLoading, setIsLoading] = useState(false);

  const submitDeleteRequest = async () => {
    try {
      setIsLoading(true);
      await deleteUser(user.slug, auth.token.access);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      window.location.href = "/public";
    }
  };

  return (
    <DeleteModal
      item="account"
      pending={isLoading}
      updateDeleteStatus={updateDeleteStatus}
      deleteFunction={submitDeleteRequest}
    >
      <p className="text-gray-500 mb-1">
        This action permanently removes your account. You can't undo this.
      </p>

      <div className="py-3 px-4 bg-neutral-100 flex gap-4 items-center border border-neutral-300 rounded-xl">
        <ProfileImage size={15} isSmall={false} user={user} text=" text-2xl" />
        <div className="text-sm sm:text-base">
          <p className="font-semibold">{user.name}</p>
          <p className="text-red-500 break-all">{user.email}</p>
        </div>
      </div>
    </DeleteModal>
  );
}

export default DeleteUser;
