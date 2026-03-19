require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { ensureContactsFile } = require("./data/jsonStore");
const errorHandler = require("./middleware/errorHandler");
const validateContent = require("./config/contentValidator");

ensureContactsFile();

// Fail fast on malformed content so the UI doesn't break silently.
try {
  validateContent();
} catch (e) {
  console.error("Content validation failed:", e.message);
  process.exit(1);
}

const app = express();

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      if (
        allowedOrigins.length === 0 ||
        allowedOrigins.includes(origin) ||
        origin.includes("localhost")
      ) {
        return cb(null, true);
      }
      cb(null, false);
    },
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/profile", require("./routes/profile"));
app.use("/api/experience", require("./routes/experience"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/projects", require("./routes/projects"));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    ok: true,
    service: "portfolio-api",
    storage: "json",
    timestamp: new Date().toISOString(),
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
  });
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API on port ${PORT} (data: ./data/*.json)`);
});

module.exports = app;
