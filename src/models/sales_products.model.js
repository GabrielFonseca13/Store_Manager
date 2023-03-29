// const camelize = require('camelize');
const connection = require('./connection');

const insert = async ({ saleId, productId, quantity }) => {
  const [{ affectedRows }] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?,?,?);',
    [saleId, productId, quantity],
  );
  return affectedRows;
};

// const findAll = async () => {
//   const [result] = await connection.execute(
//     'SELECT * FROM sales_products;',
//   );
//   return camelize(result);
// };

// const findById = async (saleId) => {
//   const [saleProduct] = await connection.execute(
//     'SELECT * FROM sales_products where sale_id = ?',
//     [saleId],
//   );

//   return camelize(saleProduct);
// };

module.exports = {
  insert,
  // findAll,
  // findById,
};