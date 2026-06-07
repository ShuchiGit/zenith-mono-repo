const prisma = require('../lib/prisma');
const findAll = async (f, { skip, limit }) => {
  const where = buildWhere(f);
  const [enquiries, total] = await prisma.$transaction([
    prisma.enquiry.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' },
      include: { project: { select: { id: true, name: true } }, property: { select: { id: true, name: true } } } }),
    prisma.enquiry.count({ where }),
  ]);
  return { enquiries, total };
};
const findById = (id)   => prisma.enquiry.findUnique({ where: { id }, include: { project: { select: { id: true, name: true } }, property: { select: { id: true, name: true } } } });
const create   = (data) => prisma.enquiry.create({ data: { name: data.name, phone: data.phone, email: data.email, message: data.message, source: data.source, projectId: data.projectId || null, propertyId: data.propertyId || null } });
const update   = (id, data) => prisma.enquiry.update({ where: { id }, data });
const buildWhere = (f) => {
  const w = {};
  if (f.status) w.status = f.status;
  if (f.source) w.source = f.source;
  if (f.search) w.OR = [{ name: { contains: f.search } }, { phone: { contains: f.search } }, { email: { contains: f.search } }];
  return w;
};
module.exports = { findAll, findById, create, update };
