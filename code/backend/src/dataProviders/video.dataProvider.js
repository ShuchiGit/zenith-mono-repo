const prisma  = require('../lib/prisma');
const findAll = ()        => prisma.video.findMany({ where: { isActive: true }, orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }] });
const findById = (id)     => prisma.video.findUnique({ where: { id } });
const create  = (data)    => prisma.video.create({ data });
const update  = (id,data) => prisma.video.update({ where: { id }, data });
const remove  = (id)      => prisma.video.delete({ where: { id } });
module.exports = { findAll, findById, create, update, remove };
