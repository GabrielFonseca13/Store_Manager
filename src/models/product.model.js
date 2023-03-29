const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return camelize(result); 
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );

  return camelize(product);
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [product],
  );

  return insertId;
};

const update = async (newName, productId) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?;',
  [newName, productId],
  );

  return affectedRows;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};