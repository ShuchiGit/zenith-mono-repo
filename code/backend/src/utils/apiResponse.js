const { HTTP_STATUS } = require('../config/constants');

const successResponse = (res, data, message = 'Success', statusCode = HTTP_STATUS.OK) =>
  res.status(statusCode).json({ success: true, message, data });

const errorResponse = (res, message, statusCode = HTTP_STATUS.INTERNAL_ERROR, errors = null) => {
  const payload = { success: false, message };
  if (errors) payload.errors = errors;
  return res.status(statusCode).json(payload);
};

const paginatedResponse = (res, data, pagination, message = 'Success') =>
  res.status(HTTP_STATUS.OK).json({ success: true, message, data, pagination });

module.exports = { successResponse, errorResponse, paginatedResponse };
