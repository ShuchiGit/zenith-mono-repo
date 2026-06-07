const prisma        = require('../lib/prisma');
const findByEmail   = (email) => prisma.admin.findUnique({ where: { email } });
const findById      = (id)    => prisma.admin.findUnique({ where: { id } });
const update        = (id,d)  => prisma.admin.update({ where: { id }, data: d });
const updateLastLogin = (id)  => prisma.admin.update({ where: { id }, data: { lastLoginAt: new Date() } });
module.exports = { findByEmail, findById, update, updateLastLogin };
