import { authSelector } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import { createContext, useState, type ReactNode } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const DefaultProps = {
  unreadMessageCount: 0,
  connectionStatus: "Uninstantiated",
};

export interface NotificationProps {
  unreadMessageCount: number;
  connectionStatus: string;
}

export const NotificationContext =
  createContext<NotificationProps>(DefaultProps);

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const VITE_ENV = import.meta.env.VITE_ENV;

export const NotificationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const auth = useAppSelector(authSelector);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  const { readyState } = useWebSocket(
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
            setUnreadMessageCount(data.unread_count);
            break;

          case "new_message_notification":
            setUnreadMessageCount((count) => (count += 1));
            break;

          default:
            console.error("Unknown message type!");
            break;
        }
      },
    }
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <NotificationContext.Provider
      value={{ unreadMessageCount, connectionStatus }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
