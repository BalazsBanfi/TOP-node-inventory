const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { CustomDbError } = require("../errors/CustomErrors");


const getIndex = asyncHandler(async (req, res) => {
  res.status(200).send({ page: 'index page' });
});


const getAllShoes = asyncHandler(async (req, res) => {
  const shoes = await db.getAllShoes();
  if (!shoes.length) {
    throw new CustomDbError("No shoes in database");
  }
  res.status(200).send(shoes);

});

module.exports = { getIndex, getAllShoes };
