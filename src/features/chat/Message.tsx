import type { MessageTypes } from "@/App.types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { authSelector } from "../auth/authSlice";



function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Message({ message }: { message: MessageTypes }) {
  const { user } = useAppSelector(authSelector)

  function formatMessageTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString().slice(0, 5);
  }

  return (
    <li
      className={classNames(
        "mt-1 mb-1 flex",
        user.slug === message.to_user.slug ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={classNames(
          "relative max-w-xl rounded-lg px-2 py-1 text-gray-700 shadow",
          user.slug === message.to_user.slug ? "" : "bg-gray-100"
        )}
      >
        <div className="flex items-end">
          <span className="block">{message.content}</span>
          <span
            className="ml-2"
            style={{
              fontSize: "0.6rem",
              lineHeight: "1rem"
            }}
          >
            {formatMessageTimestamp(message.timestamp)}
          </span>
        </div>
      </div>
    </li>
  );
}