import React from "react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  previewLink?: string;
  githubLink: string;
  techStack?: string[];
  tags?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  previewLink,
  githubLink,
  techStack = [],
  tags = [],
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto my-10 bg-[#1c1b1a] rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-transform duration-300 hover:scale-[1.05]">
      <div className="flex flex-col md:flex-row">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-[16/9] md:h-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain md:object-cover"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center text-white">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">{title}</h1>
            <p className="text-zinc-400 text-sm sm:text-base">{description}</p>

            {/* Tech Stack */}
            {techStack.length > 0 && (
              <p className="text-xs text-gray-500 mt-4">
                <span className="font-medium text-gray-400">Tech Stack:</span>{" "}
                {techStack.join(", ")}
              </p>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-zinc-800 text-zinc-300 border border-zinc-700 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            {previewLink && (
              <a
                href={previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white border border-white hover:text-black hover:bg-white p-1.5 rounded-full transition duration-300"
              >
                <ExternalLink size={20} />
              </a>
            )}
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white border border-white hover:text-black hover:bg-white p-1.5 rounded-full transition duration-300"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
