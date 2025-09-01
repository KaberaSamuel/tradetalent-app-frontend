import ProfileCards from "@/features/profile/ProfileCards";
import Hero from "@/features/profile/Hero";

const Profile = () => {
  return (
    <div className="flex flex-col gap-5">
      <Hero />

      <div>
        <p className="text-neutral-500">
          Update your info, services, and more. Click "Edit profile" to start
        </p>
      </div>

      <ProfileCards />
    </div>
  );
};

export default Profile;
