import type { ConversationTypes } from "@/App.types";
import { authSelector } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function ActiveConversations() {
  const { user, token } = useAppSelector(authSelector)
  const [conversations, setActiveConversations] = useState<ConversationTypes[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("http://127.0.0.1:8000/chats/conversations/", {
        headers: {
          Authorization: `Bearer ${token.access}`
        }
      });
      const data = await response.json();
      console.log(data)
      setActiveConversations(data);
    }
    fetchUsers();
  }, [token]);

  function createConversationName(slug: string) {
    const namesAlph = [user.slug, slug].sort();
    return `${namesAlph[0]}__${namesAlph[1]}`;
  }

  function formatMessageTimestamp(timestamp?: string) {
    if (!timestamp) return;
    const date = new Date(timestamp);
    return date.toLocaleTimeString().slice(0, 5);
  }

  return (
    <div>
      {conversations.map((c) => (
        <Link
          to={`/messages/${createConversationName(c.other_user.slug)}`}
          key={c.other_user.slug}
        >
          <div className="border border-gray-200 w-full p-3">
            <h3 className="text-xl font-semibold text-gray-800">{c.other_user.slug}</h3>
            <div className="flex justify-between">
              <p className="text-gray-700">{c.last_message?.content}</p>
              <p className="text-gray-700">{formatMessageTimestamp(c.last_message?.timestamp)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}