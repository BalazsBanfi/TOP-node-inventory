const pool = require("./pool");
const { CustomDbError } = require("../utils/CustomErrors");

const getAllShoes = async () => {
  const SQL = 'SELECT shoes.id, categories.shoetype, brand, name FROM shoes INNER JOIN categories ON shoes.category_id=categories.id ORDER BY shoes.id;'
  const { rows } = await pool.query(SQL);
  return rows;
};

const getShoesById = async (id) => {
  const SQL = 'SELECT categories.shoetype, brand, name FROM shoes INNER JOIN categories ON shoes.category_id=categories.id WHERE shoes.id=$1;'
  const { rows } = await pool.query(SQL, [id]);
  return rows[0];
};

const addShoes = async (shoes) => {
  const SQL = 'INSERT INTO shoes (category_id, name, brand, color, size, price, added) VALUES ($1, $2, $3, $4, $5, $6, $7);'
  await pool.query(SQL,
    [shoes.category_id, shoes.name, shoes.brand, shoes.color, shoes.size, shoes.price, shoes.date]
  );
};

const deleteAllShoes = async () => {
  await pool.query('DELETE FROM shoes');
};

const deleteShoesById = async (id) => {
  await pool.query('DELETE FROM shoes WHERE id = $1', [id]);
};

const updateShoes = async (shoes) => {
  const SQL = 'UPDATE shoes SET category_id = $1, name = $2, brand = $3, color = $4, size = $5, price = $6 WHERE id = $7';
  await pool.query(SQL,
    [shoes.category_id, shoes.name, shoes.brand, shoes.color, shoes.size, shoes.price, shoes.id]
  );
};

module.exports = {
  getAllShoes, getShoesById, addShoes, deleteAllShoes, deleteShoesById, updateShoes
};