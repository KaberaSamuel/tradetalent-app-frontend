import { authSelector } from "@/features/auth/authSlice";
import { updateActiveTab } from "@/features/navigation/navigationSlice";
import {
  notificationsSelector,
  updateUnreadMessagesCount,
} from "@/features/notifications/notificationsSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { mdiMessageOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useWebSocket from "react-use-websocket";

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const VITE_ENV = import.meta.env.VITE_ENV;

interface Props {
  cardStyles: string;
  leftStyles: string;
  numberStyles: string;
  rightStyles: string;
}

export default function NewMessagesCard({
  cardStyles,
  leftStyles,
  numberStyles,
  rightStyles,
}: Props) {
  const dispatch = useAppDispatch();
  const { unreadMessagesCount } = useAppSelector(notificationsSelector);

  const auth = useAppSelector(authSelector);
  const queryClient = useQueryClient();

  // initialize socket connection
  useWebSocket(
    `${
      VITE_ENV === "production" ? "wss" : "ws"
    }://${API_DOMAIN}/notifications/`,
    {
      queryParams: {
        token: auth.token.access,
      },
      onOpen: () => {
        console.log("Connected to Notifications!");
      },
      onClose: () => {
        console.log("Disconnected from Notifications!");
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case "unread_count":
            dispatch(updateUnreadMessagesCount(data.unread_count));
            break;

          case "new_message_notification":
            dispatch(updateUnreadMessagesCount(unreadMessagesCount + 1));
            break;

          default:
            console.error("Unknown message type!");
            break;
        }
      },
    }
  );

  return (
    <div className={cardStyles}>
      <div className={leftStyles}>
        <p>New Messages</p>
        <p className={numberStyles}>{unreadMessagesCount}</p>
      </div>

      <div className={rightStyles}>
        <Icon path={mdiMessageOutline} size={1} />
        <Link
          to="/chats"
          onClick={() => {
            dispatch(updateActiveTab("chats"));

            // refetch chats to get updated data
            queryClient.resetQueries({
              queryKey: ["fetch-conversations"],
            });
          }}
        >
          Go to Messages
        </Link>
      </div>
    </div>
  );
}
