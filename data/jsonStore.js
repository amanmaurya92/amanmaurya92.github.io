const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname);

// In-memory write locks to prevent concurrent writes corrupting JSON files.
// Works for single-process deployments. For multi-instance setups, use a DB/queue.
const writeLocks = new Map(); // file -> Promise

function readJson(file, fallback) {
  const p = path.join(DATA_DIR, file);
  try {
    const raw = fs.readFileSync(p, "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function withWriteLock(file, task) {
  const prev = writeLocks.get(file) || Promise.resolve();
  // Chain tasks so only one writer runs per file.
  const next = prev
    .catch(() => null)
    .then(task)
    .finally(() => {
      if (writeLocks.get(file) === next) writeLocks.delete(file);
    });
  writeLocks.set(file, next);
  return next;
}

async function writeJson(file, data) {
  const p = path.join(DATA_DIR, file);
  const tmp = `${p}.${process.pid}.${Date.now()}.tmp`;
  const payload = JSON.stringify(data, null, 2);

  await withWriteLock(file, async () => {
    await fs.promises.writeFile(tmp, payload, "utf8");
    // Atomic replace on POSIX; prevents partially-written JSON on crashes.
    await fs.promises.rename(tmp, p);
  });
}

function ensureContactsFile() {
  const p = path.join(DATA_DIR, "contacts.json");
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, JSON.stringify([], null, 2), "utf8");
  }
}

module.exports = {
  readJson,
  writeJson,
  ensureContactsFile,
  DATA_DIR,
};
