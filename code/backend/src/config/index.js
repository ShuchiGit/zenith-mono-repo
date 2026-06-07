require('dotenv').config();

const config = {
  env:  process.env.NODE_ENV || 'local',
  port: parseInt(process.env.PORT, 10) || 5000,
  jwt: {
    secret:            process.env.JWT_SECRET,
    expiresIn:         '7d',
    refreshExpiresIn:  '30d',
  },
  aws: {
    region:          process.env.AWS_REGION || 'ap-south-1',
    s3Bucket:        process.env.S3_BUCKET,
    cdnUrl:          process.env.CDN_URL,
    endpoint:        process.env.AWS_ENDPOINT || null,
    accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  cors: {
    allowedOrigins: process.env.NODE_ENV === 'production'
      ? ['https://zenithestate.in', 'https://admin.zenithestate.in']
      : ['http://localhost:3000', 'http://localhost:5173'],
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: process.env.NODE_ENV === 'production' ? 100 : 1000,
  },
};

const required = ['JWT_SECRET'];
required.forEach(k => {
  if (!process.env[k]) throw new Error(`Missing required env var: ${k}`);
});

module.exports = config;
