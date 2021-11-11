const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogpostRoutes = require('./blogpostRoutes');
const commentRoutes = require('./commentRoutes')

router.use('/users', userRoutes);
router.use('/blogposts', blogpostRoutes);
router.use('/comments', commentRoutes);


module.exports = router;