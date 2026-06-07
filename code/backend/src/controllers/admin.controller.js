const svc = require('../services/admin.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../config/constants');
const login          = async (r,res,n) => { try { return successResponse(res,await svc.login(r.body.email,r.body.password),'Login successful.'); } catch(e){n(e);} };
const refreshToken   = async (r,res,n) => { try { if(!r.body.refreshToken) return errorResponse(res,'Refresh token required.',HTTP_STATUS.BAD_REQUEST); return successResponse(res,await svc.refreshToken(r.body.refreshToken),'Token refreshed.'); } catch(e){n(e);} };
const getMe          = async (r,res,n) => { try { const a=await svc.getAdminById(r.admin.id); if(!a) return errorResponse(res,'Admin not found.',HTTP_STATUS.NOT_FOUND); return successResponse(res,a,'Profile fetched.'); } catch(e){n(e);} };
const changePassword = async (r,res,n) => { try { await svc.changePassword(r.admin.id,r.body.currentPassword,r.body.newPassword); return successResponse(res,null,'Password changed.'); } catch(e){n(e);} };
module.exports = { login, refreshToken, getMe, changePassword };
