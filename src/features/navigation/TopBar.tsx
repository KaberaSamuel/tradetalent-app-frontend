import { useState } from "react";
import { mdiMagnify, mdiBellOutline } from "@mdi/js";
import { useAppSelector } from "@/hooks/reduxHooks";
import useMediaQuery from "@/hooks/useMediaQuery";
import { authSelector } from "@/features/auth/authSlice";
import ProfileImage from "@/features/profile/ProfileImage";
import Icon from "@mdi/react";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const auth = useAppSelector(authSelector);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const updateQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/listings?search=${query}`);
  };

  return (
    <div className="w-full h-fit p-2 pt-3 sm:py-3 sm:px-4 flex gap-2 sm:gap-4 justify-between border-b-1 border-neutral-300">
      <form onSubmit={onSubmit} className="relative grow max-w-150">
        <Icon
          path={mdiMagnify}
          size={isMobile ? 0.9 : 1}
          className="absolute top-1 left-2 translate-y-1 text-neutral-500"
        />
        <input
          type="text"
          placeholder="Search in listings"
          onChange={updateQuery}
          className="w-full py-1.5 px-8 sm:px-10 bg-neutral-100 border border-neutral-300 rounded-lg"
        />
      </form>

      <div className="flex gap-2 sm:gap-4">
        <div className="w-10 h-10 bg-neutral-200 text-neutral-500 rounded-full flex justify-center items-center">
          <Icon path={mdiBellOutline} size={1} />
        </div>

        <ProfileImage size={10} isSmall={true} user={auth.user} />
      </div>
    </div>
  );
};

export default TopBar;
