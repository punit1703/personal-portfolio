import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/Hero";
import React from "react";

const projectdata = [
  {
    title: "Doc2Model - Linear Regression",
    description:
      "A smart machine learning project that automatically extracts data from documents and builds a linear regression model. Ideal for predictive analysis tasks such as pricing or trend forecasting.",
    imageUrl: "/project-1.png",
    githubLink: "https://github.com/your-repo",
    stack: ["Python", "Pandas", "Scikit-learn", "NumPy", "Matplotlib"],
    tag: ["Machine Learning", "Data Extraction", "Linear Regression"]
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
