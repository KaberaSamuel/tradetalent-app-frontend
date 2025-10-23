import { Spinner } from "@/components/Loader";
import { authSelector } from "@/features/auth/authSlice";
import { fetchConversations } from "@/features/chat/api";
import {
  conversationSelector,
  updateActiveConvesation,
} from "@/features/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useQuery } from "@tanstack/react-query";
import { differenceInCalendarDays } from "date-fns";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Conversations() {
  const { user, token } = useAppSelector(authSelector);
  const activeConversation = useAppSelector(conversationSelector);
  const dispatch = useAppDispatch();

  function createConversationName(slug: string) {
    const namesAlph = [user.slug, slug].sort();
    return `${namesAlph[0]}__${namesAlph[1]}`;
  }

  function formatDate(date: string) {
    if (!date) {
      return "";
    }

    const currentDate = new Date().toISOString();
    const difference = differenceInCalendarDays(currentDate, date);

    if (difference == 0) {
      return "Today";
    } else if (difference == 1) {
      return "Yesterday";
    }
    const formatedDate = new Date(date).toLocaleString();
    return formatedDate.split(",")[0];
  }

  const { data: conversations, isLoading } = useQuery({
    queryKey: ["fetch-conversations"],
    queryFn: () => fetchConversations(token.access),
  });

  useEffect(() => {
    if (conversations) {
      dispatch(updateActiveConvesation(conversations[0]));
    }
  }, [conversations, dispatch]);

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Spinner />
      </div>
    );
  }

  if (conversations) {
    const tabStyles = "py-2 px-4 border-t border-neutral-300 bg-teal-100";

    if (conversations.length === 0) {
      return <div>No conversations here yet!</div>;
    }

    return (
      <div className="h-screen">
        <div className="w-85 -my-3 -mx-7 h-full border-r border-neutral-300">
          {conversations.map((conversation) => {
            const isActive = conversation === activeConversation;
            console.log(formatDate(conversation.last_message?.timestamp || ""));

            return (
              <Link
                to={`/chats/${createConversationName(
                  conversation.other_user.slug
                )}`}
                key={conversation.other_user.slug}
              >
                <div
                  className={isActive ? tabStyles : tabStyles + "bg-teal-200"}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {conversation.other_user.name}
                  </h3>
                  <div className="flex justify-between">
                    <p className="text-gray-700">
                      {conversation.last_message?.content}
                    </p>
                    <p className="text-gray-700">
                      {formatDate(conversation.last_message?.timestamp || "")}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return <p>Error loading chats</p>;
}
