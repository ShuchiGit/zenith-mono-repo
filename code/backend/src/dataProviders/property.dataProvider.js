const prisma = require('../lib/prisma');
const findAll    = async (f, { skip, limit }) => {
  const where = buildWhere(f);
  const [properties, total] = await prisma.$transaction([
    prisma.property.findMany({ where, skip, take: limit, orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }] }),
    prisma.property.count({ where }),
  ]);
  return { properties, total };
};
const findBySlug = (slug) => prisma.property.findUnique({ where: { slug } });
const findById   = (id)   => prisma.property.findUnique({ where: { id } });
const create     = (data) => prisma.property.create({ data: sanitize(data) });
const update     = (id, data) => prisma.property.update({ where: { id }, data: sanitize(data) });
const remove     = (id)   => prisma.property.delete({ where: { id } });
const buildWhere = (f) => {
  const w = {};
  if (f.isActive !== undefined) w.isActive = f.isActive;
  if (f.status)  w.status  = f.status;
  if (f.city)    w.city    = { contains: f.city };
  if (f.type)    w.type    = f.type;
  if (f.bhkType) w.bhkType = { contains: f.bhkType };
  if (f.search)  w.OR = [{ name: { contains: f.search } }, { location: { contains: f.search } }, { city: { contains: f.search } }];
  return w;
};
const sanitize = (data) => {
  const allowed = ['name','slug','location','sector','city','bhkType','price','type','status','description','highlights','images','coverImage','carpetArea','superArea','floor','totalFloors','isActive','isFeatured','metaTitle','metaDesc'];
  return Object.fromEntries(Object.entries(data).filter(([k]) => allowed.includes(k)));
};
module.exports = { findAll, findBySlug, findById, create, update, remove };
