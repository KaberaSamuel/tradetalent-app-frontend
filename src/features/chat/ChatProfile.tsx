import type { UserTypes } from "@/App.types";
import ProfileImage from "@/features/profile/ProfileImage";

interface Props {
  user: UserTypes;
}

export default function ChatProfile({ user }: Props) {
  return (
    <div className="-mx-2 sticky top-0 z-5 px-4 py-2 bg-white flex gap-3 items-center border-b border-neutral-300">
      <ProfileImage isSmall={true} size={10} user={user} />
      <p className="text-lg font-semibold">{user.name}</p>
    </div>
  );
}
