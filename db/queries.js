const pool = require("./pool");
const { CustomDbError } = require("../utils/CustomErrors");


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

const addShoes = async (category_id, name, brand, color, size, price, date) => {
  const SQL = 'INSERT INTO shoes (category_id, name, brand, color, size, price, added) VALUES ($1, $2, $3, $4, $5, $6, $7)'
  await pool.query(SQL,
    [category_id, name, brand, color, size, price, date]
  );
};

const deleteAllShoes = asyncHandler(async () => {
  await pool.query("DELETE FROM shoes");
});

const deleteShoesById = asyncHandler(async (id) => {
  await pool.query("DELETE FROM shoes WHERE id = $1", [id]);
});


module.exports = {
  getAllShoes, getShoesById, addShoes, deleteAllShoes, deleteShoesById
};


