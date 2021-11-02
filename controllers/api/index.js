const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogpostRoutes = require('./blogpostRoutes');

router.use('/users', userRoutes);
router.use('/blogposts', blogpostRoutes);

module.exports = router;