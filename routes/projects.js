const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const requireAdminKey = require("../middleware/requireAdminKey");

router.get("/", projectController.listProjects);
router.get("/:id", projectController.getProject);
router.post("/", requireAdminKey, projectController.createProject);
router.put("/:id", requireAdminKey, projectController.updateProject);
router.delete("/:id", requireAdminKey, projectController.deleteProject);

module.exports = router;
