const express = require("express");
const router = express.Router();
const experienceController = require("../controllers/experienceController");

router.get("/", experienceController.listExperiences);

module.exports = router;
