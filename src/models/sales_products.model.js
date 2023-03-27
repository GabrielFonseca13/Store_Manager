const connection = require('./connection');

const insert = async ({ saleId, productId, quantity }) => {
  const [{ affectedRows }] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?,?,?);',
    [saleId, productId, quantity],
  );
  
  return affectedRows;
};

module.exports = {
  insert,
};