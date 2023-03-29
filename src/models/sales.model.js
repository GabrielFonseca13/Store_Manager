const camelize = require('camelize');
const connection = require('./connection');

const insert = async () => {
   const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (now());',
   );
  return insertId;
};

const getDetailedSales = async () => {
  const [result] = await connection.execute(`
    SELECT SP.sale_id AS "saleId", 
      S.date AS "date", 
      SP.product_id AS "productId", 
      SP.quantity AS "quantity"
    FROM sales_products AS SP
    INNER JOIN sales AS S
    ON SP.sale_id = S.id
    ORDER BY SP.sale_id, SP.product_id;`);
  return camelize(result);
};

const getDetailedSalesByid = async (id) => {
  const [result] = await connection.execute(`
    SELECT SP.sale_id AS "saleId", 
      S.date AS "date", 
      SP.product_id AS "productId", 
      SP.quantity AS "quantity"
    FROM sales_products AS SP
    INNER JOIN sales AS S
    ON SP.sale_id = S.id
    WHERE id = ?
    ORDER BY SP.sale_id, SP.product_id;`, [id]);
  return camelize(result);
};

module.exports = {
  insert,
  getDetailedSales,
  getDetailedSalesByid,
};