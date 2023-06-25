const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes); //plueral?
router.use('/thoughts', thoughtRoutes);//plueral?

module.exports = router;
