"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ProjectCard({ project, onClick }: { project: any, onClick: () => void }) {
  return (
    <motion.div 
      layoutId={`card-${project.title}`}
      onClick={onClick}
      className="group w-full cursor-pointer bg-[var(--card)]/60 backdrop-blur-xl text-[var(--card-foreground)] rounded-3xl overflow-hidden shadow-lg hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-500 hover:-translate-y-2"
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="w-full md:w-5/12 relative overflow-hidden bg-gradient-to-br from-[var(--primary)]/10 via-transparent to-[var(--accent)]/10 flex items-center justify-center p-8 border-b sm:border-b-0 sm:border-r border-[var(--border)] group-hover:border-[var(--primary)]/30 transition-colors duration-500 h-48 md:h-auto">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(var(--primary) 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}></div>
          <motion.h2 layoutId={`title-${project.title}`} className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-[var(--muted-foreground)] opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 ease-out z-10 text-center tracking-tighter">
            {project.title.split(' ').map((w: string) => w[0]).join('').substring(0,3).toUpperCase()}
          </motion.h2>
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[var(--primary)] rounded-full blur-[80px] opacity-20"></div>
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-[var(--accent)] rounded-full blur-[80px] opacity-20"></div>
        </div>

        <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col justify-center bg-transparent">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">{project.title}</h1>
          <p className="text-[var(--muted-foreground)] text-base line-clamp-2">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags?.map((tag: string, index: number) => (
              <span key={index} className="text-xs bg-[var(--muted)]/50 backdrop-blur-sm text-[var(--muted-foreground)] border border-[var(--border)] px-3 py-1 rounded-full group-hover:border-[var(--primary)]/40 group-hover:text-[var(--foreground)] transition-all duration-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
