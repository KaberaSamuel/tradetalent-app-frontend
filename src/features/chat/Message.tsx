import type { MessageTypes } from "@/App.types";
import { authSelector } from "@/features/auth/authSlice";
import { useAppSelector } from "@/hooks/reduxHooks";

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
          "relative max-w-xl rounded-lg px-3 py-1.5 text-gray-700 shadow",
          user.slug === message.to_user.slug ? "" : "bg-gray-100"
        )}
      >
        <div className="flex items-end">
          <span className="block">{message.content}</span>
        </div>
      </div>
    </li>
  );
}
