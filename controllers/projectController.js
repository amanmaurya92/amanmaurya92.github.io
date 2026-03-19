const crypto = require("crypto");
const asyncHandler = require("../middleware/asyncHandler");
const { readJson, writeJson } = require("../data/jsonStore");

function loadProjects() {
  return readJson("projects.json", []);
}

async function saveProjects(projects) {
  await writeJson("projects.json", projects);
}

function matchesFilters(p, { category, featured, status }) {
  if (category && p.category !== category) return false;
  if (featured === "true" && !p.isFeatured) return false;
  if (status && p.status !== status) return false;
  return true;
}

exports.listProjects = asyncHandler(async (req, res) => {
  const { category, featured, status } = req.query;
  let projects = loadProjects().filter((p) =>
    matchesFilters(p, { category, featured, status }),
  );
  projects = [...projects].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  res.json({
    success: true,
    count: projects.length,
    data: projects,
  });
});

exports.getProject = asyncHandler(async (req, res) => {
  const projects = loadProjects();
  const project = projects.find((p) => String(p._id) === String(req.params.id));
  if (!project) {
    const err = new Error("Project not found");
    err.statusCode = 404;
    throw err;
  }
  res.json({ success: true, data: project });
});

exports.createProject = asyncHandler(async (req, res) => {
  const projects = loadProjects();
  const project = {
    _id: crypto.randomUUID(),
    ...req.body,
  };
  projects.push(project);
  await saveProjects(projects);
  res.status(201).json({
    success: true,
    message: "Project created",
    data: project,
  });
});

exports.updateProject = asyncHandler(async (req, res) => {
  const projects = loadProjects();
  const i = projects.findIndex((p) => String(p._id) === String(req.params.id));
  if (i === -1) {
    const err = new Error("Project not found");
    err.statusCode = 404;
    throw err;
  }
  projects[i] = { ...projects[i], ...req.body, _id: projects[i]._id };
  await saveProjects(projects);
  res.json({ success: true, message: "Updated", data: projects[i] });
});

exports.deleteProject = asyncHandler(async (req, res) => {
  const projects = loadProjects();
  const next = projects.filter((p) => String(p._id) !== String(req.params.id));
  if (next.length === projects.length) {
    const err = new Error("Project not found");
    err.statusCode = 404;
    throw err;
  }
  await saveProjects(next);
  res.json({ success: true, message: "Deleted" });
});
