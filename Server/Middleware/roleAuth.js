const roleAuthMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Na mitheya Na!!!",
      });
    }
    next();
  };
};

module.exports = roleAuthMiddleware;
