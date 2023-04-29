const mongodb = require('../db/connect');

const getData = async (req, res, next) => {
  console.log('sending request');
  const result = await mongodb.getDb().db().collection('contacts').find();
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]); // we just need the first one (the only one)
  });
};

const getAllData = async (req, res, next) => {
  console.log('sending request');
  const result = await mongodb.getDb().db().collection('contacts').find();
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); // we just need the first one (the only one)
  });
};

module.exports = { getData, getAllData };