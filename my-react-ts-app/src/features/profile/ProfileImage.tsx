import type { UserTypes } from "../../App.types";

const ProfileImage = ({
  isSmall,
  user,
}: {
  isSmall: boolean;
  user: UserTypes;
}) => {
  const styles = isSmall
    ? "size-10 min-w-10 rounded-full"
    : "size-25 min-w-25 rounded-full text-3xl";

  return (
    <div>
      {user?.profile_image ? (
        <img
          src={user.profile_image}
          alt="profile picture"
          className={styles}
        />
      ) : (
        <div
          className={
            styles +
            " bg-neutral-200 text-neutral-500 rounded-full flex justify-center items-center"
          }
        >
          {user?.name_initials}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
