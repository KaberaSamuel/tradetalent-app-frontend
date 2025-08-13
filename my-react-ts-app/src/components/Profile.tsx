import { useAppSelector } from "../hooks/reduxHooks";
import { authSelector } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function Profile() {
  const auth = useAppSelector(authSelector);
  console.log(auth.user);
  return (
    <div>
      <Link to="edit">Edit Profile</Link>
    </div>
  );
}
