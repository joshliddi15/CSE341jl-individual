const express = require('express');

const contactsController = require('../controllers/contacts');

const routes = express.Router();
routes.get('/first', contactsController.getData);
routes.get('/', contactsController.getAllData);

module.exports = routes;
