const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getUser = async (req, res, next) => {
  console.log("getting contact data");
  const userId = new ObjectId(req.params.id);
  console.log('sending request');
  const result = await mongodb.getDb().db().collection('user').find({ _id: userId });
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]); // return first index
  });
};

const getAllUsers = async (req, res, next) => {
  console.log('sending request');
  const result = await mongodb.getDb().db().collection('user').find();
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
  return res.status(422).json({ errors: errors.array() })}

  const user = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    address: req.body.address
  };
  const response = await mongodb.getDb().db().collection('user').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the user.');
  }
};

const updateUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('user')
    .replaceOne({ _id: userId }, user);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

const deleteUser = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('user').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the user.');
  }
};

module.exports = { getUser, getAllUsers, createUser, updateUser, deleteUser };