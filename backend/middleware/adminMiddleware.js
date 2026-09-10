const adminMiddleware = (req, res, next) => {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (req.user.email !== ADMIN_EMAIL) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Admin authorization failed.",
    });
  }
};

module.exports = adminMiddleware;