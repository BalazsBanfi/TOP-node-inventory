const db = require('../db/categoryQueries');
const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { CustomDbError } = require('../utils/CustomErrors');
const validateCategory = require('../utils/validator');


//Fetch all categories from db
const getAllCategory = asyncHandler(async (req, res) => {
  const category = await db.getAllCategory();
  if (!category.length) {
    throw new CustomDbError("No category in database");
  }
  res.status(200).send(category);
});

// Get the new category page
const getNewCategory = (req, res) => {
  res.status(200).send({ page: 'new category page' });
};

// Fetch 1 category from db
const getCategoryById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    throw new CustomDbError("Wrong parameter");
  }
  const category = await db.getCategoryById(id);
  if (category == undefined) {
    throw new CustomDbError("No asked category in database");
  }
  res.status(200).send(category);
});

// Add new category to db
const postNewCategory = [
  validateCategory,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(501).send(errors.array());
    } else {
      await db.addCategory(req.body.shoetype);
      res.redirect("/");
    }
  }),
];
/*
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
  validateShoes,
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

*/
module.exports = { getAllCategory, getNewCategory, getCategoryById, postNewCategory };