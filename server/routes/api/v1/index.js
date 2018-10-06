const router = require('express').Router();
const packageJson = require('@/package.json');
const logger = require('@/constructors/logger');
const { sequelize, models } = require('@/constructors/sequelize');
const Users = require('./users');

router.use('/users', Users({ sequelize, models }));
router.get('/health', (req, res, next) => res.send({ healthy: true }));
router.get('/version', (req, res, next) => res.send({ version: packageJson.version }));

module.exports = router;
