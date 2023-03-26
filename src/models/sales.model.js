const connection = require('./connection');

const insert = async () => {
   const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (now());',
   );
  return insertId;
};

module.exports = {
  insert,
};