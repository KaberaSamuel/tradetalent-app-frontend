import { mdiChatProcessingOutline } from "@mdi/js";
import Icon from "@mdi/react";

export default function DefaultChatPage() {
  const featuresElementsStyles = "flex items-center gap-2";
  const roundedBulletsStyles = "w-1.5 h-1.5 bg-teal-400 rounded-full";

  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-neutral-100 border-l border-gray-200">
      <div className="flex flex-col items-center max-w-md px-8 text-center">
        {/* Icon */}
        <div className="mb-6 relative">
          <Icon path={mdiChatProcessingOutline} size={3} color={"#00bba7"} />

          {/* Decorative dots */}
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-teal-400 rounded-full"></div>
          <div className="absolute -bottom-1 -left-3 w-1.5 h-1.5 bg-teal-300 rounded-full"></div>
        </div>

        {/* Main heading */}
        <h1 className="text-3xl font-light text-gray-800 mb-3">
          Service Exchange Chat
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-base leading-relaxed mb-6">
          Select a conversation from the list to start chatting with other users
          about service exchanges.
        </p>

        {/* Feature hints */}
        <div className="flex flex-col gap-2 text-gray-400">
          <div className={featuresElementsStyles}>
            <div className={roundedBulletsStyles}></div>
            <span>Send and receive messages instantly</span>
          </div>
          <div className={featuresElementsStyles}>
            <div className={roundedBulletsStyles}></div>
            <span>Discuss service details and requirements</span>
          </div>
          <div className={featuresElementsStyles}>
            <div className={roundedBulletsStyles}></div>
            <span>Coordinate exchanges seamlessly</span>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 text-teal-400 flex items-center gap-1">
          <span className="mdi mdi-lock text-sm"></span>
          <span>Your conversations are private and secure</span>
        </div>
      </div>
    </div>
  );
}
