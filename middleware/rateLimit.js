// Simple in-memory rate limiting middleware.
// For local/prototype use. For multiple instances/serverless, use a shared store (Redis).
const ipKey = (req) => {
  // Express uses `req.ip` (may be "unknown" sometimes behind proxies).
  const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
  const ua = req.headers["user-agent"] || "ua";
  // Include UA to reduce identical spam bots.
  return `${ip}::${ua}`;
};

function rateLimit({ windowMs = 60 * 60 * 1000, max = 5 } = {}) {
  const store = new Map(); // key -> { count, resetAt }

  return (req, res, next) => {
    const key = ipKey(req);
    const now = Date.now();

    const current = store.get(key);
    if (!current || now > current.resetAt) {
      store.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (current.count >= max) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again later.",
      });
    }

    store.set(key, { ...current, count: current.count + 1 });
    return next();
  };
}

module.exports = rateLimit;

