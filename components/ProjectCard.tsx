"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ project, onClick }: { project: any, onClick: () => void }) {
  return (
    <motion.div 
      layoutId={`card-${project.title}`}
      onClick={onClick}
      className="w-full cursor-pointer bg-[var(--card)] text-[var(--card-foreground)] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-[var(--border)] transition-all hover:scale-[1.02]"
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-5/12 relative overflow-hidden bg-gradient-to-br from-[var(--primary)]/10 via-[var(--background)] to-[var(--accent)]/10 flex items-center justify-center p-8 border-b sm:border-b-0 sm:border-r border-[var(--border)] h-48 md:h-auto">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(var(--primary) 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}></div>
          <motion.h2 layoutId={`title-${project.title}`} className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-[var(--muted-foreground)] opacity-20 z-10 text-center tracking-tighter">
            {project.title.split(' ').map((w: string) => w[0]).join('').substring(0,3).toUpperCase()}
          </motion.h2>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[var(--primary)] rounded-full blur-[80px] opacity-20"></div>
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-[var(--accent)] rounded-full blur-[80px] opacity-20"></div>
        </div>

        <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col justify-center bg-[var(--card)]">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">{project.title}</h1>
          <p className="text-[var(--muted-foreground)] text-base line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags?.map((tag: string, index: number) => (
              <span key={index} className="text-xs bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)] px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
