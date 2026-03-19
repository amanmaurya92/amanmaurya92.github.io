const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { contactRules, validate } = require("../middleware/validators");
const rateLimit = require("../middleware/rateLimit");

router.post(
  "/",
  rateLimit({ windowMs: 60 * 60 * 1000, max: 5 }),
  contactRules,
  validate,
  contactController.createContact,
);
router.get("/", contactController.listContacts);

module.exports = router;
