const crypto = require("crypto");
const nodemailer = require("nodemailer");
const asyncHandler = require("../middleware/asyncHandler");
const { readJson, writeJson, ensureContactsFile } = require("../data/jsonStore");

function loadContacts() {
  ensureContactsFile();
  return readJson("contacts.json", []);
}

function saveContacts(contacts) {
  writeJson("contacts.json", contacts);
}

exports.createContact = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  const contacts = loadContacts();
  const entry = {
    _id: crypto.randomUUID(),
    name,
    email,
    subject,
    message,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  contacts.unshift(entry);
  saveContacts(contacts);

  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    try {
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Portfolio: ${subject}`,
        html: `
          <h2>New message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/</g, "&lt;")}</p>
        `,
      });
    } catch (e) {
      console.error("Email notify failed:", e.message);
    }
  }

  res.status(201).json({
    success: true,
    message: "Message sent successfully!",
    data: { id: entry._id },
  });
});

exports.listContacts = asyncHandler(async (req, res) => {
  const adminKey = process.env.ADMIN_API_KEY;
  const key = req.headers["x-admin-key"] || req.query.adminKey;
  if (!adminKey) {
    const err = new Error("Listing contacts is disabled (set ADMIN_API_KEY)");
    err.statusCode = 403;
    throw err;
  }
  if (key !== adminKey) {
    const err = new Error("Unauthorized");
    err.statusCode = 401;
    throw err;
  }

  const contacts = loadContacts();
  res.json({
    success: true,
    count: contacts.length,
    data: contacts,
  });
});
