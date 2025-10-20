import { useEffect } from "react";

const STORAGE_KEY = "lastAlertTimestamp";
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const useDailyAlert = (message: string) => {
  useEffect(() => {
    const lastTimestamp = localStorage.getItem(STORAGE_KEY);
    const now = new Date().getTime();
    const hasNeverSeenAlert = !lastTimestamp;
    const hasDayPassed = now - parseInt(lastTimestamp!, 10) > ONE_DAY_IN_MS;

    if (hasNeverSeenAlert || hasDayPassed) {
      // Show the alert
      alert(message);

      // Store the new timestamp
      localStorage.setItem(STORAGE_KEY, now.toString());
    }
  }, [message]);
};

export default useDailyAlert;
