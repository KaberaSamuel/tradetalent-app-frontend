import { useAppSelector } from "../../hooks/reduxHooks";
import { authSelector } from "../../features/auth/authSlice";

const ProfileImage = ({ isSmall }: { isSmall: boolean }) => {
  const auth = useAppSelector(authSelector);
  const styles = isSmall
    ? "size-10 min-w-10 rounded-full"
    : "size-25 min-w-25 rounded-full text-3xl";

  return (
    <div>
      {auth.user.profile_image ? (
        <img
          src={auth.user.profile_image}
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
          {auth.user.name_initials}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
