// import { useAppSelector } from "../hooks/reduxHooks";
// import { authSelector } from "../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function Profile() {
  // const auth = useAppSelector(authSelector);
  return (
    <div>
      <Link to="edit">Edit Profile</Link>
    </div>
  );
}
