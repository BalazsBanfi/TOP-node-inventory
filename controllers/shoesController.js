const db = require('../db/shoesQueries');
const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { CustomDbError } = require('../utils/CustomErrors');
const validator = require('../utils/validator');

// TO DO finish validate shoes and separete from controller

// Get the index page
const getIndex = asyncHandler(async (req, res) => {
  res.status(200).send({ page: 'index page' });
});

//Fetch all shoes from db
const getAllShoes = asyncHandler(async (req, res) => {
  const shoes = await db.getAllShoes();
  if (!shoes.length) {
    throw new CustomDbError("No shoes in database");
  }
  res.status(200).send(shoes);
});

// Get the new shoes page
const getNewShoes = (req, res) => {
  res.status(200).send({ page: 'add new shoes page' });
};

// Fetch 1 shoes from db
const getShoesById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    throw new CustomDbError("Wrong parameter");
  }
  const shoes = await db.getShoesById(id);
  if (shoes == undefined) {
    throw new CustomDbError("No asked shoes in database");
  }
  res.status(200).send(shoes);
});

// Add new shoes to db
const postNewShoes = [
  validator.bodyShoes,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(501).send(errors.array());
    } else {
      req.body.date = new Date();
      await db.addShoes(req.body);
      res.redirect("/");
    }
  }),
];

// Delete all shoes from db
const getDeleteAllShoes = asyncHandler(async (req, res) => {
  await db.deleteAllShoes();
  res.redirect("/");
});

// Delete one shoes by id from db
const getDeleteShoesById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.deleteShoesById(id);
  res.redirect("/");
});

// Fetch 1 shoes from db
const getUpdateShoesById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    throw new CustomDbError("Wrong parameter");
  }
  const shoes = await db.getShoesById(id);
  if (shoes == undefined) {
    throw new CustomDbError("No asked shoes in database");
  }
  res.status(200).send(shoes);
});

// Update shoes in db
const postUpdateShoesById = [
  validator.bodyShoes,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(501).send(errors.array());
    } else {
      req.body.id = req.params.id;
      await db.updateShoes(req.body);
      res.redirect(`/shoes/${req.params.id}`);
    }
  }),
];


module.exports = { getIndex, getAllShoes, getNewShoes, getShoesById, postNewShoes, getDeleteAllShoes, getDeleteShoesById, getUpdateShoesById, postUpdateShoesById };