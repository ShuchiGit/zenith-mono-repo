require('dotenv').config();
const express    = require('express');
const helmet     = require('helmet');
const cors       = require('cors');
const morgan     = require('morgan');
const rateLimit  = require('express-rate-limit');
const config     = require('./config');
const logger     = require('./utils/logger');
const { notFoundHandler, globalErrorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: (origin, cb) => (!origin || config.cors.allowedOrigins.includes(origin)) ? cb(null,true) : cb(new Error(`CORS: ${origin} not allowed`)), credentials: true }));
app.use(rateLimit({ windowMs: config.rateLimit.windowMs, max: config.rateLimit.max, message: { success:false, message:'Too many requests. Try again later.' }, standardHeaders:true, legacyHeaders:false }));
app.use(express.json({ limit:'10mb' }));
app.use(express.urlencoded({ extended:true, limit:'10mb' }));
app.use(morgan('combined', { stream: { write: m => logger.http(m.trim()) } }));

app.get('/health', (req,res) => res.json({ success:true, message:'Zenith Estate API running.' }));

const V = '/v1';
app.use(`${V}/projects`,    require('./routes/project.routes'));
app.use(`${V}/properties`,  require('./routes/property.routes'));
app.use(`${V}/enquiries`,   require('./routes/enquiry.routes'));
app.use(`${V}/videos`,      require('./routes/video.routes'));
app.use(`${V}/settings`,    require('./routes/setting.routes'));
app.use(`${V}/admin`,       require('./routes/admin.routes'));
app.use(`${V}/upload`,      require('./routes/upload.routes'));

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(config.port, () => logger.info(`✅ Zenith Estate API → http://localhost:${config.port} [${config.env}]`));
module.exports = app;
