import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
export const WAKE_DELAY = 2000;
const RETRY_DELAY = 5000;

const checkServer = (): Promise<boolean> => {
  return fetch(`${API_URL}/ping/`, { method: "GET" })
    .then((response) => response.ok)
    .catch(() => false);
};

export const useServerWake = () => {
  const [isWaking, setIsWaking] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let showOverlayTimer: ReturnType<typeof setTimeout> | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const startChecking = async () => {
      // Show the overlay if the server hasn't responded within the delay
      showOverlayTimer = setTimeout(() => {
        if (isMounted && isChecking) {
          setIsWaking(true);
        }
      }, WAKE_DELAY);

      const isUp = await checkServer();

      if (!isMounted) return;

      if (showOverlayTimer !== null) {
        clearTimeout(showOverlayTimer);
      }

      if (isUp) {
        setIsWaking(false);
        setIsChecking(false);
      } else {
        // Server still waking up (or rebooting): retry in the background
        retryTimer = setTimeout(startChecking, RETRY_DELAY);
      }
    };

    startChecking();

    return () => {
      isMounted = false;
      if (showOverlayTimer !== null) {
        clearTimeout(showOverlayTimer);
      }
      if (retryTimer !== null) {
        clearTimeout(retryTimer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isWaking, isChecking };
};
