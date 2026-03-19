const asyncHandler = require("../middleware/asyncHandler");
const defaultProfile = require("../config/defaultProfile");
const { readJson } = require("../data/jsonStore");

/**
 * GET /api/profile — from data/profile.json, else config/defaultProfile.js
 */
exports.getProfile = asyncHandler(async (req, res) => {
  const file = readJson("profile.json", null);
  if (file && typeof file === "object") {
    const { slug, ...rest } = file;
    return res.json({ success: true, data: rest });
  }
  res.json({
    success: true,
    data: { ...defaultProfile, _fromDefaults: true },
  });
});
