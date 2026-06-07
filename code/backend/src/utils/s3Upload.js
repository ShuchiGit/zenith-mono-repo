const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client }         = require('../lib/s3');
const config               = require('../config');

const uploadFileToS3 = async (file, folder) => {
  const ext  = file.originalname.split('.').pop().toLowerCase();
  const key  = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  await s3Client.send(new PutObjectCommand({
    Bucket:       config.aws.s3Bucket,
    Key:          key,
    Body:         file.buffer,
    ContentType:  file.mimetype,
    CacheControl: 'max-age=31536000',
  }));
  return key;
};
module.exports = { uploadFileToS3 };
