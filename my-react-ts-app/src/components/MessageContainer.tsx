import Icon from "@mdi/react";
import { useEffect } from "react";
import { mdiAlertCircleOutline } from "@mdi/js";
import { motion, AnimatePresence } from "framer-motion";

interface MessageContainerProps {
  message: string;
  setMessage: (string: string) => void;
}

// container for showing important messages (like errors or completed actions) to user
const MessagesContainer = ({ message, setMessage }: MessageContainerProps) => {
  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }, [message]);

  return (
    <AnimatePresence>
      {message !== "" && (
        <motion.div
          style={{
            position: "fixed",
            top: "20px",
            right: "25px",
            maxWidth: "300px",
          }}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <div
            onClick={() => setMessage("")}
            className="py-2 px-4 bg-red-600 text-white text-left flex items-center gap-1 rounded-lg"
          >
            <Icon path={mdiAlertCircleOutline} size={1} />
            <p className="capitalize">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessagesContainer;
