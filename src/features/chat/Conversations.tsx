import { Spinner } from "@/components/Loader";
import { authSelector } from "@/features/auth/authSlice";
import { fetchConversations } from "@/features/chat/api";
import {
  activeConversationSelector,
  updateActiveConversation,
} from "@/features/chat/chatSlice";
import ProfileImage from "@/features/profile/ProfileImage";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useQuery } from "@tanstack/react-query";
import { differenceInCalendarDays } from "date-fns";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Conversations() {
  const { user, token } = useAppSelector(authSelector);
  const activeConversation = useAppSelector(activeConversationSelector);
  const navigate = useNavigate();
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

  // navigate to active conversation
  useEffect(() => {
    if (activeConversation) {
      const activeConversationIndex = conversations?.findIndex(
        (conversation) => conversation.name == activeConversation.name
      );

      if (activeConversationIndex == -1) {
        return;
      }
      navigate(`/chats/${activeConversation.name}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Spinner />
      </div>
    );
  }

  if (conversations) {
    if (conversations.length === 0) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <p>No conversations here yet!</p>
        </div>
      );
    }

    const conversationsListUI = (
      <div className="border-r border-neutral-300 w-min-[300] overflow-x-hidden overflow-y-auto custom-scrollbar">
        <div>
          {conversations.map((conversation) => {
            const isActive = conversation.name === activeConversation.name;
            const tabStyles =
              "py-2 px-4 border-b border-neutral-300 flex gap-3 items-center ";
            const dateObject = formatDate(
              conversation.last_message?.timestamp || ""
            );
            let lastMessage = conversation.last_message?.content || "";

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
                onClick={() => {
                  dispatch(updateActiveConversation(conversation));
                }}
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
                    <div className="flex gap-1 items-center">
                      <p className="w-40 grow truncate">{lastMessage}</p>
                      <p
                        className={dateObject.isNumbers ? "text-xs" : "text-sm"}
                      >
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
      return (
        <div className="absolute inset-0 -margin-5">{conversationsListUI}</div>
      );
    }

    return (
      <div className={"absolute inset-0 grid grid-cols-[330px_minmax(0,1fr)]"}>
        {conversationsListUI}

        <div className="grow overflow-auto">
          <Outlet />
        </div>
      </div>
    );
  }

  return <p>Error loading chats</p>;
}
