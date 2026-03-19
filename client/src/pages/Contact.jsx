import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { submitContact } from "../lib/api";
import { getProfile } from "../lib/api";
import { fallbackProfile } from "../lib/fallbackProfile";
import ApiErrorBanner from "../components/ApiErrorBanner";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function Contact() {
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setProfileLoading(true);
    setApiError(null);
    getProfile()
      .then(setProfile)
      .catch(() => {
        setProfile(fallbackProfile);
        setApiError("Could not reach the API. Showing local contact details.");
      })
      .finally(() => setProfileLoading(false));
  }, []);

  const p = profile || fallbackProfile;

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      const res = await submitContact(form);
      if (res.success) {
        setStatus({
          type: "success",
          message: res.message || "Message sent. I’ll get back to you soon.",
        });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: res.message || "Something went wrong.",
        });
      }
    } catch (e) {
      const msg =
        e.response?.data?.message ||
        e.response?.data?.errors?.[0]?.msg ||
        "Could not reach the API. Deploy the backend and set VITE_API_URL.";
      setStatus({ type: "error", message: msg });
    } finally {
      setSubmitting(false);
    }
  }

  const items = [
    { icon: Mail, label: "Email", value: p.email, href: `mailto:${p.email}` },
    { icon: MapPin, label: "Location", value: p.location },
    p.socialLinks?.github && {
      icon: Github,
      label: "GitHub",
      value: "GitHub",
      href: p.socialLinks.github,
    },
    p.socialLinks?.linkedin && {
      icon: Linkedin,
      label: "LinkedIn",
      value: "LinkedIn",
      href: p.socialLinks.linkedin,
    },
  ].filter(Boolean);

  return (
    <div className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-4xl font-bold text-slate-900 dark:text-white">
            Contact
          </h1>
          <ApiErrorBanner message={apiError} />
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Part of my <strong className="text-slate-800 dark:text-slate-200">MERN stack</strong>{" "}
            setup: Express validates with express-validator, messages append to{" "}
            <code className="text-sm">data/contacts.json</code>, and Nodemailer can notify you by
            email.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {profileLoading ? (
            <div className="lg:col-span-2">
              <LoadingSkeleton />
            </div>
          ) : (
            <>
              <motion.form
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onSubmit={handleSubmit}
                className="space-y-6 rounded-2xl border border-slate-200/80 bg-white/60 p-8 shadow-sm backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/40"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-brand-500/0 transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                {status.message && (
                  <div
                    className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                      status.type === "success"
                        ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300"
                        : "bg-red-500/15 text-red-800 dark:text-red-300"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-500 disabled:opacity-60 sm:w-auto sm:px-8"
                >
                  {submitting ? (
                    "Sending…"
                  ) : (
                    <>
                      Send <Send size={18} />
                    </>
                  )}
                </button>
              </motion.form>

              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="space-y-6"
              >
                <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  Direct
                </h2>
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.label}
                      className="flex gap-4 rounded-2xl border border-slate-200/80 bg-surface-muted/50 p-4 dark:border-slate-700"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-600 dark:text-brand-400">
                        <item.icon size={22} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={
                              item.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel="noreferrer"
                            className="font-medium text-slate-900 hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium text-slate-900 dark:text-white">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
