const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

const prisma = new PrismaClient({
  log: [{ emit: 'event', level: 'error' }],
});
prisma.$on('error', e => logger.error(`Prisma: ${e.message}`));
module.exports = prisma;
