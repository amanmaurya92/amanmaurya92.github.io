import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { getProjects } from "../lib/api";
import { fallbackProjects } from "../lib/fallbackProfile";
import ProjectCard from "../components/ProjectCard";

const categories = [
  { id: "", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "desktop", label: "Desktop" },
  { id: "other", label: "Other" },
];

export default function Projects() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setList(Array.isArray(data) && data.length ? data : fallbackProjects))
      .catch(() => setList(fallbackProjects))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!filter) return list;
    return list.filter((p) => p.category === filter);
  }, [list, filter]);

  return (
    <div className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-4xl font-bold text-slate-900 dark:text-white">
            Projects
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            <strong className="font-semibold text-slate-700 dark:text-slate-300">MERN stack</strong>{" "}
            projects and more—served from Express via{" "}
            <code className="text-sm">data/projects.json</code>. Filter by category below.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id || "all"}
              type="button"
              onClick={() => setFilter(c.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === c.id
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-500/25"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project._id || project.id}
                project={project}
                index={i}
              />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="py-16 text-center text-slate-500">
            No projects in this category.
          </p>
        )}
      </div>
    </div>
  );
}
