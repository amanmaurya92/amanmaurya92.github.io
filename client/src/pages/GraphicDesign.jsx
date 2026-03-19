import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Palette, ImageIcon } from "lucide-react";
import { getProfile } from "../lib/api";
import { fallbackProfile } from "../lib/fallbackProfile";

export default function GraphicDesign() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => setProfile(fallbackProfile));
  }, []);

  const p = profile || fallbackProfile;
  const gd = p.graphicDesign || fallbackProfile.graphicDesign;
  const items = gd.items || [];

  if (!gd.enabled) {
    return (
      <div className="px-4 py-24 text-center sm:px-6">
        <p className="text-slate-600 dark:text-slate-400">
          Design section is disabled in your site profile.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-4"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
            <Palette size={28} />
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold text-slate-900 dark:text-white">
              {gd.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              {gd.description}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Add entries to{" "}
              <code className="rounded bg-slate-200 px-1 dark:bg-slate-800">
                graphicDesign.items
              </code>{" "}
              in <code className="text-sm">data/profile.json</code> (title, description, imageUrl).
            </p>
          </div>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-20 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 py-24 dark:border-slate-600"
          >
            <ImageIcon className="text-slate-400" size={48} />
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              No design entries yet. Add them via your database or seed.
            </p>
          </motion.div>
        ) : (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <motion.article
                key={item.title || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/50"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="aspect-video w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="font-display font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
