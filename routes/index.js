const router = require('express').Router();

router.use('/', require('./swagger.js'));
router.use('/user', require('./user'));

module.exports = router;