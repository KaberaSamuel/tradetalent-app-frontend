import { logoutUser } from "@/features/auth/api";
import { authSelector, clear } from "@/features/auth/authSlice";
import ModalOveraly from "@/features/modals/ModalOveraly";
import { updateActiveTab } from "@/features/navigation/navigationSlice";
import ProfileImage from "@/features/profile/ProfileImage";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { mdiLogout, mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import type React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  updateVisibility: (choice: boolean) => void;
  updateDeleteStatus: (choice: boolean) => void;
}

function ProfileModal({ updateVisibility, updateDeleteStatus }: Props) {
  const navigate = useNavigate();
  const auth = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const iconSize = 0.9;
  const itemStyle =
    "px-5 sm:px-6 py-4 flex gap-3 items-center hover:bg-neutral-200";

  const goToProfile = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    updateVisibility(false);
    dispatch(updateActiveTab("profile"));
    navigate("/profile");
  };

  const goToEditProfile = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    updateVisibility(false);
    dispatch(updateActiveTab("profile"));
    navigate("/profile/edit");
  };

  const logout = async () => {
    try {
      await logoutUser(auth.token.access, auth.token.refresh);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(clear());
      localStorage.clear();

      // navigate to public with a full reload
      window.location.href = "/public";
    }
  };

  return (
    <div>
      <ModalOveraly updateVisibility={updateVisibility} />

      <div className="absolute z-20 top-full w-[85vw] sm:w-fit mt-2 right-5 pb-3 bg-neutral-50 rounded-lg">
        <div className="py-5 px-7 mb-3 border-b border-neutral-300">
          <div className="flex gap-3 items-center -translate-x-3">
            <ProfileImage size={15} isSmall={true} user={auth.user} />
            <div>
              <p className="sm:text-lg">{auth.user.name}</p>
              <p
                onClick={goToProfile}
                className="text-sm sm:text-base break-all text-teal-500 underline"
              >
                {auth.user.email}
              </p>
            </div>
          </div>
        </div>

        <div className={itemStyle} onClick={goToEditProfile}>
          <Icon path={mdiPencilOutline} size={iconSize} />
          <p>Update Profile</p>
        </div>

        <div className={itemStyle} onClick={logout}>
          <Icon path={mdiLogout} size={iconSize} />
          <p>Logout</p>
        </div>

        <div
          className={itemStyle}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            updateVisibility(false);
            updateDeleteStatus(true);
          }}
        >
          <Icon path={mdiTrashCanOutline} size={iconSize} />
          <p>Delete Account</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
