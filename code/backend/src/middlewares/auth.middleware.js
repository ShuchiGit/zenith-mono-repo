const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticate = (req, res, next) => {
  const header = req.headers['authorization'];
  if (!header?.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'Authorization token is missing or malformed.' });
  try {
    req.admin = jwt.verify(header.split(' ')[1], config.jwt.secret);
    next();
  } catch (err) { next(err); }
};
module.exports = { authenticate };
