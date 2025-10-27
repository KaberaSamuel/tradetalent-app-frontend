import type { MessageTypes } from "@/App.types";
import { Spinner } from "@/components/Loader";
import { Message } from "@/features/chat/Message";
import useMediaQuery from "@/hooks/useMediaQuery";
import { mdiAlert } from "@mdi/js";
import Icon from "@mdi/react";

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
  handleMessageChange,
  message,
  handleSubmit,
  messageHistory,
}: Props) {
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const styles = "h-full p-2 flex flex-col overflow-y-auto ";
  if (connectionStatus == "Open") {
    return (
      <div
        className={
          isTablet
            ? styles +
              `absolute ${
                isMobile ? "top- 0 right-0 left-0 bottom-15" : "inset-0"
              }`
            : styles
        }
      >
        {/* message history */}
        <ul className="mt-3 flex flex-col-reverse gap-3 justify-start relative w-full p-5">
          {messageHistory.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </ul>

        {/* message input */}
        <div className="sticky bottom-2 mt-auto flex gap-3">
          <input
            name="message"
            placeholder="Message"
            onChange={handleMessageChange}
            value={message}
            className="py-2.5 px-4 grow sm:text-sm bg-white border-2 border-neutral-300 rounded-md shadow-lg"
          />
          <button
            className="bg-gray-300 px-3 py-1 rounded-md shadow-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  if (connectionStatus === "Connecting") {
    return (
      <div className="w-full h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 justify-center items-center">
      <div className="flex gap-1">
        <Icon path={mdiAlert} size={1} color={"#fb2c36"} />
        <p className="text-lg text-red-500">Failed to connect. Try again</p>
      </div>

      <p>
        If this issue persists, let me know at{" "}
        <span className="text-teal-500">kaberanshutisamuel@gmail.com</span>
      </p>
    </div>
  );
}

export default ChatComponent;
