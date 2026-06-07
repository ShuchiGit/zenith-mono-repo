const router = require('express').Router();
const { body } = require('express-validator');
const ctrl = require('../controllers/setting.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { validate }     = require('../middlewares/validate.middleware');
router.get('/', ctrl.getAllSettings);
router.put('/', authenticate, [body('settings').isArray({min:1}).withMessage('Settings must be a non-empty array.'), body('settings.*.key').trim().notEmpty().withMessage('Each setting needs a key.'), body('settings.*.value').notEmpty().withMessage('Each setting needs a value.')], validate, ctrl.updateSettings);
module.exports = router;
