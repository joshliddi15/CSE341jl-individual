const express = require('express');
const {userValidation} = require('./validation.js');
const { requiresAuth } = require('express-openid-connect');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', requiresAuth(), userController.getAllUsers);
router.get('/:id', requiresAuth(), userController.getUser);
router.post('/', userValidation, userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;