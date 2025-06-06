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
      <div className="relative w-full h-screen overflow-hidden bg-black text-white">
        {/* Spotlight Blur Effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

        

        {/* Cursor-following Blob */}
        <div
          className="absolute z-0 w-[650px] h-[650px] bg-blue-600 blur-[80px] opacity-30 rounded-full pointer-events-none transform duration-[5s]"
          style={{
            transform: `translate(${position.x - 160}px, ${position.y - 160}px)`,
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto h-full px-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Hi! this is Punit.
          </h1>

          <TextGenerateEffect
            words="Building Smart Solutions with Code"
            className="text-4xl md:text-5xl font-bold pt-4"
          />

          <p className="text-md text-gray-400 pt-2">
            Pythonista | ML Enthusiast | Backend Developer
          </p>
        </div>
      </div>
      <hr className="bg-white" />
    </>
  );
}

export default Hero;
