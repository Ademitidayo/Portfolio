// Middleware to check user roles
const checkRole = (roles) => {
  return (req, res, next) => {
    const user = req.user;  // Assuming req.user is set after authentication
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "Access denied." });
    }
    next();
  };
};

module.exports = checkRole;

