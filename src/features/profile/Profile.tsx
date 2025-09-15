import { useQuery } from "@tanstack/react-query";
import ProfileCards from "@/features/profile/ProfileCards";
import Hero from "@/features/profile/Hero";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/reduxHooks";
import { authSelector } from "@/features/auth/authSlice";
import { fetchUserBySlug } from "@/features/auth/api";
import { Spinner } from "@/components/Loader";

const Profile = () => {
  const { user_slug } = useParams();
  const auth = useAppSelector(authSelector);
  const shouldFetchUser = Boolean(user_slug && auth.token.access);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user-data-by-slug"],
    queryFn: () => fetchUserBySlug(auth.token.access, user_slug!),
    enabled: shouldFetchUser,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full -translate-y-5 flex flex-col gap">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error happened loading user profile</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Hero
        user={shouldFetchUser ? data! : auth.user}
        isLoggedIn={!shouldFetchUser}
      />

      {!shouldFetchUser && (
        <div>
          <p className="text-xs sm:text-sm text-neutral-500">
            Update your info, services, and more. Click "Edit profile" to start
          </p>
        </div>
      )}

      <ProfileCards
        isLoggedIn={!shouldFetchUser}
        user={shouldFetchUser ? data! : auth.user}
      />
    </div>
  );
};

export default Profile;
