"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { X, ExternalLink, Github } from "lucide-react";

export default function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  const selectedProject: any = projects.find((p: any) => p.title === selectedId);

  return (
    <div className="space-y-8 py-10 px-4 relative max-w-6xl mx-auto min-h-screen">
      <h1 className="font-bold text-4xl text-center my-10">My Projects</h1>
      
      <div className="grid grid-cols-1 gap-10">
        {projects.length === 0 && (
          <p className="text-center text-[var(--muted-foreground)]">Loading projects...</p>
        )}
        {projects.map((project: any) => (
          <ProjectCard 
            key={project.title} 
            project={project} 
            onClick={() => setSelectedId(project.title)} 
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 cursor-pointer"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
              <motion.div 
                layoutId={`card-${selectedProject.title}`}
                className="w-full max-w-4xl bg-[var(--card)] text-[var(--card-foreground)] rounded-3xl overflow-hidden shadow-2xl pointer-events-auto relative border border-[var(--border)] max-h-[90vh] overflow-y-auto"
              >
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-white hover:text-black transition"
                >
                  <X size={24} />
                </button>

                <div className="w-full h-64 md:h-80 relative overflow-hidden bg-gradient-to-br from-[var(--primary)]/20 via-[var(--background)] to-[var(--accent)]/20 flex items-center justify-center border-b border-[var(--border)]">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(var(--primary) 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}></div>
                  <motion.h2 layoutId={`title-${selectedProject.title}`} className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-[var(--muted-foreground)] opacity-20 z-10 text-center tracking-tighter">
                    {selectedProject.title.split(' ').map((w: string) => w[0]).join('').substring(0,3).toUpperCase()}
                  </motion.h2>
                  <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[var(--primary)] rounded-full blur-[80px] opacity-30"></div>
                  <div className="absolute -top-20 -left-20 w-60 h-60 bg-[var(--accent)] rounded-full blur-[80px] opacity-30"></div>
                </div>

                <div className="p-8 md:p-12">
                  <h1 className="text-3xl sm:text-5xl font-bold mb-4">{selectedProject.title}</h1>
                  <p className="text-[var(--muted-foreground)] text-lg sm:text-xl leading-relaxed mb-8">
                    {selectedProject.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack?.map((tech: string, i: number) => (
                        <span key={i} className="px-4 py-2 bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 rounded-xl font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    {selectedProject.previewLink && (
                      <a href={selectedProject.previewLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-[var(--foreground)] text-[var(--background)] py-4 rounded-xl flex items-center justify-center gap-2 font-bold hover:opacity-90 transition">
                        <ExternalLink size={20} /> View Live
                      </a>
                    )}
                    <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 border-2 border-[var(--border)] hover:border-[var(--primary)] text-[var(--foreground)] py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition">
                      <Github size={20} /> Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
