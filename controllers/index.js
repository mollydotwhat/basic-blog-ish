const router = require('express').Router();

// route definitions
const apiRoutes = require('./api'); 
const homeRoute = require('./home.route');

// assign route paths
router.use('/api', apiRoutes);
router.use('/', homeRoute);

module.exports = router;