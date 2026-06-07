const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const dp     = require('../dataProviders/admin.dataProvider');
const { createHttpError } = require('../middlewares/errorHandler');
const { HTTP_STATUS } = require('../config/constants');
const config = require('../config');

const login = async (email, password) => {
  const admin = await dp.findByEmail(email);
  if (!admin || !admin.isActive) throw createHttpError('Invalid email or password.', HTTP_STATUS.UNAUTHORIZED);
  if (!await bcrypt.compare(password, admin.passwordHash)) throw createHttpError('Invalid email or password.', HTTP_STATUS.UNAUTHORIZED);
  await dp.updateLastLogin(admin.id);
  const payload = { id: admin.id, email: admin.email };
  return { accessToken: jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn }), refreshToken: jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.refreshExpiresIn }), admin: { id: admin.id, email: admin.email, name: admin.name } };
};
const refreshToken = (token) => { const d = jwt.verify(token, config.jwt.secret); return { accessToken: jwt.sign({ id: d.id, email: d.email }, config.jwt.secret, { expiresIn: config.jwt.expiresIn }) }; };
const getAdminById = async (id) => { const a = await dp.findById(id); if (!a) return null; const { passwordHash, ...safe } = a; return safe; };
const changePassword = async (id, cur, next_) => { const a = await dp.findById(id); if (!a) throw createHttpError('Admin not found.', HTTP_STATUS.NOT_FOUND); if (!await bcrypt.compare(cur, a.passwordHash)) throw createHttpError('Current password is incorrect.', HTTP_STATUS.UNAUTHORIZED); return dp.update(id, { passwordHash: await bcrypt.hash(next_, 12) }); };
module.exports = { login, refreshToken, getAdminById, changePassword };
