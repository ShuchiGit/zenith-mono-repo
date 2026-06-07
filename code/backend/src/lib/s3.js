const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const config = require('../config');

const s3Config = {
  region: config.aws.region,
  credentials: { accessKeyId: config.aws.accessKeyId || 'test', secretAccessKey: config.aws.secretAccessKey || 'test' },
};
if (config.env === 'local' && config.aws.endpoint) {
  s3Config.endpoint    = config.aws.endpoint;
  s3Config.forcePathStyle = true;
}

const s3Client  = new S3Client(s3Config);
const getS3Url  = (key) => `${config.aws.cdnUrl}/${key}`;
const deleteFromS3 = async (key) => {
  try { await s3Client.send(new DeleteObjectCommand({ Bucket: config.aws.s3Bucket, Key: key })); }
  catch {}
};
module.exports = { s3Client, getS3Url, deleteFromS3 };
