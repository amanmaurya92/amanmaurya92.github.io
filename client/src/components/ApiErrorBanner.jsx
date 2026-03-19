import { AlertTriangle } from "lucide-react";

export default function ApiErrorBanner({ message }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-900 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-200"
    >
      <AlertTriangle className="mt-0.5 shrink-0" size={18} />
      <div className="text-sm leading-relaxed">
        <p className="font-semibold">API unavailable</p>
        <p className="mt-1">{message}</p>
      </div>
    </div>
  );
}

