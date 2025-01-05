const pool = require("./pool");
const asyncHandler = require("express-async-handler");
const { CustomDbError } = require("../errors/CustomErrors");


const getAllShoes = async () => {
  const SQL = 'SELECT categories.shoetype, brand, name FROM shoes INNER JOIN categories ON shoes.category_id=categories.id;'
  const { rows } = await pool.query(SQL);
  return rows;
};

const getShoesById = async (id) => {
  const SQL = 'SELECT categories.shoetype, brand, name FROM shoes INNER JOIN categories ON shoes.category_id=categories.id WHERE shoes.id=$1;'
  const { rows } = await pool.query(SQL, [id]);
  return rows[0];
};

module.exports = {
  getAllShoes, getShoesById
};

/*


const insertMessage = async (username, text, date) => {
  await pool.query(
    "INSERT INTO messages (username, text, added) VALUES ($1, $2, $3)",
    [username, text, date]
  );
};

const deleteMessageById = asyncHandler(async (messageId) => {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
});

const deleteMessages = asyncHandler(async () => {
  await pool.query("DELETE FROM messages");
});
*/
