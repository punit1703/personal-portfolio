"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
      <div className="relative w-full py-24 md:py-32 flex flex-col justify-center overflow-hidden bg-background text-foreground transition-colors duration-300">
        {/* Spotlight Blur Effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--primary)" />

        {/* Cursor-following Blob */}
        <motion.div
          className="absolute z-0 w-[650px] h-[650px] bg-[var(--primary)] blur-[100px] opacity-30 rounded-full pointer-events-none"
          animate={{
            x: position.x - 325,
            y: position.y - 325,
          }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            mass: 0.5,
          }}
        />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 mt-8 md:mt-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-6 border border-[var(--primary)]/20">
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"></span>
            Available for Freelance Work
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            Hi, I'm Punit.
          </h1>

          <TextGenerateEffect
            words="I Build Modern Websites & Web Applications"
            className="text-4xl md:text-6xl font-bold pt-4 mb-4"
          />

          <p className="text-lg md:text-xl text-muted-foreground pt-4 max-w-2xl mx-auto leading-relaxed">
            I help businesses, professionals, and individuals turn their ideas into fast, modern, and responsive digital experiences.
          </p>
          
          <p className="text-sm md:text-md text-muted-foreground mt-6 font-medium tracking-wide uppercase">
            Full-Stack Developer &middot; Next.js &middot; React &middot; Django &middot; Python
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full sm:w-auto justify-center">
            <button 
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/projects';
                }
              }}
              className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full hover:scale-105 transition-transform duration-300 font-bold shadow-lg w-full sm:w-auto"
            >
              View My Work
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="px-8 py-4 bg-transparent border border-[var(--border)] text-[var(--foreground)] rounded-full hover:border-[var(--primary)] transition-colors duration-300 font-bold shadow-sm w-full sm:w-auto"
            >
              Let's Work Together
            </button>
          </div>
        </div>
      </div>
      <hr className="border-t border-muted" />
    </>
  );
}

export default Hero;
