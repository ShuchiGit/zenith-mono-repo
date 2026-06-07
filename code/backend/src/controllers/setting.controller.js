const svc = require('../services/setting.service');
const { successResponse } = require('../utils/apiResponse');
const getAllSettings  = async (r,res,n) => { try { return successResponse(res,await svc.getAllSettings(),'Settings fetched.'); } catch(e){n(e);} };
const updateSettings = async (r,res,n) => { try { return successResponse(res,await svc.updateSettings(r.body.settings),'Settings updated.'); } catch(e){n(e);} };
module.exports = { getAllSettings, updateSettings };
