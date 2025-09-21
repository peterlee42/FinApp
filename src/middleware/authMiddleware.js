//TODO: implement jwt
const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  // JWT verification logic
  next();
};
