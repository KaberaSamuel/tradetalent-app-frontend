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
      console.log(token)
      const res = await fetch("http://127.0.0.1:8000/users/all/", {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      });
      const data = await res.json();
      setUsers(data);
    }
    

    if (token) {
      fetchUsers();
    }
  }, [user, token]);

  function createConversationName(slug: string) {
    const slugsAlph = [user.slug, slug].sort();
    return `${slugsAlph[0]}__${slugsAlph[1]}`;
  }

  return (
    <div>
      {users
        .filter((u: UserTypes) => u.slug !== user.slug)
        .map((u: UserTypes) => (
          <Link to={`${createConversationName(u.slug)}`}>
            <div key={u.slug}>{u.slug}</div>
          </Link>
        ))}
    </div>
  );
}
