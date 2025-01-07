const pool = require("./pool");
const { CustomDbError } = require("../utils/CustomErrors");

const getAllCategory = async () => {
  const SQL = 'SELECT * FROM categories;'
  const { rows } = await pool.query(SQL);
  return rows;
};


const getCategoryById = async (id) => {
  const SQL = 'SELECT * FROM shoes WHERE category_id=$1;'
  const { rows } = await pool.query(SQL, [id]);
  return rows[0] ? rows : undefined;
};

const addCategory = async (shoetype) => {
  const SQL = 'INSERT INTO categories (shoetype) VALUES ($1);'
  await pool.query(SQL, [shoetype]);
};
/*
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
*/
module.exports = { getAllCategory, getCategoryById, addCategory };