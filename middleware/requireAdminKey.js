// Require `ADMIN_API_KEY` for sensitive write operations.
// Admin key is compared against either:
// - Header: `x-admin-key`
// - Query: `adminKey`
function requireAdminKey(req, res, next) {
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) {
    return res.status(403).json({
      success: false,
      message: "Admin is not configured (set ADMIN_API_KEY).",
    });
  }

  const key = req.headers["x-admin-key"] || req.query.adminKey;
  if (!key || key !== adminKey) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized.",
    });
  }

  return next();
}

module.exports = requireAdminKey;

