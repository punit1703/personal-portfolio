import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/Hero";
import React from "react";

const projectdata = [
  {
    title: "TaskMaster",
    description:
      "A sleek and responsive task management web app built with Django and Tailwind CSS. Features include user authentication, task filtering, search, statistics tracking, and a mobile-optimized UI.",
    imageUrl: "/project-1.png",
    previewLink: "https://taskmaster-b4id.onrender.com/",
    githubLink: "https://github.com/your-repo",
  },
  {
    title: "Doc2Model linear regression",
    description:
      "A sleek and responsive task management web app built with Django and Tailwind CSS. Features include user authentication, task filtering, search, statistics tracking, and a mobile-optimized UI.",
    imageUrl: "/project-1.png",
    previewLink: "https://taskmaster-b4id.onrender.com/",
    githubLink: "https://github.com/your-repo",
  },
];
export default function Home() {
  return (
    <>
      <Hero />
      <h1 className="font-bold text-3xl text-center my-7">My Projects</h1>
      {projectdata.map((data) => (
        <ProjectCard
          key={data.title}
          title={data.title}
          description={data.description}
          imageUrl={data.imageUrl}
          previewLink={data.previewLink}
          githubLink={data.githubLink}
        />
      ))}
    </>
  );
}
