export default function LoadingSkeleton({ variant = "page" }) {
  if (variant === "hero") {
    return (
      <div className="animate-pulse">
        <div className="h-5 w-40 rounded-full bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-12 w-full max-w-2xl rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-6 w-full max-w-xl rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="mt-4 h-6 w-full max-w-3xl rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="mt-8 flex gap-3">
          <div className="h-11 w-44 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-11 w-32 rounded-xl bg-slate-200 dark:bg-slate-800" />
        </div>
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className="animate-pulse">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white/60 p-6 dark:border-slate-700/80 dark:bg-slate-900/40"
            >
              <div className="mb-3 aspect-video w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-3 h-3 w-full rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-2 h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-8 h-9 w-2/3 rounded-xl bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto animate-pulse">
      <div className="h-12 w-48 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      <div className="mt-4 h-6 w-full max-w-2xl rounded-2xl bg-slate-200 dark:bg-slate-800" />
      <div className="mt-4 h-6 w-full max-w-xl rounded-2xl bg-slate-200 dark:bg-slate-800" />
      <div className="mt-10 h-12 w-44 rounded-xl bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}

