const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function isStringArray(v) {
  return Array.isArray(v) && v.every((x) => typeof x === "string");
}

function isObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function validateOrThrow(condition, message) {
  if (!condition) throw new Error(message);
}

function readJson(file) {
  const p = path.join(DATA_DIR, file);
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw);
}

function validateProfile(profile) {
  validateOrThrow(isObject(profile), "profile.json must be an object");
  validateOrThrow(isNonEmptyString(profile.name), "profile.name must be a non-empty string");
  validateOrThrow(isNonEmptyString(profile.title), "profile.title must be a non-empty string");
  validateOrThrow(isNonEmptyString(profile.description), "profile.description must be a non-empty string");
  validateOrThrow(isNonEmptyString(profile.email), "profile.email must be a non-empty string");

  if (profile.skills) {
    validateOrThrow(isObject(profile.skills), "profile.skills must be an object");
    const skills = profile.skills;
    // All skill categories are optional, but if present they must be string arrays.
    [
      "languages",
      "frontend",
      "backend",
      "database",
      "mobile",
      "tools",
      "concepts",
    ].forEach((k) => {
      if (skills[k] !== undefined) {
        validateOrThrow(
          isStringArray(skills[k]),
          `profile.skills.${k} must be an array of strings`,
        );
      }
    });
  }

  if (profile.aboutParagraphs !== undefined) {
    validateOrThrow(
      Array.isArray(profile.aboutParagraphs) && profile.aboutParagraphs.every((x) => typeof x === "string"),
      "profile.aboutParagraphs must be an array of strings",
    );
  }

  if (profile.stats !== undefined) {
    validateOrThrow(Array.isArray(profile.stats), "profile.stats must be an array");
    profile.stats.forEach((s, i) => {
      validateOrThrow(isObject(s), `profile.stats[${i}] must be an object`);
      validateOrThrow(isNonEmptyString(s.label), `profile.stats[${i}].label must be a non-empty string`);
      validateOrThrow(
        typeof s.value === "string" || typeof s.value === "number",
        `profile.stats[${i}].value must be string/number`,
      );
    });
  }

  if (profile.socialLinks !== undefined) {
    validateOrThrow(isObject(profile.socialLinks), "profile.socialLinks must be an object");
    // Optional URLs, but if provided they should be strings.
    ["github", "linkedin", "twitter", "dribbble"].forEach((k) => {
      if (profile.socialLinks[k] !== undefined) {
        validateOrThrow(
          typeof profile.socialLinks[k] === "string",
          `profile.socialLinks.${k} must be a string`,
        );
      }
    });
  }
}

function validateProject(p) {
  validateOrThrow(isObject(p), "projects item must be an object");
  validateOrThrow(isNonEmptyString(p._id), "projects._id must be a non-empty string");
  validateOrThrow(isNonEmptyString(p.title), "projects.title must be a non-empty string");
  validateOrThrow(
    isNonEmptyString(p.description) || isNonEmptyString(p.shortDescription) || p.shortDescription === "",
    "projects.description/shortDescription must be provided",
  );

  if (p.technologies !== undefined) {
    validateOrThrow(isStringArray(p.technologies), "projects.technologies must be an array of strings");
  }
  if (p.features !== undefined) {
    validateOrThrow(isStringArray(p.features), "projects.features must be an array of strings");
  }

  const allowedCategory = ["web", "mobile", "desktop", "other"];
  if (p.category !== undefined) {
    validateOrThrow(allowedCategory.includes(p.category), "projects.category invalid");
  }

  const allowedStatus = ["completed", "in-progress", "planned"];
  if (p.status !== undefined) {
    validateOrThrow(allowedStatus.includes(p.status), "projects.status invalid");
  }

  if (p.isFeatured !== undefined) {
    validateOrThrow(typeof p.isFeatured === "boolean", "projects.isFeatured must be boolean");
  }

  if (p.order !== undefined) {
    validateOrThrow(typeof p.order === "number", "projects.order must be number");
  }
}

function validateProjects(projects) {
  validateOrThrow(Array.isArray(projects), "projects.json must be an array");
  projects.forEach((p, i) => {
    try {
      validateProject(p);
    } catch (e) {
      throw new Error(`projects.json item ${i}: ${e.message}`);
    }
  });
}

function validateExperience(ex) {
  validateOrThrow(isObject(ex), "experience item must be an object");
  validateOrThrow(isNonEmptyString(ex._id), "experience._id must be a non-empty string");
  validateOrThrow(isNonEmptyString(ex.title), "experience.title must be a non-empty string");
  validateOrThrow(isNonEmptyString(ex.organization), "experience.organization must be a non-empty string");
  const allowedType = ["education", "work", "project", "other"];
  if (ex.type !== undefined) {
    validateOrThrow(allowedType.includes(ex.type), "experience.type invalid");
  }
  if (ex.highlights !== undefined) {
    validateOrThrow(isStringArray(ex.highlights), "experience.highlights must be array of strings");
  }
  if (ex.current !== undefined) {
    validateOrThrow(typeof ex.current === "boolean", "experience.current must be boolean");
  }
}

function validateExperiences(experiences) {
  validateOrThrow(Array.isArray(experiences), "experience.json must be an array");
  experiences.forEach((ex, i) => {
    try {
      validateExperience(ex);
    } catch (e) {
      throw new Error(`experience.json item ${i}: ${e.message}`);
    }
  });
}

function validateContent() {
  // Fail fast: if a data file is malformed, we prefer a clear crash over
  // serving a broken UI in production.
  const profile = readJson("profile.json");
  const projects = readJson("projects.json");
  const experiences = readJson("experience.json");

  validateProfile(profile);
  validateProjects(projects);
  validateExperiences(experiences);
}

module.exports = validateContent;

