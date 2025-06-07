"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const skills = [
  { name: "Python", level: 95 },
  { name: "Django", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "Tailwind CSS", level: 80 },
  { name: "Machine Learning", level: 75 },
];

const About = () => {
  return (
    <section className="w-full overflow-x-hidden bg-gradient-to-b from-[#0e0e0e] via-[#1c1b1a] to-[#0e0e0e] text-white py-20 px-4 sm:px-6 md:px-12">

      <div className="absolute z-0 w-[90vw] max-w-[650px] h-[650px] bg-blue-600 blur-[80px] opacity-30 rounded-full pointer-events-none" />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left: Profile Image */}
        <div className="w-full md:w-1/2 flex justify-center items-end">
          <div className="relative w-[360px] h-[360px] md:w-[420px] md:h-[420px] overflow-hidden rounded-4xl shadow-2xl border-2 border-white">
            <Image
              src="/profile-1.webp"
              alt="Punit Patel"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold">About Me</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            I'm <span className="text-white font-semibold">Punit Patel.</span>,
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
                className="bg-white/10 text-white px-4 py-1 rounded-full text-sm font-medium backdrop-blur border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Resume Button */}
          <Button variant="default" className="rounded-full px-6 py-2 mt-4">
            View Resume
          </Button>
        </div>
      </div>

      {/* Skills Progress Bars */}
      <div className="max-w-4xl mx-auto mt-20 space-y-6">
        <h3 className="text-2xl font-semibold mb-4">Skills</h3>
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-white">
                {skill.name}
              </span>
              <span className="text-sm text-gray-400">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-800 h-3 rounded-full">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-700"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
