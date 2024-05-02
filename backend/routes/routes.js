const router = require('express').Router();

// Services router
const servicesRouter = require('./service');
const partyRoutes = require('./parties');

router.use('/', servicesRouter);
router.use('/', partyRoutes);

module.exports = router;
