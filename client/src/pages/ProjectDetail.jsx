import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from "lucide-react";
import { getProject } from "../lib/api";
import { fallbackProjects } from "../lib/fallbackProfile";

export default function ProjectDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [project, setProject] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fromNav = location.state?.project;
    if (fromNav && String(fromNav._id || fromNav.id) === id) {
      setProject(fromNav);
      return;
    }
    if (!id) {
      setErr(true);
      return;
    }
    getProject(id)
      .then(setProject)
      .catch(() => {
        const local = fallbackProjects.find(
          (p) => String(p._id || p.id) === id,
        );
        if (local) setProject(local);
        else setErr(true);
      });
  }, [id, location.state]);

  if (err || !project) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          Project not found
        </h1>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 text-brand-600 dark:text-brand-400"
        >
          <ArrowLeft size={18} /> Back to projects
        </Link>
      </div>
    );
  }

  return (
    <article className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-600 dark:text-slate-400"
          >
            <ArrowLeft size={18} /> Projects
          </Link>

          <div className="flex flex-wrap gap-2">
            {(project.technologies || []).map((t) => (
              <span
                key={t}
                className="rounded-full bg-brand-500/15 px-3 py-1 text-sm font-medium text-brand-700 dark:text-brand-300"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold text-slate-900 dark:text-white">
            {project.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Tag size={16} /> {project.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={16} /> {project.status}
            </span>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {project.description}
          </p>

          {project.features?.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Highlights
              </h2>
              <ul className="mt-4 list-inside list-disc space-y-2 text-slate-600 dark:text-slate-400">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12 flex flex-wrap gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
              >
                <Github size={18} /> Repository
              </a>
            )}
            {(project.demoUrl || project.liveUrl) && (
              <a
                href={project.demoUrl || project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-brand-500 px-5 py-3 text-sm font-semibold text-brand-600 dark:text-brand-400"
              >
                <ExternalLink size={18} /> Live demo
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </article>
  );
}
