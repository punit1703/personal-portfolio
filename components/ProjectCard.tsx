import React from "react";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  previewLink?: string;
  githubLink: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  previewLink,
  githubLink,
}) => {
  return (
    <div className="w-full max-w-5xl sm:h-[300px] mx-auto my-10 bg-[#1c1b1a] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out">
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-72 sm:h-full overflow-hidden relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto md:h-[120%] object-cover absolute top-0 left-0"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-white">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-zinc-400 text-sm">{description}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-7">
            {previewLink && (
              <a
                href={previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white border-1 border-white hover:text-black transition hover:bg-white p-1.5 rounded-full duration-300"
              >
                <ExternalLink size={24} />
              </a>
            )}
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border-1 border-white hover:text-black transition hover:bg-white p-1.5 rounded-full duration-300"
            >
              <Github size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
