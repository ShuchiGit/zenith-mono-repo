const { PAGINATION } = require('../config/constants');
const getPaginationParams = (query) => {
  const page  = Math.max(1, parseInt(query.page,  10) || PAGINATION.DEFAULT_PAGE);
  const limit = Math.min(parseInt(query.limit, 10) || PAGINATION.DEFAULT_LIMIT, PAGINATION.MAX_LIMIT);
  return { page, limit, skip: (page - 1) * limit };
};
const buildPaginationMeta = (total, page, limit) => ({
  total, page, limit,
  totalPages:  Math.ceil(total / limit),
  hasNextPage: page < Math.ceil(total / limit),
  hasPrevPage: page > 1,
});
module.exports = { getPaginationParams, buildPaginationMeta };
