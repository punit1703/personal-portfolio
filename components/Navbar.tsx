"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useCurrentTime } from "@/hooks/useCurrentTime";

function Navbar() {
  const [hovered, setHovered] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const time = useCurrentTime();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <div className="hidden sm:block absolute top-6 right-6 text-sm sm:text-base text-muted-foreground font-medium z-20">
        Based in Gandhinagar →{" "}
        <span className="text-foreground">{time}</span>
      </div>

      <div
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50
        bg-[var(--muted)]/50 backdrop-blur-md
        shadow-lg text-[var(--foreground)] rounded-full
        flex items-center justify-between
        px-3 py-2 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
        ${!isMobile && !hovered ? "w-[120px]" : "w-[380px] sm:w-[520px]"}`}
      >
        <Link
          href="/"
          className="text-lg px-2 font-bold tracking-wide shrink-0 text-center hover:bg-[var(--muted)]/40 transition-colors rounded-full"
        >
          P
        </Link>

        <div
          className={`absolute left-1/2 -translate-x-1/2 flex gap-6 md:gap-11 transition-all duration-300 ${
            !isMobile && !hovered ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <NavLink href="/about" label="About" />
          <NavLink href="/projects" label="Projects" />
          <NavLink href="/contact" label="Contact" />
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-[var(--muted)]/40 rounded-full transition-colors shrink-0"
          aria-label="Toggle Theme"
        >
          {mounted && resolvedTheme === "dark" ? (
            <Sun size={18} className="text-yellow-400" />
          ) : (
            <Moon size={18} className="text-gray-900" />
          )}
        </button>
      </div>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="text-md font-bold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-300"
    >
      {label}
    </Link>
  );
}

export default Navbar;
