const dp          = require('../dataProviders/project.dataProvider');
const { generateSlug } = require('../utils/slugify');
const { getS3Url, deleteFromS3 } = require('../lib/s3');
const { createHttpError } = require('../middlewares/errorHandler');
const { uploadFileToS3 }  = require('../utils/s3Upload');
const { S3_FOLDERS, HTTP_STATUS } = require('../config/constants');

const fmt = (p) => ({ ...p, images: p.images ? JSON.parse(p.images).map(getS3Url) : [], coverImage: p.coverImage ? getS3Url(p.coverImage) : null, highlights: p.highlights ? JSON.parse(p.highlights) : [], amenities: p.amenities ? JSON.parse(p.amenities) : [] });

const listProjects      = (filters, pg) => dp.findAll(filters, pg);
const listFeaturedProjects = () => dp.findFeatured();
const getProjectBySlug  = async (slug) => { const p = await dp.findBySlug(slug); return p ? fmt(p) : null; };
const createProject     = async (data) => { const slug = generateSlug(data.name); if (await dp.findBySlug(slug)) throw createHttpError(`A project named '${data.name}' already exists.`, HTTP_STATUS.CONFLICT); return fmt(await dp.create({ ...data, slug })); };
const updateProject     = async (id, data) => { if (!await dp.findById(id)) throw createHttpError(`Project with ID ${id} not found.`, HTTP_STATUS.NOT_FOUND); return fmt(await dp.update(id, data)); };
const toggleProjectStatus = async (id) => { const e = await dp.findById(id); if (!e) throw createHttpError(`Project with ID ${id} not found.`, HTTP_STATUS.NOT_FOUND); return dp.update(id, { isActive: !e.isActive }); };
const deleteProject     = async (id) => { const e = await dp.findById(id); if (!e) throw createHttpError(`Project with ID ${id} not found.`, HTTP_STATUS.NOT_FOUND); const imgs = e.images ? JSON.parse(e.images) : []; if (e.coverImage) imgs.push(e.coverImage); await Promise.all(imgs.map(deleteFromS3)); return dp.remove(id); };
const uploadProjectImages = async (id, files) => { const e = await dp.findById(id); if (!e) throw createHttpError(`Project with ID ${id} not found.`, HTTP_STATUS.NOT_FOUND); const keys = await Promise.all(files.map(f => uploadFileToS3(f, `${S3_FOLDERS.PROJECTS}/${id}`))); const all = [...(e.images ? JSON.parse(e.images) : []), ...keys]; return fmt(await dp.update(id, { images: JSON.stringify(all), coverImage: e.coverImage || keys[0] })); };
const deleteProjectImage  = async (id, key) => { const e = await dp.findById(id); if (!e) throw createHttpError(`Project with ID ${id} not found.`, HTTP_STATUS.NOT_FOUND); await deleteFromS3(key); const imgs = (e.images ? JSON.parse(e.images) : []).filter(k => k !== key); return fmt(await dp.update(id, { images: JSON.stringify(imgs), coverImage: e.coverImage === key ? (imgs[0]||null) : e.coverImage })); };

module.exports = { listProjects, listFeaturedProjects, getProjectBySlug, createProject, updateProject, toggleProjectStatus, deleteProject, uploadProjectImages, deleteProjectImage };
