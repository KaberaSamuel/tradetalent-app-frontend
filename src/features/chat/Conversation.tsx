import type { UserTypes } from "@/App.types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authSelector } from "../auth/authSlice";

export default function Conversations() {
  const { user, token } = useAppSelector(authSelector);
  const [users, setUsers] = useState<UserTypes[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("http://127.0.0.1:8000/users/all/", {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, [user, token]);

  function createConversationName(first_name: string) {
    const first_namesAlph = [user.first_name, first_name].sort();
    return `${first_namesAlph[0]}__${first_namesAlph[1]}`;
  }

  return (
    <div>
      {users
        .filter((u: UserTypes) => u.first_name !== user.first_name)
        .map((u: UserTypes) => (
          <Link to={`${createConversationName(u.first_name!)}`}>
            <div key={u.first_name}>{u.first_name}</div>
          </Link>
        ))}
    </div>
  );
}
