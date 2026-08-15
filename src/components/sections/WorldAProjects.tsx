"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Layers } from "lucide-react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Aurora Subsystem",
    description: "A high-frequency distributed message queue built for extreme throughput and sub-millisecond latency.",
    tech: ["Rust", "gRPC", "React", "PostgreSQL"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Nexus Core UI",
    description: "Component library and design system powering 40+ internal applications with complex state management.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
];

function ProjectCard({ project, index, scrollYProgress }: { project: any, index: number, scrollYProgress: MotionValue<number> }) {
  // We can calculate revealing effects based on index and scroll progress
  const start = 0.1 + (index * 0.4);
  const opacity = useTransform(scrollYProgress, [start, start + 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [start, start + 0.2], [100, 0]);

  return (
    <motion.div 
      className="relative w-full max-w-5xl mx-auto mb-32 flex flex-col md:flex-row gap-8 items-center group"
      style={{ opacity, y }}
    >
      <div className="flex-1 w-full relative aspect-video md:aspect-[4/3] rounded-none overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-accent-cyan/10 mix-blend-overlay z-10 transition-opacity group-hover:opacity-0" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        {/* Architectural Layers representation on hover */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex flex-col justify-end p-6 bg-gradient-to-t from-background/90 to-transparent">
          <div className="flex gap-2 text-xs font-mono text-accent-cyan">
            <Layers className="w-4 h-4" />
            <span>Architecture Layer Revealed</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col justify-center">
        <div className="flex gap-3 text-xs font-mono text-white/50 mb-4">
          {project.tech.map((t: string) => (
            <span key={t} className="px-2 py-1 border border-white/10 rounded-none bg-white/5">
              {t}
            </span>
          ))}
        </div>
        <h3 className="text-3xl md:text-5xl font-bold mb-4">{project.title}</h3>
        <p className="text-white/60 mb-8 max-w-md">
          {project.description}
        </p>
        
        <div className="flex gap-4">
          <a href={project.live} className="flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-none hover:bg-accent-cyan transition-colors">
            <FaExternalLinkAlt className="w-4 h-4" /> Live Demo
          </a>
          <a href={project.github} className="flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white text-white rounded-none transition-colors">
            <FaGithub className="w-4 h-4" /> Source
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorldAProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative min-h-[200vh] py-32 bg-background z-10">
      <div className="container mx-auto px-4">
        <div className="mb-24 md:mb-40 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Production <span className="text-accent-cyan">Scale</span>
          </h2>
          <p className="font-mono text-white/40 text-sm">Treating every project as a product.</p>
        </div>

        <div className="flex flex-col">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
