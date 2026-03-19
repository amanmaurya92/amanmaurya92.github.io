import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { getProfile } from "../lib/api";
import { fallbackProfile } from "../lib/fallbackProfile";

export default function Footer() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => setProfile(fallbackProfile));
  }, []);

  const p = profile || fallbackProfile;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-surface-muted/50 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-bold text-slate-900 dark:text-white">
              {p.name}
            </p>
            <p className="mt-1 max-w-sm text-sm text-slate-600 dark:text-slate-400">
              {p.title}
            </p>
          </div>
          <div className="flex gap-3">
            {p.socialLinks?.github && (
              <a
                href={p.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:border-brand-500/50 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400 dark:hover:text-brand-400"
              >
                <Github size={20} />
              </a>
            )}
            {p.socialLinks?.linkedin && (
              <a
                href={p.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:border-brand-500/50 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400 dark:hover:text-brand-400"
              >
                <Linkedin size={20} />
              </a>
            )}
            {p.email && (
              <a
                href={`mailto:${p.email}`}
                className="rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:border-brand-500/50 hover:text-brand-600 dark:border-slate-700 dark:text-slate-400 dark:hover:text-brand-400"
              >
                <Mail size={20} />
              </a>
            )}
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 dark:border-slate-800 sm:flex-row">
          <p className="flex items-center gap-1 text-sm text-slate-500">
            Built with the MERN stack
            <Heart
              className="inline text-rose-500"
              size={14}
              fill="currentColor"
            />
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/projects" className="hover:text-brand-600">
              Projects
            </Link>
            <Link to="/contact" className="hover:text-brand-600">
              Contact
            </Link>
          </div>
          <p className="text-sm text-slate-500">© {year} {p.name}</p>
        </div>
      </div>
    </footer>
  );
}
