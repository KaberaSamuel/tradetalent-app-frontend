import ProfileCards from "@/features/profile/ProfileCards";
import Hero from "@/features/profile/Hero";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user_slug } = useParams();

  return (
    <div className="flex flex-col gap-5">
      <Hero />

      <div>
        <p className="text-xs sm:text-sm text-neutral-500">
          Update your info, services, and more. Click "Edit profile" to start
        </p>
      </div>

      <ProfileCards />
    </div>
  );
};

export default Profile;
