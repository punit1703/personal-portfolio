import Hero from "@/components/Hero";
import ProjectPage from "@/components/ProjectPage";
import React from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="projects">
        <h1 className="font-bold text-3xl text-center my-7">My Projects</h1>
        <ProjectPage />
      </div>
    </>
  );
}
