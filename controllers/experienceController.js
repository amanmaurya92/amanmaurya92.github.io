const asyncHandler = require("../middleware/asyncHandler");
const { readJson } = require("../data/jsonStore");

exports.listExperiences = asyncHandler(async (req, res) => {
  const items = readJson("experience.json", []);
  const sorted = [...items].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  res.json({ success: true, count: sorted.length, data: sorted });
});
