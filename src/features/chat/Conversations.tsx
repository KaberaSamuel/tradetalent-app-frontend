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
import { Link, Outlet } from "react-router-dom";
import ProfileImage from "../profile/ProfileImage";

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
    if (conversations.length === 0) {
      return <div>No conversations here yet!</div>;
    }

    return (
      <div className="absolute inset-0 flex">
        <div className="w-85 h-[300vh] border-r border-neutral-300">
          {conversations.map((conversation) => {
            const isActive = conversation === activeConversation;
            const tabStyles =
              "py-2 px-4 border-b border-neutral-300 flex gap-3 items-center ";

            return (
              <Link
                to={`/chats/${createConversationName(
                  conversation.other_user.slug
                )}`}
                key={conversation.other_user.slug}
              >
                <div
                  className={isActive ? tabStyles + "bg-teal-100" : tabStyles}
                >
                  <ProfileImage
                    isSmall={true}
                    size={10}
                    user={conversation.other_user}
                  />
                  <div className="text-gray-500 grow">
                    <h3 className=" font-bold text-gray-800">
                      {conversation.other_user.name}
                    </h3>
                    <div className="flex justify-between">
                      <p>{conversation.last_message?.content}</p>
                      <p>
                        {formatDate(conversation.last_message?.timestamp || "")}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="sticky top-20 grow">
          <Outlet />
        </div>
      </div>
    );
  }

  return <p>Error loading chats</p>;
}
