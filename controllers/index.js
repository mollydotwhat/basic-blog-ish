const router = require('express').Router();
const apiRoutes = require('./api'); 
// const homeRoute; because it has to load somewhere

// assign route paths
router.use('/api', apiRoutes);
// router.use('/', homeRoute);

module.exports = router;