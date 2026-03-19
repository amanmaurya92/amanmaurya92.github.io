import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Code,
  Database,
  Layout,
  Smartphone,
  Wrench,
  Sparkles,
} from "lucide-react";
import { getProfile, getProjects, getExperiences } from "../lib/api";
import { fallbackProfile, fallbackProjects } from "../lib/fallbackProfile";
import ProjectCard from "../components/ProjectCard";

const skillIcons = {
  languages: Code,
  frontend: Layout,
  backend: Database,
  mobile: Smartphone,
  tools: Wrench,
  concepts: Sparkles,
};

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [prof, projs, exp] = await Promise.all([
          getProfile(),
          getProjects({ featured: "true" }).catch(() => []),
          getExperiences().catch(() => []),
        ]);
        if (!cancelled) {
          setProfile(prof);
          setProjects(Array.isArray(projs) && projs.length ? projs : []);
          setExperiences(Array.isArray(exp) ? exp : []);
        }
      } catch {
        if (!cancelled) {
          setProfile(fallbackProfile);
          setProjects(fallbackProjects);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const p = profile || fallbackProfile;
  const featured =
    projects.length > 0 ? projects : fallbackProjects.filter((x) => x.isFeatured);
  const skills = p.skills || {};

  const skillBlocks = [
    ["languages", "Languages"],
    ["frontend", "Frontend"],
    ["backend", "Backend"],
    ["database", "Data"],
    ["mobile", "Mobile"],
    ["tools", "Tools"],
    ["concepts", "Concepts"],
  ].filter(([key]) => (skills[key] || []).length > 0);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            {p.availabilityBadge && (
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-700 dark:text-brand-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                {p.availabilityBadge}
              </span>
            )}
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-brand-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                {p.name}
              </span>
            </h1>
            <p className="mt-4 text-xl font-medium text-slate-600 dark:text-slate-300">
              {p.title}
            </p>
            {p.tagline && (
              <p className="mt-2 text-brand-600 dark:text-brand-400">{p.tagline}</p>
            )}
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {p.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-500"
              >
                View projects
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 bg-white/50 px-6 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur transition hover:border-brand-400 hover:text-brand-700 dark:border-slate-600 dark:bg-slate-900/50 dark:text-white dark:hover:border-brand-500"
              >
                Let&apos;s talk
              </Link>
            </div>
            <div className="mt-10 flex gap-3">
              {p.socialLinks?.github && (
                <a
                  href={p.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400"
                >
                  <Github size={22} />
                </a>
              )}
              {p.socialLinks?.linkedin && (
                <a
                  href={p.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400"
                >
                  <Linkedin size={22} />
                </a>
              )}
              {p.email && (
                <a
                  href={`mailto:${p.email}`}
                  className="rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400"
                >
                  <Mail size={22} />
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-16 lg:mt-0 lg:hidden"
          >
                <pre className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-900 p-4 text-left text-xs text-slate-100 shadow-xl dark:border-slate-700">
              <code className="font-mono">{`// ${p.name} — MERN stack
const stack = {
  M: "MongoDB-ready data layer",
  E: "Express",
  R: "React",
  N: "Node.js",
};
await buildSomethingGreat(stack);`}</code>
            </pre>
          </motion.div>
        </div>
      </section>

      {p.stats?.length > 0 && (
        <section className="border-y border-slate-200/80 bg-surface-muted/30 py-12 dark:border-slate-800">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8 px-4 sm:px-6">
            {p.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-center"
              >
                <p className="font-display text-3xl font-bold text-brand-600 dark:text-brand-400">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-bold text-slate-900 dark:text-white"
          >
            Skills & stack
          </motion.h2>
          <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-400">
            <strong className="font-semibold text-slate-700 dark:text-slate-300">
              MERN stack
            </strong>{" "}
            in practice: Express APIs, React UI, Node runtime—this site uses JSON under{" "}
            <code className="text-sm">data/</code> so you can run locally without a DB; swap in
            MongoDB anytime for the same patterns.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillBlocks.map(([key, label], i) => {
              const Icon = skillIcons[key] || Code;
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-slate-200/80 bg-white/50 p-6 dark:border-slate-700/80 dark:bg-slate-900/30"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-600 dark:text-brand-400">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-slate-900 dark:text-white">
                    {label}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {(skills[key] || []).map((s) => (
                      <li
                        key={s}
                        className="rounded-lg bg-slate-100 px-2.5 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {experiences.length > 0 && (
        <section className="border-t border-slate-200/80 bg-slate-50/50 px-4 py-20 dark:border-slate-800 dark:bg-slate-900/20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
              Experience & education
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Loaded from{" "}
              <code className="rounded bg-slate-200 px-1 dark:bg-slate-800">
                GET /api/experience
              </code>{" "}
              (backed by <code className="text-sm">data/experience.json</code>)
            </p>
            <ul className="relative mt-12 space-y-8 border-l-2 border-brand-500/30 pl-8">
              {experiences.map((ex, i) => (
                <motion.li
                  key={ex._id || i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-3 w-3 rounded-full border-2 border-brand-500 bg-white dark:bg-slate-900" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {ex.type} · {ex.startDate}
                    {ex.current ? " – present" : ex.endDate ? ` – ${ex.endDate}` : ""}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold text-slate-900 dark:text-white">
                    {ex.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">{ex.organization}</p>
                  {ex.description && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      {ex.description}
                    </p>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
                Featured work
              </h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Projects from{" "}
                <code className="rounded bg-slate-200 px-1 dark:bg-slate-800">
                  GET /api/projects?featured=true
                </code>{" "}
                (<code className="text-sm">data/projects.json</code>)
              </p>
            </div>
            <Link
              to="/projects"
              className="text-sm font-semibold text-brand-600 hover:text-brand-500 dark:text-brand-400"
            >
              All projects →
            </Link>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((proj, i) => (
              <ProjectCard key={proj._id || proj.id || i} project={proj} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-brand-500/10 via-surface-muted/50 to-cyan-500/10 p-8 dark:border-slate-700 sm:p-12"
          >
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              About
            </h2>
            {p.education && (
              <p className="mt-4 text-sm font-medium text-brand-700 dark:text-brand-300">
                {p.education.degree} — {p.education.major}
                {p.education.status && ` · ${p.education.status}`}
              </p>
            )}
            <div className="mt-6 space-y-4 text-slate-600 dark:text-slate-400">
              {(p.aboutParagraphs || []).map((para, i) => (
                <p key={i} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-brand-600 dark:hover:bg-brand-500"
            >
              Get in touch
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
