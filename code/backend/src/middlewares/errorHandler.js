const logger = require('../utils/logger');
const { HTTP_STATUS } = require('../config/constants');

const notFoundHandler = (req, res) =>
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found.` });

const globalErrorHandler = (err, req, res, next) => {
  logger.error(err);
  if (err.code === 'P2002') return res.status(409).json({ success: false, message: `A record with this ${err.meta?.target?.join(', ')} already exists.` });
  if (err.code === 'P2025') return res.status(404).json({ success: false, message: 'Record not found.' });
  if (err.name === 'JsonWebTokenError')  return res.status(401).json({ success: false, message: 'Invalid authentication token.' });
  if (err.name === 'TokenExpiredError')  return res.status(401).json({ success: false, message: 'Authentication token has expired. Please log in again.' });
  if (err.code === 'LIMIT_FILE_SIZE')    return res.status(400).json({ success: false, message: 'File size exceeds the allowed limit of 10MB.' });
  const status  = err.statusCode || 500;
  const message = (process.env.NODE_ENV === 'production' && status === 500)
    ? 'An unexpected error occurred. Please try again later.'
    : err.message || 'Internal server error.';
  res.status(status).json({ success: false, message });
};

const createHttpError = (message, statusCode) => { const e = new Error(message); e.statusCode = statusCode; return e; };

module.exports = { notFoundHandler, globalErrorHandler, createHttpError };
