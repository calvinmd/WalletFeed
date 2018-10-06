const router = require('express').Router();
const APIV1Router = require('./v1');

router.use('/v1', APIV1Router);


module.exports = router;
