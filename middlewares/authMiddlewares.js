const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // const token = req.get('Authorization');
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.SEED, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        error: {
          message: 'Invalid token'
        }
      });
    }

    req.user = decoded
    next();
  });
};

const verifyAdminRole = (req, res, next) => {
  const user = req.user;
  if (user.name != 'Robert valdez') {
    // if (user.role != 'ADMIN') {
    return res.status(403).json({
      error: {
        message: "You don't have permission"
      }
    });
  }
  next();
};

module.exports = {
  verifyToken,
  verifyAdminRole,
}