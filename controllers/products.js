const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getProduct = async (req, res, next) => {
  const productId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('product').find({ _id: productId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]); // return first index
  });
};

const getAllProducts = async (req, res, next) => {
  console.log("getting products");
  const result = await mongodb.getDb().db().collection('product').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createProduct = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
  return res.status(422).json({ errors: errors.array() })}
  const product = {
    description: req.body.description,
    name: req.body.name,
    price: req.body.price,
  };
  const response = await mongodb.getDb().db().collection('product').insertOne(product);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the product.');
  }
};

const updateProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const product = {
    description: req.body.description,
    name: req.body.name,
    price: req.body.price,
  };
  const response = await mongodb.getDb().db().collection('product').replaceOne({ _id: productId }, product);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('product').deleteOne({ _id: productId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};

module.exports = { getProduct, getAllProducts, createProduct, updateProduct, deleteProduct };