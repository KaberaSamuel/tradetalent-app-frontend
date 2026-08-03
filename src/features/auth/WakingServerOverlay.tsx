import { motion } from "framer-motion";
import Icon from "@mdi/react";
import { mdiServerNetwork } from "@mdi/js";

const dots = [0, 1, 2];

function WakingServerOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] h-screen w-screen flex flex-col justify-center items-center"
      style={{
        background: "linear-gradient(135deg, #f0fdfa 0%, #e6fffa 40%, #ccfbf1 100%)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex flex-col items-center gap-6 px-6"
      >
        {/* Server icon with glow */}
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full blur-2xl opacity-30"
            style={{ background: "#00bba7" }}
          />
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex items-center justify-center w-24 h-24 rounded-full"
            style={{ background: "linear-gradient(145deg, #00bba7, #009982)" }}
          >
            <Icon
              path={mdiServerNetwork}
              size={2.2}
              color="#ffffff"
            />
          </motion.div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-2 text-center max-w-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Waking up the server
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            This is the first request, it can take 1-3 minutes.
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex items-center gap-2 mt-2">
          {dots.map((i) => (
            <motion.span
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#00bba7" }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default WakingServerOverlay;
