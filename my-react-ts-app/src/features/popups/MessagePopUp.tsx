import Icon from "@mdi/react";
import { mdiAlertCircleOutline } from "@mdi/js";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { messageSelector, clearMessage } from "./messageSlicePopUp";
import { useEffect } from "react";

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
const MessagePopup = () => {
  const message = useAppSelector(messageSelector);
  const dispatch = useAppDispatch();

  // clearing message after one second after rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearMessage());
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
            onClick={() => clearMessage()}
            className="py-2.5 px-4 bg-red-600 text-white text-left leading-tight flex items-start rounded-lg"
          >
            <MessageIcon isSmall={message.length <= 50} />
            <p>{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessagePopup;
