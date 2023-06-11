const express = require('express');
const {productValidation} = require('./validation.js');
const { requiresAuth } = require('express-openid-connect');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProduct);
router.post('/', requiresAuth(), productValidation, productsController.createProduct);
router.put('/:id', requiresAuth(), productsController.updateProduct);
router.delete('/:id', requiresAuth(), productsController.deleteProduct);

module.exports = router;