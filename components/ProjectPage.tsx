"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { Project, projects } from "../data/projects";
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, LayoutTemplate, MousePointerClick, AppWindow, Sparkles } from "lucide-react";
import Image from "next/image";

export default function ProjectPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedId]);

  const selectedProject: Project | undefined = projects.find((p: Project) => p.title === selectedId);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--background)]">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--primary)] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[var(--accent)] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      </div>

      <div className="space-y-8 py-10 px-4 relative z-10 max-w-6xl mx-auto">
        <div className="text-center my-16 relative">
          <h1 className="font-black text-5xl md:text-7xl mb-6 tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">Projects</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mx-auto rounded-full mb-6 opacity-80"></div>
        </div>
      
        <div id="projects" className="scroll-mt-24"></div>
        {projects.length === 0 && (
          <p className="text-center text-[var(--muted-foreground)]">Loading projects...</p>
        )}
        
        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-10">
            {projects.filter(p => p.tags.includes('Featured')).map((project: Project) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                onClick={() => setSelectedId(project.title)} 
              />
            ))}
          </div>
        </div>

        {/* More Projects */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-8 text-[var(--muted-foreground)]">More Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.filter(p => !p.tags.includes('Featured')).map((project: Project) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                onClick={() => setSelectedId(project.title)} 
              />
            ))}
          </div>
        </div>

        {/* What I Can Build Section */}
        <div className="py-20 border-t border-[var(--border)]">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">What I Can Build</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mx-auto rounded-full opacity-80"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard 
              icon={<LayoutTemplate size={32} className="text-[var(--primary)]" />}
              title="Business Websites"
              desc="Modern, responsive websites for businesses, professionals and personal brands."
            />
            <ServiceCard 
              icon={<MousePointerClick size={32} className="text-[var(--primary)]" />}
              title="Landing Pages"
              desc="Focused landing pages for products, services, startups and campaigns."
            />
            <ServiceCard 
              icon={<AppWindow size={32} className="text-[var(--primary)]" />}
              title="Web Applications"
              desc="Full-stack applications with dashboards, authentication, APIs and databases."
            />
            <ServiceCard 
              icon={<Sparkles size={32} className="text-[var(--primary)]" />}
              title="AI-Powered Apps"
              desc="AI integrations, automation and intelligent web applications."
            />
          </div>
        </div>

        {/* Final CTA */}
        <div className="py-20 mb-10 text-center bg-gradient-to-br from-[var(--card)] to-[var(--background)] border border-[var(--border)] rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--primary)] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10">Have a project in mind?</h2>
          <p className="text-lg md:text-xl text-[var(--muted-foreground)] mb-2 max-w-2xl mx-auto relative z-10">
            Let's turn your idea into a modern, functional website or web application.
          </p>
          <p className="text-base md:text-lg text-[var(--muted-foreground)]/80 mb-10 max-w-2xl mx-auto relative z-10">
            Tell me what you're building and let's discuss it.
          </p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="relative z-10 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full hover:scale-105 transition-transform duration-300 font-bold shadow-lg text-lg"
          >
            Start a Project
          </button>
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
                className="w-full max-w-4xl bg-[var(--card)] text-[var(--card-foreground)] rounded-3xl overflow-hidden shadow-2xl pointer-events-auto relative border border-[var(--border)] max-h-[90vh] flex flex-col"
              >
                <div className="w-full overflow-y-auto hide-scrollbar relative flex-1">
                  <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-white hover:text-black transition"
                >
                  <X size={24} />
                </button>

                <div className="w-full h-64 md:h-96 relative overflow-hidden bg-gradient-to-br from-[var(--primary)]/20 via-[var(--background)] to-[var(--accent)]/20 flex items-center justify-center border-b border-[var(--border)]">
                  {selectedProject.screenshots && selectedProject.screenshots.length > 0 ? (
                    <>
                      <motion.div layoutId={`image-${selectedProject.title}`} className="absolute inset-0 w-full h-full">
                        <Image 
                          src={selectedProject.screenshots[currentImageIndex]} 
                          alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`} 
                          fill 
                          className="object-cover"
                        />
                      </motion.div>
                      
                      {selectedProject.screenshots.length > 1 && (
                        <>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : selectedProject.screenshots!.length - 1)); }}
                            className="absolute left-4 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-white hover:text-black transition"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev < selectedProject.screenshots!.length - 1 ? prev + 1 : 0)); }}
                            className="absolute right-4 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-white hover:text-black transition"
                          >
                            <ChevronRight size={24} />
                          </button>
                          <div className="absolute bottom-4 z-20 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md">
                            {currentImageIndex + 1} / {selectedProject.screenshots.length}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(var(--primary) 1.5px, transparent 1.5px)", backgroundSize: "24px 24px" }}></div>
                      <motion.h2 layoutId={`title-${selectedProject.title}`} className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-[var(--muted-foreground)] opacity-20 z-10 text-center tracking-tighter">
                        {selectedProject.title.split(' ').map((w: string) => w[0]).join('').substring(0,3).toUpperCase()}
                      </motion.h2>
                      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[var(--primary)] rounded-full blur-[80px] opacity-30"></div>
                      <div className="absolute -top-20 -left-20 w-60 h-60 bg-[var(--accent)] rounded-full blur-[80px] opacity-30"></div>
                    </>
                  )}
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
                        <ExternalLink size={20} /> Live Demo
                      </a>
                    )}
                    {selectedProject.githubLink && (
                      <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 border-2 border-[var(--border)] hover:border-[var(--primary)] text-[var(--foreground)] py-4 rounded-xl flex items-center justify-center gap-2 font-bold transition">
                        <Github size={20} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-[var(--card)]/40 backdrop-blur-xl border border-[var(--border)] p-8 rounded-3xl flex flex-col items-start hover:border-[var(--primary)]/50 transition-colors duration-500 shadow-sm hover:shadow-md">
      <div className="p-4 bg-[var(--primary)]/10 rounded-2xl mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-[var(--muted-foreground)] leading-relaxed text-sm">
        {desc}
      </p>
    </div>
  );
}
