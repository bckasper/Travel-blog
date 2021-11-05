const router = require('express').Router();
const blogRoutes = require('./blogRoutes')

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/blogs', blogRoutes)

module.exports = router;