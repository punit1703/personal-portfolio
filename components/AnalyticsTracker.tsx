"use client";
import { useEffect } from "react";

export default function AnalyticsTracker() {
  useEffect(() => {
    fetch("/api/analytics", { method: "POST" }).catch(console.error);
  }, []);
  return null;
}
