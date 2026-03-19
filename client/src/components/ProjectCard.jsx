import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronRight } from "lucide-react";

export default function ProjectCard({ project, index = 0 }) {
  const id = project._id || project.id;
  const href = `/projects/${id}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white/60 shadow-sm backdrop-blur-sm transition hover:border-brand-300/60 hover:shadow-xl hover:shadow-brand-500/5 dark:border-slate-700/80 dark:bg-slate-900/40"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-cyan-500/5 opacity-0 transition group-hover:opacity-100" />
      <div className="relative flex flex-1 flex-col p-6">
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title || "Project image"}
            className="mb-3 aspect-video w-full rounded-xl object-cover bg-slate-900/10"
            loading="lazy"
          />
        )}
        <div className="mb-3 flex flex-wrap gap-2">
          {(project.technologies || []).slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
        <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {project.shortDescription ||
            (project.description?.length > 140
              ? `${project.description.slice(0, 140)}…`
              : project.description || "")}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            to={href}
            state={{ project }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400"
          >
            Details
            <ChevronRight size={16} />
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              <Github size={16} /> Code
            </a>
          )}
          {(project.demoUrl || project.liveUrl) && (
            <a
              href={project.demoUrl || project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              <ExternalLink size={16} /> Live
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
