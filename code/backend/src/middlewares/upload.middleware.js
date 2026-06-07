const multer = require('multer');
const ALLOWED = ['image/jpeg','image/jpg','image/png','image/webp'];
const upload  = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => ALLOWED.includes(file.mimetype) ? cb(null, true) : cb(new Error(`Invalid file type. Only JPEG, PNG, WebP allowed.`), false),
  limits: { fileSize: 10 * 1024 * 1024 },
});
module.exports = { upload };
