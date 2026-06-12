"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import profileImage from "@/public/profile-1.webp";
import { Code2, Database, BrainCircuit, Rocket, FileText, ChevronRight } from "lucide-react";

const skills = [
  "Python", "Django", "Next.js", "Tailwind CSS", 
  "Machine Learning", "REST APIs", "PostgreSQL", "Docker", "Git", "React"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const About = () => {
  return (
    <section className="relative w-full bg-[var(--background)] text-[var(--foreground)] py-24 px-4 sm:px-6 md:px-12 overflow-hidden min-h-screen flex items-center">
      {/* Ambient Background Effects - Hidden on mobile to prevent lag */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-[var(--primary)] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-[var(--accent)] rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{ backgroundImage: "radial-gradient(var(--foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-black text-5xl md:text-7xl tracking-tight mb-6"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">Me</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-24 h-1.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] mx-auto rounded-full opacity-80"
          ></motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Bento Box 1: Identity */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-1 md:row-span-2 group relative bg-[var(--card)]/80 md:bg-[var(--card)]/40 backdrop-blur-none md:backdrop-blur-xl rounded-3xl overflow-hidden border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col will-change-transform"
          >
            <div className="w-full h-72 md:h-1/2 relative overflow-hidden bg-[var(--muted)]">
              <Image
                src={profileImage}
                alt="Punit Patel"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                placeholder="blur"
                className="group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)] via-[var(--card)]/40 to-transparent"></div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-center relative z-10 -mt-16">
              <h3 className="text-3xl font-bold mb-2">Punit Patel</h3>
              <p className="text-[var(--primary)] font-medium mb-4 flex items-center gap-2">
                <Code2 size={18} /> Backend & Full-Stack
              </p>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                A passionate Pythonista focused on crafting scalable web apps using Django, integrating smart ML features, and building fast UIs with modern tech like Next.js and Tailwind.
              </p>
            </div>
          </motion.div>

          {/* Bento Box 2: Tech Stack */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 md:row-span-1 group relative bg-[var(--card)]/80 md:bg-[var(--card)]/40 backdrop-blur-none md:backdrop-blur-xl rounded-3xl p-8 border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden will-change-transform"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity group-hover:rotate-12 duration-700 text-[var(--foreground)]">
              <Database size={150} />
            </div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <BrainCircuit className="text-[var(--primary)]" /> My Arsenal
            </h3>
            <div className="flex flex-wrap gap-3 relative z-10">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-[var(--background)]/90 text-[var(--foreground)] px-4 py-2 rounded-xl text-sm font-medium border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all duration-300 cursor-default shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Bento Box 3: Philosophy */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-1 md:row-span-1 group relative bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/5 bg-[var(--card)]/80 md:bg-transparent backdrop-blur-none md:backdrop-blur-xl rounded-3xl p-8 border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-center will-change-transform"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Rocket className="text-[var(--primary)]" size={24} /> Philosophy
            </h3>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
              I believe in writing clean, maintainable code that solves real problems. Performance and user experience are always at the forefront of my mind.
            </p>
          </motion.div>

          {/* Bento Box 4: Resume CTA */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-1 md:row-span-1 group relative bg-[var(--card)]/80 md:bg-[var(--card)]/40 backdrop-blur-none md:backdrop-blur-xl rounded-3xl p-8 border border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden will-change-transform"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--accent)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <FileText size={48} className="mb-4 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors duration-300 relative z-10" />
            <h3 className="text-xl font-bold mb-6 relative z-10">Want to know more?</h3>
            <a
              href="/Punit's_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-2 bg-[var(--foreground)] text-[var(--background)] px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-xl"
            >
              View Resume <ChevronRight size={18} />
            </a>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
