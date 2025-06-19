"use client";

import React, { useEffect, useState } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Spotlight } from "@/components/ui/spotlight";

function Hero() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
        {/* Spotlight Blur Effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--primary)" />

        {/* Cursor-following Blob */}
        <div
          className="absolute z-0 w-[650px] h-[650px] bg-[var(--primary)] blur-[80px] opacity-45 rounded-full pointer-events-none transition-transform duration-[5s]"
          style={{
            transform: `translate(${position.x - 160}px, ${position.y - 160}px)`,
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto h-full px-6">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Hi! this is Punit.
          </h1>

          <TextGenerateEffect
            words="Building Smart Solutions with Code"
            className="text-4xl md:text-5xl font-bold pt-4"
          />

          <p className="text-md text-muted-foreground pt-2">
            Pythonista | ML Enthusiast | Backend Developer
          </p>
        </div>
      </div>
      <hr className="border-t border-muted" />
    </>
  );
}

export default Hero;
