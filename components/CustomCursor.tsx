"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      className="custom-arrow-cursor"
      animate={{
        x: pos.x - 14, // half of width
        y: pos.y - 14, // half of height
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="var(--primary)"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-cursor-icon"
      >
        <path
          d="M4 4L20 12L4 20L8 12L4 4Z"
          stroke="var(--foreground)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}