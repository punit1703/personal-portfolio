// hooks/useCurrentTime.js
"use client";
import { useEffect, useState } from "react";

export function useCurrentTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const formatted = `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
      setTime(formatted);
    };

    update(); // initial call
    const interval = setInterval(update, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  return time;
}
