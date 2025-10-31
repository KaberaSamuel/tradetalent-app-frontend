import type { MessageTypes } from "@/App.types";
import { Spinner } from "@/components/Loader";
import { Message } from "@/features/chat/Message";
import { useAppSelector } from "@/hooks/reduxHooks";
import useMediaQuery from "@/hooks/useMediaQuery";
import { mdiAlert, mdiSendOutline } from "@mdi/js";
import Icon from "@mdi/react";
import ChatProfile from "./ChatProfile";
import { activeConversationSelector } from "./chatSlice";

interface Props {
  connectionStatus: string;
  welcomeMessage: string;
  inputMessage: string;
  messageHistory: MessageTypes[];
  handleInputMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}

function ChatComponent({
  connectionStatus,
  handleInputMessageChange,
  inputMessage,
  handleSubmit,
  messageHistory,
}: Props) {
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const styles = "h-full px-2 flex flex-col overflow-y-auto ";
  const { other_user } = useAppSelector(activeConversationSelector);
  if (connectionStatus == "Open") {
    return (
      <div
        className={
          isTablet
            ? styles +
              `absolute ${
                isMobile ? "top-0 right-0 left-0 bottom-15" : "inset-0"
              }`
            : styles
        }
      >
        {/* user profile section */}
        <ChatProfile user={other_user} />

        {/* message history */}
        <ul className="mt-3 flex flex-col-reverse gap-1 justify-start relative w-full p-5 pt-0">
          {messageHistory.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </ul>

        {/* message input */}
        <div
          className={`sticky ${
            isMobile ? "bottom-16.5" : "bottom-0"
          } z-20 mt-auto -mx-2 py-2 px-3 bg-white border-t border-neutral-300 flex gap-3`}
        >
          <input
            name="message"
            placeholder="Type a message"
            onChange={handleInputMessageChange}
            value={inputMessage}
            className="py-2 px-3 grow sm:text-sm bg-white border-1 border-neutral-300 rounded-md"
          />
          <button
            onClick={() => {
              // cancel submit if input is empty
              if (inputMessage === "") {
                return;
              }

              handleSubmit();
            }}
          >
            <div className="bg-teal-500 text-white px-4 py-2 rounded-xl flex gap-1">
              <Icon path={mdiSendOutline} size={0.8} rotate={-45} />
              <h2 className="font-semibold">Send</h2>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // loading screening
  if (connectionStatus === "Connecting") {
    return (
      <div className="w-full h-full">
        <Spinner />
      </div>
    );
  }

  // error component
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
