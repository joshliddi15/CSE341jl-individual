const express = require('express');
const {userValidation} = require('./validation.js');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('/', userValidation, userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;