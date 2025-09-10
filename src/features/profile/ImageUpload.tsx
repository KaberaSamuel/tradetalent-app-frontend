import React, { type ReactElement } from "react";
import { useState, useRef } from "react";
import Icon from "@mdi/react";
import { mdiTrayArrowUp } from "@mdi/js";
import { useAppSelector } from "@/hooks/reduxHooks";
import { authSelector } from "@/features/auth/authSlice";
import useMediaQuery from "@/hooks/useMediaQuery";

interface ProfileImageProps {
  updateFile: (file: File) => void;
}

interface HandleImageUploadType {
  (event: React.ChangeEvent<HTMLInputElement>): void;
}

const ProfileImageUpload = ({ updateFile }: ProfileImageProps) => {
  const auth = useAppSelector(authSelector);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(
    auth.user.profile_image || null
  );

  const handleImageUpload: HandleImageUploadType = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileUrl(URL.createObjectURL(file));
      updateFile(file);
    }
  };

  // function to trigger input click event on file input
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  };

  let picture: ReactElement;

  if (fileUrl) {
    picture = (
      <img src={fileUrl} alt="Profile" className="w-25 h-25 rounded-full" />
    );
  } else if (auth.user.profile_image) {
    picture = (
      <img
        src={auth.user.profile_image}
        alt="Profile"
        className="w-25 h-25 rounded-full"
      />
    );
  } else {
    picture = (
      <div className="w-25 h-25 bg-neutral-200 text-neutral-500 rounded-full flex justify-center items-center text-3xl">
        {auth.user.name_initials}
      </div>
    );
  }

  return (
    <form>
      <div className="flex gap-5 sm:gap-7 items-center">
        {picture}

        <button
          onClick={handleButtonClick}
          type="button"
          className="py-2 px-3 flex gap-2 items-center border border-neutral-300 rounded-xl"
        >
          <Icon path={mdiTrayArrowUp} size={isMobile ? 0.7 : 0.9} />
          <span className="text-xs sm:text-sm">Upload New Photo</span>
        </button>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleImageUpload}
          hidden
        />
      </div>
    </form>
  );
};

export default ProfileImageUpload;
