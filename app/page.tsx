import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/Hero";
import React from "react";

const projectdata = [
  {
      title: "Doc2Model - Linear Regression",
      description: "Auto-generate linear regression models from CSV files using scikit-learn and pandas.",
      imageUrl: "/project/linear-regression.png",
      githubLink: "https://github.com/yourusername/doc2model-linear",
      stack: ["Python", "pandas", "scikit-learn"],
      tag: "Featured",
      previewLink: null,
    },
    {
      title: "Doc2Model - Classification",
      description: "Train classification models from structured document data with performance metrics.",
      imageUrl: "/project/classification.png",
      githubLink: "https://github.com/yourusername/doc2model-classification",
      stack: ["Python", "scikit-learn", "Matplotlib"],
      tag: "ML",
      previewLink: null,
    },
    {
      title: "TaskMaster (ToDo App)",
      description: "Fullstack ToDo app with Django, user auth, filtering, and stats dashboard.",
      imageUrl: "/project/TaskMaster.png",
      githubLink: "https://github.com/yourusername/taskmaster",
      stack: ["Django", "Tailwind CSS", "SQLite"],
      tag: "Web App",
      previewLink: 'https://taskmaster-b4id.onrender.com/',
    },
    {
      title: "Personal Portfolio Website",
      description: "Responsive dark-themed portfolio built with Next.js and Tailwind CSS.",
      imageUrl: "/project/portfolio.png",
      githubLink: "https://github.com/yourusername/portfolio",
      stack: ["Next.js", "Tailwind CSS"],
      tag: "Frontend",
      previewLink: null,
    },
];
export default function Home() {
  return (
    <>
      <Hero />
      <div id="projects">
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
      </div>
    </>
  );
}
