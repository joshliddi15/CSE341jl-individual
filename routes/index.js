const routes = require('express').Router();
const person = require('../controllers/');

routes.get('/', person.goodFriend);

module.exports = routes;
