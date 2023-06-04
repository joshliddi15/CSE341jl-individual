const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getAllData);
router.get('/:id', userController.getData);
router.post('/', userController.createContact);
router.put('/:id', userController.updateContact);
router.delete('/:id', userController.deleteContact);

module.exports = router;