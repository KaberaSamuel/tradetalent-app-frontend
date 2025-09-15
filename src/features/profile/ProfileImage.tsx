import type { UserTypes } from "@/App.types";

interface Props {
  isSmall: boolean;
  user: UserTypes;
  size: number;
  text?: string;
}

const ProfileImage = ({ isSmall, size, user, text = " text-3xl" }: Props) => {
  const styles = `rounded-full bg-neutral-200 text-gray-500 flex justify-center items-center`;
  const inlineStyles = {
    width: `${size * 4}px`,
    height: `${size * 4}px`,
    minWidth: `${size * 4}px`,
  };

  const name_initials_styles = isSmall ? styles : styles + text;

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
        <div className={name_initials_styles} style={inlineStyles}>
          {user?.name_initials}
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
