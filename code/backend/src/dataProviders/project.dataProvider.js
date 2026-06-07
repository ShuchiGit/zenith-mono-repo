const prisma = require('../lib/prisma');

const findAll = async (filters, { skip, limit }) => {
  const where = buildWhere(filters);
  const [projects, total] = await prisma.$transaction([
    prisma.project.findMany({ where, skip, take: limit, orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }] }),
    prisma.project.count({ where }),
  ]);
  return { projects, total };
};
const findFeatured = () => prisma.project.findMany({ where: { isActive: true, isFeatured: true }, orderBy: { createdAt: 'desc' }, take: 6 });
const findBySlug   = (slug) => prisma.project.findUnique({ where: { slug } });
const findById     = (id)   => prisma.project.findUnique({ where: { id } });
const create       = (data) => prisma.project.create({ data: sanitize(data) });
const update       = (id, data) => prisma.project.update({ where: { id }, data: sanitize(data) });
const remove       = (id)   => prisma.project.delete({ where: { id } });

const buildWhere = (f) => {
  const w = {};
  if (f.isActive !== undefined) w.isActive = f.isActive;
  if (f.status)   w.status = f.status;
  if (f.city)     w.city   = { contains: f.city };
  if (f.bhkType)  w.bhkTypes = { contains: f.bhkType };
  if (f.search)   w.OR = [{ name: { contains: f.search } }, { location: { contains: f.search } }, { city: { contains: f.search } }];
  return w;
};
const sanitize = (data) => {
  const allowed = ['name','slug','location','sector','city','bhkTypes','priceMin','priceMax','status','description','highlights','amenities','images','coverImage','reraNumber','builderName','totalUnits','isActive','isFeatured','metaTitle','metaDesc'];
  return Object.fromEntries(Object.entries(data).filter(([k]) => allowed.includes(k)));
};
module.exports = { findAll, findFeatured, findBySlug, findById, create, update, remove };
