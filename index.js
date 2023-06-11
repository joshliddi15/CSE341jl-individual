const express = require('express');
const bodyParser = require('body-parser');
const user = require('./routes/user');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
const path = require('path');


const cors = require('cors');
const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app
  .use(auth(config))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(bodyParser.json())
  .use('/', require('./routes'))
  .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    })
  .use('/user', user)
  .get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in<br><a href = "/logout">Log Out</a>' : 'Logged Out <br><a href = "/login">Login</a>');
  })


mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});