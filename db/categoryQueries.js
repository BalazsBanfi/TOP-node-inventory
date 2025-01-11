const pool = require("./pool");
const { CustomDbError } = require("../utils/CustomErrors");

const getAllCategory = async () => {
  const SQL = 'SELECT * FROM categories ORDER BY id;'
  const { rows } = await pool.query(SQL);
  return rows;
};

const getCategoryById = async (id) => {
  const SQL = 'SELECT * FROM shoes WHERE category_id=$1 ORDER BY id;'
  const { rows } = await pool.query(SQL, [id]);
  return rows[0] ? rows : undefined;
};

const getCategoryByValue = async (shoetype) => {
  const SQL = 'SELECT shoetype FROM categories WHERE shoetype=$1;'
  const { rows } = await pool.query(SQL, [shoetype]);
  return rows[0] ? rows[0] : undefined;
};

const addCategory = async (shoetype) => {
  const SQL = 'INSERT INTO categories (shoetype) VALUES ($1);'
  await pool.query(SQL, [shoetype]);
};

const deleteAllCategories = async () => {
  await pool.query('UPDATE shoes SET category_id = $1;', [1]);
  await pool.query('DELETE FROM categories WHERE id>1');
};

const deleteCategoryById = async (id) => {
  await pool.query('UPDATE shoes SET category_id = $1 WHERE category_id = $2;', [1, id]);
  await pool.query('DELETE FROM categories WHERE id = $1;', [id]);
};

const getEditCategoryById = async (id) => {
  const SQL = 'SELECT * FROM categories WHERE id=$1;'
  const { rows } = await pool.query(SQL, [id]);
  return rows[0] ? rows : undefined;
};

const updateCategory = async (category) => {
  const SQL = 'UPDATE categories SET shoetype = $1 WHERE id = $2';
  await pool.query(SQL,
    [category.shoetype, category.id]
  );
};

module.exports = { getAllCategory, getCategoryById, addCategory, getCategoryByValue, deleteAllCategories, deleteCategoryById, updateCategory, getEditCategoryById };