import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/Hero";
import React from "react";

const projectdata = [
  {
    title:'TaskMaster',
    description:"A sleek and responsive task management web app built with Django and Tailwind CSS. Features include user authentication, task filtering, search, statistics tracking, and a mobile-optimized UI.",
    imageUrl:"/project-1.png",
    previewLink:"https://taskmaster-b4id.onrender.com/",
    githubLink:"https://github.com/your-repo",
  },
  {
    title:'TaskMaster',
    description:"A sleek and responsive task management web app built with Django and Tailwind CSS. Features include user authentication, task filtering, search, statistics tracking, and a mobile-optimized UI.",
    imageUrl:"/project-1.png",
    previewLink:"https://taskmaster-b4id.onrender.com/",
    githubLink:"https://github.com/your-repo",
  }
]

function HomePage() {
  return (
    <>
      <Hero />
      {projectdata.map((data) => {
        <ProjectCard
          title={data.title}
          description={data.description}
          imageUrl={data.imageUrl}
          previewLink={data.previewLink}
          githubLink={data.githubLink}
        />
      })}
      {/* <Footer/> */}
    </>
  );
}

export default HomePage;