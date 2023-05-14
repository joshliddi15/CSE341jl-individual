const express = require('express');
const bodyParser = require('body-parser');
const contacts = require('./routes/contacts');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())
  .use(bodyParser.json())
  .use('/', require('./routes'))
  .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    })
  .use('/contacts', contacts)

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});