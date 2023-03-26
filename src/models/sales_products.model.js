const connection = require('./connection');

const insert = async ({ saleId, productId, quantity }) => {
   const [{ insertId }] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?,?,?);',
    [saleId, productId, quantity],
   );
  return insertId;
};

module.exports = {
  insert,
};