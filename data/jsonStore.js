const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname);

function readJson(file, fallback) {
  const p = path.join(DATA_DIR, file);
  try {
    const raw = fs.readFileSync(p, "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(file, data) {
  const p = path.join(DATA_DIR, file);
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
}

function ensureContactsFile() {
  const p = path.join(DATA_DIR, "contacts.json");
  if (!fs.existsSync(p)) {
    writeJson("contacts.json", []);
  }
}

module.exports = {
  readJson,
  writeJson,
  ensureContactsFile,
  DATA_DIR,
};
