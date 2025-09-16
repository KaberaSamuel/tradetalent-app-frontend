import { logoutUser } from "@/features/auth/api";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { mdiInformationOutline, mdiLogout, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { authSelector, clear } from "../auth/authSlice";
import ProfileImage from "../profile/ProfileImage";
import ModalOveraly from "./ModalOveraly";

interface Props {
  updateVisibility: (choice: boolean) => void;
  updateDeleteStatus: (choice: boolean) => void;
}

function ProfileModal({ updateVisibility, updateDeleteStatus }: Props) {
  const navigate = useNavigate();
  const auth = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const iconSize = 0.9;
  const itemStyle = "px-6 py-4 flex gap-3 items-center hover:bg-neutral-200";

  const goToProfile = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    updateVisibility(false);
    navigate("/profile");
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

      <div className="absolute z-20 top-full mt-2 right-5 pb-3 bg-neutral-50 rounded-lg">
        <div className="py-5 px-7 mb-3 border-b border-neutral-300">
          <div className="flex gap-3 items-center -translate-x-3">
            <ProfileImage size={12} isSmall={true} user={auth.user} />
            <div>
              <p>{auth.user.name}</p>
              <p onClick={goToProfile} className="text-teal-500 underline">
                View Profile
              </p>
            </div>
          </div>
        </div>

        <div className={itemStyle}>
          <Icon path={mdiInformationOutline} size={iconSize} />
          <p>About</p>
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
