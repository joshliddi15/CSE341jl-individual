const router = require('express').Router();

router.use('/', require('./swagger.js'));
router.use('/contacts', require('./contacts'));

module.exports = router;