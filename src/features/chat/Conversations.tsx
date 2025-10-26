import { Spinner } from "@/components/Loader";
import { authSelector } from "@/features/auth/authSlice";
import { fetchConversations } from "@/features/chat/api";
import {
  conversationSelector,
  updateActiveConvesation,
} from "@/features/chat/chatSlice";
import ProfileImage from "@/features/profile/ProfileImage";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useQuery } from "@tanstack/react-query";
import { differenceInCalendarDays } from "date-fns";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

export default function Conversations() {
  const { user, token } = useAppSelector(authSelector);
  const activeConversation = useAppSelector(conversationSelector);
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const dispatch = useAppDispatch();

  function createConversationName(slug: string) {
    const namesAlph = [user.slug, slug].sort();
    return `${namesAlph[0]}__${namesAlph[1]}`;
  }

  function formatDate(date: string) {
    if (!date) {
      return { date: "", isNumbers: false };
    }

    const currentDate = new Date().toISOString();
    const difference = differenceInCalendarDays(currentDate, date);

    if (difference == 0) {
      return { dateString: "Today", isNumbers: false };
    } else if (difference == 1) {
      return { dateString: "Yesterday", isNumbers: false };
    }
    const formatedDate = new Date(date).toLocaleString();
    return { dateString: formatedDate.split(",")[0], isNumbers: true };
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

    const conversationsListUI = (
      <div className="border-r-2 border-neutral-300 overflow-x-hidden overflow-y-auto custom-scrollbar">
        <div className={isTablet ? "w-full" : "w-85"}>
          {conversations.map((conversation) => {
            const isActive = conversation === activeConversation;
            const tabStyles =
              "py-2 px-4 border-b border-neutral-300 flex gap-3 items-center ";
            const dateObject = formatDate(
              conversation.last_message?.timestamp || ""
            );
            let lastMessage = conversation.last_message?.content || "";
            lastMessage = isTablet
              ? lastMessage.slice(0, 45)
              : lastMessage?.slice(0, 20);

            if (conversation.last_message?.content) {
              if (
                lastMessage.length < conversation.last_message.content.length
              ) {
                lastMessage = lastMessage + "...";
              }
            }

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
                    <div className="flex justify-between items-center">
                      <p>{lastMessage}</p>
                      <p className={dateObject.isNumbers ? "text-sm" : ""}>
                        {dateObject.dateString}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );

    if (isTablet) {
      return <div className={`absolute inset-0`}>{conversationsListUI}</div>;
    }

    return (
      <div className={`absolute inset-0 flex`}>
        {conversationsListUI}

        <div className="grow overflow-auto">
          <Outlet />
        </div>
      </div>
    );
  }

  return <p>Error loading chats</p>;
}
