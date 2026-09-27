export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  tags: string[];
  githubLink?: string;
  previewLink?: string;
  screenshots: string[];
}

export const projects: Project[] = [
  {
    id: "9",
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website featuring a clean dark-mode design, smooth animations, and a secure contact system.",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    tags: ["Featured", "Frontend", "Web App"],
    githubLink: "https://github.com/punit1703/personal-portfolio",
    previewLink: "https://personal-portfolio-uk6i.vercel.app/",
    screenshots: [
      "/projects/portfolio/1.png",
      "/projects/portfolio/2.png"
    ]
  },
  {
    id: "8",
    title: "AI Resume & Portfolio Builder",
    description: "An intelligent web application that helps professionals quickly generate ATS-friendly resumes, personalized cover letters, and portfolio content using AI.",
    techStack: ["Python", "Streamlit", "Google Gemini API", "Pandas", "Python-Docx"],
    tags: ["AI", "Web App"],
    githubLink: "https://github.com/punit1703/AI-Resume-Portfolio-Builder",
    previewLink: "https://punit1703-ai-resume-portfolio-builder-app-mqc3fo.streamlit.app/",
    screenshots: [
      "/projects/resume_builder/1.png",
    ]
  },
  {
    id: "5",
    title: "Doc2Model - Classification",
    description: "A machine learning tool that automatically trains and evaluates classification models directly from uploaded structured document data.",
    techStack: ["Python", "scikit-learn", "Matplotlib"],
    tags: ["ML"],
    githubLink: "https://github.com/punit1703/Doc2Model-Classification",
    screenshots: []
  },
  {
    id: "4",
    title: "Doc2Model - Linear Regression",
    description: "A data science utility that lets users upload CSV files to automatically generate and evaluate predictive regression models.",
    techStack: ["Python", "pandas", "scikit-learn"],
    tags: ["ML"],
    githubLink: "https://github.com/punit1703/Doc2Model-Linear-Regression",
    screenshots: []
  },
  {
    id: "3",
    title: "Smart ETL Pipeline",
    description: "An automated data processing system that securely extracts, cleans, and transforms raw business data for reliable reporting and analysis.",
    techStack: ["Python", "Pandas", "NumPy", "PostgreSQL", "Django REST Framework", "SQL", "Scikit-learn"],
    tags: ["Featured", "Data Engineering", "Backend"],
    githubLink: "https://github.com/punit1703/smart-etl-pipeline",
    previewLink: "https://smart-etl-pipeline.onrender.com/",
    screenshots: [
      "/projects/etl_pipeline/image.png",
    ]
  },
  {
    id: "2",
    title: "Resume ATS Ranker",
    description: "An AI-powered recruitment platform that automatically screens and ranks candidate resumes against job descriptions to streamline the hiring process.",
    techStack: ["React.js", "Django REST Framework", "PostgreSQL", "Python", "JWT Authentication", "TF-IDF", "Scikit-learn"],
    tags: ["Featured", "AI", "Full Stack", "Web App"],
    githubLink: "https://github.com/punit1703/resumeranker",
    previewLink: "https://resumeranker-mu.vercel.app/",
    screenshots: [
      "/projects/resume_ranker/1.png",
      "/projects/resume_ranker/2.png",
    ]
  },
  {
    id: "1",
    title: "University Landing Page",
    description: "A fast, responsive, and visually engaging landing page designed to attract prospective students and showcase academic programs.",
    techStack: ["Next.js", "React.js", "Tailwind CSS", "JavaScript"],
    tags: ["Featured", "Frontend", "Web Design"],
    githubLink: "https://github.com/punit1703/university-landing-nextjs",
    previewLink: "https://university-landing-nextjs-b1rq.vercel.app/",
    screenshots: [
      "/projects/university-landing-page/1.png",
      "/projects/university-landing-page/2.png",
      
    ]
  }
];
