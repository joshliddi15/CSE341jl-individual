const router = require('express').Router();

router.use('/', require('./swagger.js'));
router.use('/user', require('./user'));
router.use('/products', require('./products'));

module.exports = router;