"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import profileImage from "@/public/profile-1.webp";

const skills = [
  { name: "Python", level: 95 },
  { name: "Django", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "Tailwind CSS", level: 80 },
  { name: "Machine Learning", level: 75 },
];

const About = () => {
  return (
    <section className="relative w-full bg-background text-foreground py-20 px-4 sm:px-6 md:px-12 overflow-x-hidden">
      <div className="absolute -top-20 left-1/5 -translate-x-1/2 z-0 w-[700px] h-[700px] bg-[var(--primary)] blur-2xl opacity-30 rounded-full pointer-events-none" />

      {/* Main Grid */}
      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Profile Image */}
        <div className="w-full md:w-1/2 flex justify-center items-end">
          <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg border border-muted">
            <Image
              src={profileImage}
              alt="Punit Patel"
              width={400}
              height={400}
              placeholder="blur"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* About Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold">About Me</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            I'm{" "}
            <span className="text-foreground font-semibold">Punit Patel</span>,
            a passionate Pythonista and backend developer focused on crafting
            scalable web apps using Django, integrating smart ML features, and
            building fast UIs with Tailwind & Next.js.
          </p>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2">
            {[
              "Python",
              "Django",
              "Machine Learning",
              "REST APIs",
              "Next.js",
              "Tailwind CSS",
            ].map((tech, i) => (
              <span
                key={i}
                className="bg-muted text-muted-foreground px-4 py-1 rounded-full text-sm font-medium border border-border"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* View Resume Button */}
          <a
            href="/Punit's_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] rounded-full px-6 py-2 mt-4 transition-colors duration-200"
          >
            View Resume
          </a>
        </div>
      </div>

      {/* Skills Progress Bars */}
      <div className="max-w-4xl mx-auto mt-20 space-y-6">
        <h3 className="text-2xl font-semibold mb-4">Skills</h3>
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-foreground">
                {skill.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {skill.level}%
              </span>
            </div>
            <div className="w-full bg-muted h-3 rounded-full">
              <div
                className="bg-[var(--primary)] h-3 rounded-full transition-all duration-700"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
