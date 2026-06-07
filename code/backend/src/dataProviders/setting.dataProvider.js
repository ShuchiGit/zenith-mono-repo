const prisma  = require('../lib/prisma');
const findAll = ()        => prisma.setting.findMany({ orderBy: { key: 'asc' } });
const findByKey = (key)   => prisma.setting.findUnique({ where: { key } });
const upsert  = (key,val) => prisma.setting.upsert({ where: { key }, update: { value: val }, create: { key, value: val } });
module.exports = { findAll, findByKey, upsert };
