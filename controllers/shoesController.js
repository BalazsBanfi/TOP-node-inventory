//const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { CustomDbError } = require("../errors/CustomErrors");


const getIndex = asyncHandler(async (req, res) => {
  res.status(200).send("OK");
});

module.exports = getIndex;
