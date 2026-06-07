const svc = require('../services/project.service');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/apiResponse');
const { getPaginationParams } = require('../utils/pagination');
const { HTTP_STATUS } = require('../config/constants');

const listProjects         = async (req,res,next) => { try { const pg=getPaginationParams(req.query); const {projects,total}=await svc.listProjects({status:req.query.status,city:req.query.city,bhkType:req.query.bhkType,search:req.query.search,isActive:true},pg); return paginatedResponse(res,projects,{total,page:pg.page,limit:pg.limit,totalPages:Math.ceil(total/pg.limit)}); } catch(e){next(e);} };
const listFeaturedProjects = async (req,res,next) => { try { return successResponse(res, await svc.listFeaturedProjects(), 'Featured projects fetched.'); } catch(e){next(e);} };
const getProjectBySlug     = async (req,res,next) => { try { const p=await svc.getProjectBySlug(req.params.slug); if(!p) return errorResponse(res,`No project found with slug '${req.params.slug}'.`,HTTP_STATUS.NOT_FOUND); return successResponse(res,p,'Project fetched.'); } catch(e){next(e);} };
const createProject        = async (req,res,next) => { try { return successResponse(res, await svc.createProject(req.body), 'Project created.', HTTP_STATUS.CREATED); } catch(e){next(e);} };
const updateProject        = async (req,res,next) => { try { return successResponse(res, await svc.updateProject(+req.params.id, req.body), 'Project updated.'); } catch(e){next(e);} };
const toggleProjectStatus  = async (req,res,next) => { try { const p=await svc.toggleProjectStatus(+req.params.id); return successResponse(res,p,`Project ${p.isActive?'activated':'deactivated'}.`); } catch(e){next(e);} };
const deleteProject        = async (req,res,next) => { try { await svc.deleteProject(+req.params.id); return successResponse(res,null,'Project deleted.'); } catch(e){next(e);} };
const uploadProjectImages  = async (req,res,next) => { try { if(!req.files?.length) return errorResponse(res,'No images provided.',HTTP_STATUS.BAD_REQUEST); return successResponse(res, await svc.uploadProjectImages(+req.params.id,req.files),'Images uploaded.'); } catch(e){next(e);} };
const deleteProjectImage   = async (req,res,next) => { try { if(!req.body.imageKey) return errorResponse(res,'Image key required.',HTTP_STATUS.BAD_REQUEST); return successResponse(res, await svc.deleteProjectImage(+req.params.id,req.body.imageKey),'Image deleted.'); } catch(e){next(e);} };
module.exports = { listProjects, listFeaturedProjects, getProjectBySlug, createProject, updateProject, toggleProjectStatus, deleteProject, uploadProjectImages, deleteProjectImage };
