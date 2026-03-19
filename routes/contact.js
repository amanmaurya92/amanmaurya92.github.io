const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { contactRules, validate } = require("../middleware/validators");

router.post("/", contactRules, validate, contactController.createContact);
router.get("/", contactController.listContacts);

module.exports = router;
