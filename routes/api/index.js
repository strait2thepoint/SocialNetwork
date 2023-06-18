const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/user', userRoutes); //plueral?
router.use('/thought', thoughtRoutes);//plueral?

module.exports = router;
