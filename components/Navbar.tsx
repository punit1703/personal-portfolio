"use client";

import { useState } from "react";
import { Moon, Sun, MousePointerClick } from "lucide-react";
import Link from "next/link";
import { useCurrentTime } from "@/hooks/useCurrentTime";

import React from 'react'

function Navbar() {
  const [hovered, setHovered] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const time = useCurrentTime();
  return (
    <>
    {/* Time - Top Right */}
        <div className="hidden sm:block absolute top-6 right-6 text-sm sm:text-base text-gray-400 font-medium z-20">

          Based in Gandhinagar → <span className="text-white">{time}</span>
        </div>
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50
        bg-white/10 border border-white/10 backdrop-blur-md
        shadow-lg text-white rounded-full
        flex items-center justify-between
        px-2 py-1 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
        ${hovered ? "w-[380px] sm:w-[520px]" : "w-[120px]"}`}
    >
      <Link href="/" className="text-lg px-2 font-bold tracking-wide shrink-0 text-center hover:bg-white/20 transition-colors rounded-full">P</Link>

      <div
        className={`absolute left-1/2 -translate-x-1/2 flex gap-6 md:gap-11 transition-all duration-300 ${
          hovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <NavLink href="/about" label="About" />
        <NavLink href="/#projects" label="Projects" />
        <NavLink href="/contact" label="Contact" />
      </div>

      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="p-2 hover:bg-white/20 rounded-full transition-colors shrink-0"
      >
        <MousePointerClick/>
      </button>
    </div>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-md font-bold text-gray-400 hover:text-white transition-colors  duration-300"
    >
      {label}
    </Link>
  );
}

export default Navbar;