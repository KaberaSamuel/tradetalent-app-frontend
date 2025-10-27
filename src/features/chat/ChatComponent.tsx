import type { MessageTypes } from "@/App.types";
import { Message } from "@/features/chat/Message";

interface Props {
  connectionStatus: string;
  welcomeMessage: string;
  message: string;
  messageHistory: MessageTypes[];
  handleMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

function ChatComponent({
  connectionStatus,
  welcomeMessage,
  handleMessageChange,
  message,
  handleSubmit,
  messageHistory,
}: Props) {
  return (
    <div className="h-full p-2 overflow-y-auto relative flex flex-col">
      <span>The WebSocket is currently {connectionStatus}</span>
      <p>{welcomeMessage}</p>

      <ul className="mt-3 flex flex-col-reverse gap-5 justify-start relative w-full border border-neutral-300 overflow-y-auto p-6">
        {messageHistory.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </ul>

      {/* message input */}
      <div className="sticky bottom-3 mt-auto flex gap-3 shadow-lg">
        <input
          name="message"
          placeholder="Message"
          onChange={handleMessageChange}
          value={message}
          className="py-2 px-4 grow sm:text-sm border-gray-300 bg-gray-100 rounded-md"
        />
        <button
          className="bg-gray-300 px-3 py-1 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;
