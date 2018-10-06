const path = require('path');
const router = require('express').Router();
const sequelize = require('@/constructors/sequelize');
const logger = require('@/constructors/logger');
const APIRouter = require('./api');

router.use('/api', APIRouter);

router.get('*', function (req, res) {
  logger.debug('Debug statement');
  logger.info('Info statement');
  res.sendFile(path.resolve(__dirname, '@client/dist/index.html'));
});


module.exports = router;
