const express = require('express');
const {userValidation} = require('./validation.js');
const { requiresAuth } = require('express-openid-connect');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', requiresAuth(), userController.getAllUsers);
router.get('/:id', requiresAuth(), userController.getUser);
router.post('/', requiresAuth(), userValidation, userController.createUser);
router.put('/:id', requiresAuth(), userController.updateUser);
router.delete('/:id', requiresAuth(), userController.deleteUser);

module.exports = router;