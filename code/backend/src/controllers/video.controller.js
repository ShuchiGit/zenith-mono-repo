const svc = require('../services/video.service');
const { successResponse } = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../config/constants');
const listVideos      = async (r,res,n) => { try { return successResponse(res,await svc.listVideos(),'Videos fetched.'); } catch(e){n(e);} };
const createVideo     = async (r,res,n) => { try { return successResponse(res,await svc.createVideo(r.body),'Video added.',HTTP_STATUS.CREATED); } catch(e){n(e);} };
const updateVideo     = async (r,res,n) => { try { return successResponse(res,await svc.updateVideo(+r.params.id,r.body),'Video updated.'); } catch(e){n(e);} };
const updateSortOrder = async (r,res,n) => { try { return successResponse(res,await svc.updateSortOrder(+r.params.id,r.body.sortOrder),'Order updated.'); } catch(e){n(e);} };
const deleteVideo     = async (r,res,n) => { try { await svc.deleteVideo(+r.params.id); return successResponse(res,null,'Video deleted.'); } catch(e){n(e);} };
module.exports = { listVideos, createVideo, updateVideo, updateSortOrder, deleteVideo };
