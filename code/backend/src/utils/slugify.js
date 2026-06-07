const slug = require('slug');
const generateSlug = (text) => slug(text, { lower: true, replacement: '-' });
module.exports = { generateSlug };
