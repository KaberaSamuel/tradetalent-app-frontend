import type { MessageTypes } from "@/App.types";
import { authSelector } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/reduxHooks";

// function to joing multiple tailwind classes into one string
function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Message({ message }: { message: MessageTypes }) {
  const { user } = useAppSelector(authSelector);

  return (
    <li
      className={classNames(
        "mt-1 mb-1 flex",
        user.slug === message.to_user.slug ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={classNames(
          "relative max-w-[85%] rounded-2xl px-4 py-2 text-gray-700 ",
          user.slug === message.to_user.slug
            ? "bg-neutral-200 rounded-bl-none"
            : "bg-teal-500 text-white rounded-br-none"
        )}
      >
        <div className="flex items-end">
          <span className="block">{message.content}</span>
        </div>
      </div>
    </li>
  );
}
