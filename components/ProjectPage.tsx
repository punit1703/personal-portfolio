"use client";

import React, { Suspense } from "react";
const LazyProjectCard = React.lazy(() => import("./ProjectCard"));

const projectdata = [
  {
    title: "Doc2Model - Linear Regression",
    description:
      "Auto-generate linear regression models from CSV files using scikit-learn and pandas.",
    imageUrl: "/project/linear-regression.jpg",
    githubLink: "https://github.com/punit1703/Doc2Model-Linear-Regression",
    techStack: ["Python", "pandas", "scikit-learn"],
    tags: ["Featured"],
    previewLink: undefined,
  },
  {
    title: "Doc2Model - Classification",
    description:
      "Train classification models from structured document data with performance metrics.",
    imageUrl: "/project/classification.jpg",
    githubLink: "https://github.com/punit1703/Doc2Model-Classification",
    techStack: ["Python", "scikit-learn", "Matplotlib"],
    tags: ["ML"],
    previewLink: undefined,
  },
  {
    title: "TaskMaster (ToDo App)",
    description:
      "Fullstack ToDo app with Django, user auth, filtering, and stats dashboard.",
    imageUrl: "/project/TaskMaster.jpg",
    githubLink: "https://github.com/punit1703/TaskMaster",
    techStack: ["Django", "Tailwind CSS", "SQLite"],
    tags: ["Web App"],
    previewLink: "https://taskmaster-b4id.onrender.com/",
  },
  {
    title: "Personal Portfolio Website",
    description:
      "Responsive dark-themed portfolio built with Next.js and Tailwind CSS.",
    imageUrl: "/project/portfolio.jpg",
    githubLink: "https://github.com/punit1703/personal-portfolio",
    techStack: ["Next.js", "Tailwind CSS"],
    tags: ["Frontend"],
    previewLink: "https://personal-portfolio-uk6i.vercel.app/",
  },
];

function ProjectPage() {
  return (
    <div className="space-y-8 py-10 px-4">
      <h1 className="font-bold text-3xl text-center my-7">My Projects</h1>
      <Suspense
        fallback={
          <p className="text-center text-[var(--foreground)]">
            Loading projects...
          </p>
        }
      >
        {projectdata.map((data) => (
          <LazyProjectCard
            key={data.title}
            title={data.title}
            description={data.description}
            imageUrl={data.imageUrl}
            previewLink={data.previewLink}
            githubLink={data.githubLink}
            techStack={data.techStack}
            tags={data.tags}
          />
        ))}
      </Suspense>
    </div>
  );
}

export default ProjectPage;
