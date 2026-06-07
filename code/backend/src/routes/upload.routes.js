const router = require('express').Router();
const { authenticate }  = require('../middlewares/auth.middleware');
const { upload }        = require('../middlewares/upload.middleware');
const { uploadFileToS3 }= require('../utils/s3Upload');
const { getS3Url }      = require('../lib/s3');
const { successResponse, errorResponse } = require('../utils/apiResponse');
router.post('/image', authenticate, upload.single('image'), async (req,res,next) => {
  try {
    if (!req.file) return errorResponse(res,'No image provided.',400);
    const key = await uploadFileToS3(req.file, req.body.folder || 'general');
    return successResponse(res,{ key, url: getS3Url(key) },'Image uploaded.',201);
  } catch(e){next(e);}
});
module.exports = router;
