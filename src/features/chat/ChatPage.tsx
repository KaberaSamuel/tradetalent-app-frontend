import { authSelector } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";

import type { MessageTypes } from "@/App.types";
import ChatComponent from "@/features/chat/ChatComponent";

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const VITE_ENV = import.meta.env.VITE_ENV;

export interface jsonMessageTypes {
  type: string;
  message?: string;
}

export default function ChatPage() {
  const { conversationName } = useParams();

  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState<MessageTypes[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const auth = useAppSelector(authSelector);

  const { readyState, sendJsonMessage } = useWebSocket(
    `${
      VITE_ENV === "production" ? "wss" : "ws"
    }://${API_DOMAIN}/${conversationName}/`,
    {
      queryParams: {
        token: auth.token.access,
      },

      // onMessage handler
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case "welcome_message":
            setWelcomeMessage(data.message);
            break;
          case "chat_message_echo":
            // mark message as read
            sendJsonMessage({ type: "read_messages" });
            setMessageHistory((prev: MessageTypes[]) => [
              data.message,
              ...prev,
            ]);
            break;
          case "last_50_messages":
            setMessageHistory(data.messages);
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

  function handleInputMessageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target) {
      setInputMessage(e.target.value);
    }
  }

  const handleSubmit = () => {
    sendJsonMessage({
      type: "chat_message",
      message: inputMessage,
    });
    setInputMessage("");
  };

  return (
    <ChatComponent
      connectionStatus={connectionStatus}
      welcomeMessage={welcomeMessage}
      inputMessage={inputMessage}
      messageHistory={messageHistory}
      handleInputMessageChange={handleInputMessageChange}
      handleSubmit={handleSubmit}
      sendJsonMessage={sendJsonMessage}
    />
  );
}
