import type { UserTypes } from "@/App.types";

interface Props {
  isSmall: boolean;
  user: UserTypes;
  size: number;
}

const ProfileImage = ({ isSmall, size, user }: Props) => {
  const styles = `rounded-full`;
  const inlineStyles = {
    width: `${size * 4}px`,
    height: `${size * 4}px`,
    minWidth: `${size * 4}px`,
  };

  const name_initials_styles = isSmall ? styles : styles + " text-3xl";

  return (
    <div>
      {user.profile_image ? (
        <img
          src={user.profile_image}
          alt="profile picture"
          className={styles}
          style={inlineStyles}
        />
      ) : (
        <div className={name_initials_styles}>{user?.name_initials}</div>
      )}
    </div>
  );
};

export default ProfileImage;
