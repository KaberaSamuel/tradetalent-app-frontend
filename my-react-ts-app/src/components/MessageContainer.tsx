import Icon from "@mdi/react";
import { useEffect, useRef, useState } from "react";
import { mdiAlertCircleOutline } from "@mdi/js";
import { motion, AnimatePresence } from "framer-motion";

interface MessageContainerProps {
  message: string;
  setMessage: (string: string) => void;
}

const MessageIcon = ({ isSmall }: { isSmall: boolean }) => {
  return (
    <Icon
      path={mdiAlertCircleOutline}
      size={1}
      className={
        isSmall
          ? "min-w-[20px] -translate-x-1"
          : "min-w-[30px] -translate-x-1 translate-y-1"
      }
    />
  );
};

// container for showing important messages (like errors or completed actions) to user
const MessagesContainer = ({ message, setMessage }: MessageContainerProps) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [isSmall, setSmall] = useState(true);

  useEffect(() => {
    // updating element width
    if (messageContainerRef.current) {
      setSmall(
        messageContainerRef.current.getBoundingClientRect().width < 400
          ? true
          : false
      );
    }

    const timer = setTimeout(() => {
      // resetting relevant variables
      setMessage("");
      setSmall(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return (
    <AnimatePresence>
      {message !== "" && (
        <motion.div
          style={{
            position: "fixed",
            top: "20px",
            right: "25px",
            maxWidth: "400px",
          }}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <div
            ref={messageContainerRef}
            onClick={() => setMessage("")}
            className="py-3 px-4 bg-red-600 text-white text-left leading-tight flex items-start not-target:rounded-lg"
          >
            <MessageIcon isSmall={isSmall} />
            <p className="capitalize">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessagesContainer;
