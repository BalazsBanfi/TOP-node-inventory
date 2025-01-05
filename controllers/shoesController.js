const db = require('../db/queries');
const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { CustomDbError } = require('../utils/CustomErrors');
const validateShoes = require('../utils/validator');

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

const postNewShoes = [
  validateShoes,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(501).send(errors.array());
    } else {
      const { category_id, name, brand, color, size, price, added } = req.body;
      await db.addShoes(category_id, name, brand, color, size, price, new Date());
      res.redirect("/");
    }
  }),
];

const getDeleteAllShoes = asyncHandler(async (req, res) => {
  await db.deleteAllShoes();
  res.redirect("/");
});

const getDeleteShoesById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.deleteShoesById(id);
  res.redirect("/");
});
module.exports = { getIndex, getAllShoes, getNewShoes, getShoesById, postNewShoes, getDeleteAllShoes, getDeleteShoesById };


/*

const getDeleteMessageById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await db.deleteMessageById(id);
  res.redirect("/");
});

const getDeleteMessages = asyncHandler(async (req, res) => {
  await db.deleteMessages();
  res.redirect("/");
});

module.exports = {
  getMessages,
  getNewMessage,
  getMessageById,
  postNewMessage,
  getDeleteMessageById,
  getDeleteMessages,
};

*/