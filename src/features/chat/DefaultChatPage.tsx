import { authSelector } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

import type { MessageTypes } from "@/App.types";
import { Message } from "@/features/chat/Message";
import { activeConversationSelector } from "./chatSlice";

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;
const viteEnv = import.meta.env.VITE_ENV;

export default function DefaultChatPage() {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState<MessageTypes[]>([]);
  const [message, setMessage] = useState("");
  const auth = useAppSelector(authSelector);
  const { name: conversationName } = useAppSelector(activeConversationSelector);

  const { readyState, sendJsonMessage } = useWebSocket(
    `${
      viteEnv === "production" ? "wss" : "ws"
    }://${API_DOMAIN}/${conversationName}/`,
    {
      queryParams: {
        token: auth.token.access,
      },

      onOpen: () => {
        console.log("Connected!");
      },

      onClose: () => {
        console.log("Disconnected!");
      },

      // onMessage handler
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case "welcome_message":
            setWelcomeMessage(data.message);
            break;
          case "chat_message_echo":
            setMessageHistory((prev: MessageTypes[]) =>
              prev.concat(data.message)
            );
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

  function handleChangeMessage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target) {
      setMessage(e.target.value);
    }
  }

  const handleSubmit = () => {
    sendJsonMessage({
      type: "chat_message",
      message,
      name: auth.user.name,
    });
    setMessage("");
  };

  return (
    <div className="h-full p-2">
      <span>The WebSocket is currently {connectionStatus}</span>
      <p>{welcomeMessage}</p>

      <div className="my-4">
        <input
          name="message"
          placeholder="Message"
          onChange={handleChangeMessage}
          value={message}
          className="p-2 shadow-sm sm:text-sm border-gray-300 bg-gray-100 rounded-md"
        />
        <button className="ml-3 bg-gray-300 px-3 py-1" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <hr />
      <ul className="mt-3 flex flex-col-reverse relative w-full border border-gray-200 overflow-y-auto p-6">
        {messageHistory.map((message: MessageTypes) => (
          <Message key={message.id} message={message} />
        ))}
      </ul>
    </div>
  );
}
