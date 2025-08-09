import Icon from "@mdi/react";
import { mdiMagnify, mdiBellOutline } from "@mdi/js";

const TopBar = () => {
  return (
    <div className="w-[100%] h-fit py-3 px-4 flex justify-between border-b-1 border-neutral-300">
      <form className="relative">
        <Icon
          path={mdiMagnify}
          size={1}
          className="absolute top-1 left-2 translate-y-1 text-neutral-500"
        />
        <input
          type="text"
          placeholder="Search skills, needs or users"
          className="w-100 py-1.5 px-10 bg-neutral-100 border border-neutral-300 rounded-lg"
        />
      </form>

      <div className="flex gap-3">
        <div className="w-10 h-10 bg-neutral-200 text-neutral-500 rounded-full flex justify-center items-center">
          <Icon path={mdiBellOutline} size={1} />
        </div>

        <div>
          <img
            src="public/profile_picture.png"
            alt="profile picture"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
