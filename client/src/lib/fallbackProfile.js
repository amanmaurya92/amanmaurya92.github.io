/** Used when API is unreachable (e.g. static preview without backend). */
export const fallbackProfile = {
  name: "Aman",
  title: "Full-Stack Developer & Designer",
  tagline: "MERN stack",
  description:
    "Building apps with MongoDB, Express, React, and Node. Point VITE_API_URL at your running API for live data.",
  email: "amanthatdoescares@gmail.com",
  location: "India",
  socialLinks: {
    github: "https://github.com/amanthatdoescares",
    linkedin: "https://www.linkedin.com/in/aman-maurya-895963324/",
  },
  skills: {
    languages: ["JavaScript", "Java", "Python"],
    frontend: ["React", "HTML", "CSS", "Tailwind"],
    backend: ["Node.js", "Express"],
    database: ["MongoDB", "Mongoose"],
    mobile: ["Android"],
    tools: ["Git", "Figma", "Linux"],
    concepts: ["REST", "MERN"],
  },
  education: {
    degree: "Integrated Post Graduate",
    major: "B.Tech IT + MBA",
    status: "Student",
  },
  aboutParagraphs: [
    "This is fallback copy when the API is offline. Run the Express server locally or deploy it and set VITE_API_URL for production.",
  ],
  stats: [
    { label: "Stack", value: "MERN" },
    { label: "Mode", value: "Demo" },
  ],
  graphicDesign: {
    enabled: true,
    title: "Graphic Design",
    description: "Design work—content loads from the API when connected.",
    items: [],
  },
  availabilityBadge: "Run API for live data",
};

export const fallbackProjects = [
  {
    _id: "demo-1",
    title: "Start the API",
    shortDescription: "npm run dev in project root",
    description:
      "This card shows when the frontend cannot reach /api/projects. Run Express on port 5000 (or set VITE_API_URL) so projects load from data/projects.json.",
    technologies: ["MongoDB", "Express", "React", "Node"],
    category: "web",
    isFeatured: true,
    githubUrl: "https://github.com/amanthatdoescares",
    status: "completed",
    features: [
      "MERN-style REST API",
      "express-validator",
      "JSON storage under data/ (MongoDB-ready patterns)",
    ],
  },
];
